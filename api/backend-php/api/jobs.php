<?php
/**
 * Job vacancies API for Amazon Filtration careers.
 * Public: open, unexpired vacancies. Admin: full CRUD.
 */

ini_set('display_errors', '0');
ini_set('html_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Cache-Control: no-cache, no-store, must-revalidate');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit;
}

ensureJobTables($db);

$method = $_SERVER['REQUEST_METHOD'];
$jobId = null;
if (isset($_GET['id']) && ctype_digit((string) $_GET['id'])) {
    $jobId = (int) $_GET['id'];
}
$slug = isset($_GET['slug']) ? trim((string) $_GET['slug']) : '';
$admin = isset($_GET['admin']) && $_GET['admin'] === '1';

try {
    switch ($method) {
        case 'GET':
            if ($jobId) {
                getJob($db, $jobId, $admin);
            } elseif ($slug !== '') {
                getJobBySlug($db, $slug, $admin);
            } else {
                listJobs($db, $admin);
            }
            break;
        case 'POST':
            if ($jobId) {
                updateJob($db, $jobId);
            } else {
                createJob($db);
            }
            break;
        case 'PUT':
            if (!$jobId) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Job ID is required']);
                break;
            }
            updateJob($db, $jobId);
            break;
        case 'DELETE':
            if (!$jobId) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Job ID is required']);
                break;
            }
            deleteJob($db, $jobId);
            break;
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Request failed: ' . $e->getMessage()]);
}

function ensureJobTables($db) {
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
        UNIQUE KEY uniq_job_slug (slug),
        INDEX idx_job_status (status),
        INDEX idx_job_closing (closing_date)
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

function isPubliclyOpen(array $job) {
    if (($job['status'] ?? '') !== 'open') {
        return false;
    }
    $closing = $job['closing_date'] ?? null;
    if ($closing && $closing !== '0000-00-00' && $closing < date('Y-m-d')) {
        return false;
    }
    return true;
}

function decorateJob(array $job, $applicationCount = null) {
    $job['id'] = (int) $job['id'];
    $job['is_open'] = isPubliclyOpen($job);
    if ($applicationCount !== null) {
        $job['application_count'] = (int) $applicationCount;
    }
    return $job;
}

function listJobs($db, $admin) {
    if ($admin) {
        $sql = "SELECT v.*, (
                    SELECT COUNT(*) FROM job_applications a WHERE a.job_id = v.id
                ) AS application_count
                FROM job_vacancies v
                ORDER BY FIELD(v.status, 'open', 'draft', 'closed'), v.created_at DESC";
        $stmt = $db->query($sql);
        $jobs = array_map(function ($row) {
            $count = $row['application_count'];
            unset($row['application_count']);
            return decorateJob($row, $count);
        }, $stmt->fetchAll(PDO::FETCH_ASSOC));
        echo json_encode(['success' => true, 'jobs' => $jobs, 'count' => count($jobs)]);
        return;
    }

    $sql = "SELECT * FROM job_vacancies
            WHERE status = 'open'
              AND (closing_date IS NULL OR closing_date = '0000-00-00' OR closing_date >= CURDATE())
            ORDER BY created_at DESC";
    $stmt = $db->query($sql);
    $jobs = array_map(function ($row) {
        return decorateJob($row);
    }, $stmt->fetchAll(PDO::FETCH_ASSOC));
    echo json_encode(['success' => true, 'jobs' => $jobs, 'count' => count($jobs)]);
}

function getJob($db, $id, $admin) {
    $stmt = $db->prepare('SELECT * FROM job_vacancies WHERE id = ?');
    $stmt->execute([$id]);
    $job = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$job || (!$admin && !isPubliclyOpen($job))) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Vacancy not found']);
        return;
    }
    echo json_encode(['success' => true, 'job' => decorateJob($job)]);
}

function getJobBySlug($db, $slug, $admin) {
    $stmt = $db->prepare('SELECT * FROM job_vacancies WHERE slug = ?');
    $stmt->execute([$slug]);
    $job = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$job || (!$admin && !isPubliclyOpen($job))) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Vacancy not found']);
        return;
    }
    echo json_encode(['success' => true, 'job' => decorateJob($job)]);
}

function parseJobPayload() {
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($contentType, 'application/json') !== false) {
        $data = json_decode(file_get_contents('php://input'), true);
        return is_array($data) ? $data : [];
    }
    return $_POST;
}

function slugify($text) {
    $text = strtolower(trim((string) $text));
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    $text = trim($text, '-');
    return $text !== '' ? $text : 'vacancy';
}

function uniqueSlug($db, $base, $ignoreId = null) {
    $slug = $base;
    $i = 2;
    while (true) {
        if ($ignoreId) {
            $stmt = $db->prepare('SELECT id FROM job_vacancies WHERE slug = ? AND id != ?');
            $stmt->execute([$slug, $ignoreId]);
        } else {
            $stmt = $db->prepare('SELECT id FROM job_vacancies WHERE slug = ?');
            $stmt->execute([$slug]);
        }
        if (!$stmt->fetch()) {
            return $slug;
        }
        $slug = $base . '-' . $i;
        $i++;
    }
}

function normalizeJobData(array $data) {
    $status = strtolower(trim((string) ($data['status'] ?? 'draft')));
    if (!in_array($status, ['draft', 'open', 'closed'], true)) {
        $status = 'draft';
    }
    $closing = trim((string) ($data['closing_date'] ?? ''));
    if ($closing === '') {
        $closing = null;
    }
    return [
        'title' => trim((string) ($data['title'] ?? '')),
        'department' => trim((string) ($data['department'] ?? '')),
        'location' => trim((string) ($data['location'] ?? 'Nairobi, Kenya')) ?: 'Nairobi, Kenya',
        'employment_type' => trim((string) ($data['employment_type'] ?? 'Full-time')) ?: 'Full-time',
        'description' => trim((string) ($data['description'] ?? '')),
        'responsibilities' => trim((string) ($data['responsibilities'] ?? '')),
        'requirements' => trim((string) ($data['requirements'] ?? '')),
        'benefits' => trim((string) ($data['benefits'] ?? '')),
        'closing_date' => $closing,
        'status' => $status,
        'slug' => trim((string) ($data['slug'] ?? '')),
    ];
}

function createJob($db) {
    $data = normalizeJobData(parseJobPayload());
    if ($data['title'] === '' || $data['description'] === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Title and description are required']);
        return;
    }
    $slug = uniqueSlug($db, $data['slug'] !== '' ? slugify($data['slug']) : slugify($data['title']));
    $stmt = $db->prepare(
        'INSERT INTO job_vacancies
        (title, slug, department, location, employment_type, description, responsibilities, requirements, benefits, closing_date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $data['title'],
        $slug,
        $data['department'],
        $data['location'],
        $data['employment_type'],
        $data['description'],
        $data['responsibilities'],
        $data['requirements'],
        $data['benefits'],
        $data['closing_date'],
        $data['status'],
    ]);
    $id = (int) $db->lastInsertId();
    getJob($db, $id, true);
}

function updateJob($db, $id) {
    $stmt = $db->prepare('SELECT * FROM job_vacancies WHERE id = ?');
    $stmt->execute([$id]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$existing) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Vacancy not found']);
        return;
    }

    $payload = parseJobPayload();
    $merged = array_merge($existing, $payload);
    $data = normalizeJobData($merged);
    if ($data['title'] === '' || $data['description'] === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Title and description are required']);
        return;
    }
    $baseSlug = $data['slug'] !== '' ? slugify($data['slug']) : slugify($data['title']);
    $slug = uniqueSlug($db, $baseSlug, $id);

    $stmt = $db->prepare(
        'UPDATE job_vacancies SET
            title = ?, slug = ?, department = ?, location = ?, employment_type = ?,
            description = ?, responsibilities = ?, requirements = ?, benefits = ?,
            closing_date = ?, status = ?
         WHERE id = ?'
    );
    $stmt->execute([
        $data['title'],
        $slug,
        $data['department'],
        $data['location'],
        $data['employment_type'],
        $data['description'],
        $data['responsibilities'],
        $data['requirements'],
        $data['benefits'],
        $data['closing_date'],
        $data['status'],
        $id,
    ]);
    getJob($db, $id, true);
}

function deleteJob($db, $id) {
    $stmt = $db->prepare('SELECT resume_path FROM job_applications WHERE job_id = ?');
    $stmt->execute([$id]);
    $uploadRoot = realpath(__DIR__ . '/../uploads') ?: (__DIR__ . '/../uploads');
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
        $path = $row['resume_path'] ?? '';
        if ($path === '') {
            continue;
        }
        $full = realpath(__DIR__ . '/../' . $path);
        if ($full && str_starts_with($full, $uploadRoot) && is_file($full)) {
            @unlink($full);
        }
    }
    $db->prepare('DELETE FROM job_applications WHERE job_id = ?')->execute([$id]);
    $stmt = $db->prepare('DELETE FROM job_vacancies WHERE id = ?');
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Vacancy not found']);
        return;
    }
    echo json_encode(['success' => true, 'message' => 'Vacancy deleted']);
}
