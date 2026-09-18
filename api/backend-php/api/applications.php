<?php
/**
 * Job applications API for Amazon Filtration careers.
 * Public POST: apply (multipart). Admin GET: inbox + resume download.
 */

ini_set('display_errors', '0');
ini_set('html_errors', '0');
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../smtp.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit;
}

ensureApplicationTables($db);

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'POST' && (isset($_GET['id']) || isset($_POST['application_status']))) {
        header('Content-Type: application/json');
        updateApplicationStatus($db);
        exit;
    }
    if ($method === 'POST') {
        header('Content-Type: application/json');
        createApplication($db);
        exit;
    }
    if ($method === 'GET' && isset($_GET['download']) && ctype_digit((string) $_GET['download'])) {
        downloadResume($db, (int) $_GET['download']);
        exit;
    }
    if ($method === 'GET') {
        header('Content-Type: application/json');
        listApplications($db);
        exit;
    }
    if ($method === 'PATCH' || ($method === 'POST' && isset($_GET['id']))) {
        header('Content-Type: application/json');
        updateApplicationStatus($db);
        exit;
    }
    header('Content-Type: application/json');
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
} catch (Throwable $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Request failed: ' . $e->getMessage()]);
}

function ensureApplicationTables($db) {
    $db->exec("CREATE TABLE IF NOT EXISTS job_vacancies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(220) NOT NULL,
        department VARCHAR(100) DEFAULT '',
        location VARCHAR(150) DEFAULT 'Nairobi, Kenya',
        employment_type VARCHAR(50) DEFAULT 'Full-time',
        description TEXT NOT NULL,
        responsibilities TEXT,
        requirements TEXT,
        benefits TEXT,
        closing_date DATE NULL,
        status VARCHAR(20) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_job_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $db->exec("CREATE TABLE IF NOT EXISTS job_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_id INT NULL,
        full_name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(40),
        cover_letter TEXT,
        resume_path VARCHAR(500),
        resume_name VARCHAR(255),
        status VARCHAR(30) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_app_job (job_id),
        INDEX idx_app_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
}

function isVacancyOpen(array $job) {
    if (($job['status'] ?? '') !== 'open') {
        return false;
    }
    $closing = $job['closing_date'] ?? null;
    if ($closing && $closing !== '0000-00-00' && $closing < date('Y-m-d')) {
        return false;
    }
    return true;
}

function createApplication($db) {
    $jobId = isset($_POST['job_id']) && ctype_digit((string) $_POST['job_id'])
        ? (int) $_POST['job_id']
        : null;
    $fullName = trim((string) ($_POST['full_name'] ?? ''));
    $email = trim((string) ($_POST['email'] ?? ''));
    $phone = trim((string) ($_POST['phone'] ?? ''));
    $cover = trim((string) ($_POST['cover_letter'] ?? ''));

    if ($fullName === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Full name and a valid email are required']);
        return;
    }

    $jobTitle = 'General / talent pool';
    if ($jobId) {
        $stmt = $db->prepare('SELECT * FROM job_vacancies WHERE id = ?');
        $stmt->execute([$jobId]);
        $job = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$job || !isVacancyOpen($job)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'This vacancy is no longer open for applications']);
            return;
        }
        $jobTitle = $job['title'];
    }

    $resume = saveResumeUpload();
    if (isset($resume['error'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => $resume['error']]);
        return;
    }

    $stmt = $db->prepare(
        'INSERT INTO job_applications (job_id, full_name, email, phone, cover_letter, resume_path, resume_name)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $jobId,
        $fullName,
        $email,
        $phone,
        $cover,
        $resume['path'],
        $resume['name'],
    ]);

    try {
        notifyNewApplication($jobTitle, $fullName, $email, $phone, $cover);
    } catch (Throwable $mailError) {
        error_log('Application saved but email notification failed: ' . $mailError->getMessage());
    }

    echo json_encode([
        'success' => true,
        'message' => 'Thank you. Your application has been received. We will contact shortlisted candidates.',
    ]);
}

function saveResumeUpload() {
    if (!isset($_FILES['resume']) || $_FILES['resume']['error'] === UPLOAD_ERR_NO_FILE) {
        return ['path' => '', 'name' => ''];
    }
    if ($_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
        return ['error' => 'Could not upload the CV. Please try again.'];
    }
    if ($_FILES['resume']['size'] > 5 * 1024 * 1024) {
        return ['error' => 'CV must be 5MB or smaller.'];
    }

    $original = (string) $_FILES['resume']['name'];
    $ext = strtolower(pathinfo($original, PATHINFO_EXTENSION));
    $allowed = ['pdf', 'doc', 'docx'];
    if (!in_array($ext, $allowed, true)) {
        return ['error' => 'Please upload a PDF or Word document (PDF, DOC, DOCX).'];
    }

    $dir = __DIR__ . '/../uploads/resumes/';
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        return ['error' => 'Could not store the CV. Please try again later.'];
    }

    $safeName = preg_replace('/[^a-zA-Z0-9._-]+/', '_', $original);
    $stored = uniqid('cv_', true) . '_' . $safeName;
    $dest = $dir . $stored;
    if (!move_uploaded_file($_FILES['resume']['tmp_name'], $dest)) {
        return ['error' => 'Could not store the CV. Please try again later.'];
    }

    return [
        'path' => 'uploads/resumes/' . $stored,
        'name' => $original,
    ];
}

function listApplications($db) {
    $jobId = isset($_GET['job_id']) && ctype_digit((string) $_GET['job_id'])
        ? (int) $_GET['job_id']
        : null;

    if ($jobId) {
        $stmt = $db->prepare(
            'SELECT a.*, v.title AS job_title, v.slug AS job_slug
             FROM job_applications a
             LEFT JOIN job_vacancies v ON v.id = a.job_id
             WHERE a.job_id = ?
             ORDER BY a.created_at DESC'
        );
        $stmt->execute([$jobId]);
    } else {
        $stmt = $db->query(
            'SELECT a.*, v.title AS job_title, v.slug AS job_slug
             FROM job_applications a
             LEFT JOIN job_vacancies v ON v.id = a.job_id
             ORDER BY a.created_at DESC
             LIMIT 200'
        );
    }

    $rows = array_map(function ($row) {
        $row['id'] = (int) $row['id'];
        $row['job_id'] = $row['job_id'] !== null ? (int) $row['job_id'] : null;
        $row['has_resume'] = !empty($row['resume_path']);
        unset($row['resume_path']);
        return $row;
    }, $stmt->fetchAll(PDO::FETCH_ASSOC));

    echo json_encode(['success' => true, 'applications' => $rows, 'count' => count($rows)]);
}

function updateApplicationStatus($db) {
    $id = isset($_GET['id']) && ctype_digit((string) $_GET['id']) ? (int) $_GET['id'] : 0;
    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) {
        $data = $_POST;
    }
    $status = strtolower(trim((string) ($data['status'] ?? '')));
    $allowed = ['new', 'reviewed', 'shortlisted', 'rejected'];
    if (!$id || !in_array($status, $allowed, true)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Valid application id and status are required']);
        return;
    }
    $stmt = $db->prepare('UPDATE job_applications SET status = ? WHERE id = ?');
    $stmt->execute([$status, $id]);
    echo json_encode(['success' => true]);
}

function downloadResume($db, $id) {
    $stmt = $db->prepare('SELECT resume_path, resume_name FROM job_applications WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row || empty($row['resume_path'])) {
        header('Content-Type: application/json');
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'CV not found']);
        return;
    }

    $uploadRoot = realpath(__DIR__ . '/../uploads');
    $full = realpath(__DIR__ . '/../' . $row['resume_path']);
    if (!$uploadRoot || !$full || !str_starts_with($full, $uploadRoot) || !is_file($full)) {
        header('Content-Type: application/json');
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'CV file missing']);
        return;
    }

    $name = $row['resume_name'] ?: basename($full);
    $name = str_replace(['"', "\r", "\n"], '', $name);
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $name . '"');
    header('Content-Length: ' . filesize($full));
    header('Cache-Control: no-store');
    readfile($full);
}

function notifyNewApplication($jobTitle, $fullName, $email, $phone, $cover) {
    $to = getenv('AMAZON_HR_EMAIL') ?: 'filterskenyaltd@gmail.com';
    $subject = 'New job application — ' . $jobTitle;
    $message = "A new application was submitted on amazonfiltration.co.ke\n\n"
        . "Role: {$jobTitle}\n"
        . "Name: {$fullName}\n"
        . "Email: {$email}\n"
        . "Phone: " . ($phone !== '' ? $phone : 'Not provided') . "\n\n"
        . "Cover letter:\n" . ($cover !== '' ? $cover : '(none)') . "\n\n"
        . "Review the CV and full application in Admin → Vacancies.\n"
        . 'Time: ' . date('Y-m-d H:i:s');

    amazonSmtpSend($to, $email, $subject, $message);
}
