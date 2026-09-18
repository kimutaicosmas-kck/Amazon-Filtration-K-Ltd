<?php
/**
 * Shared SMTP helper used by contact and careers notifications.
 */

function amazonSmtpSend($toEmail, $replyTo, $subject, $body) {
    $smtpHost = getenv('AMAZON_SMTP_HOST') ?: 'smtp.gmail.com';
    $smtpPort = (int) (getenv('AMAZON_SMTP_PORT') ?: 587);
    $smtpUser = getenv('AMAZON_SMTP_USER') ?: 'kimutaicosmas547@gmail.com';
    $smtpPass = getenv('AMAZON_SMTP_PASS') ?: 'Kimutai@4433?!';

    return amazonSmtpDispatch(
        $smtpHost,
        $smtpPort,
        $smtpUser,
        $smtpPass,
        $smtpUser,
        'Amazon Filtration',
        $toEmail,
        $replyTo,
        $subject,
        $body
    );
}

function amazonSmtpDispatch($host, $port, $username, $password, $fromEmail, $fromName, $toEmail, $replyTo, $subject, $body) {
    $socket = @stream_socket_client("tcp://{$host}:{$port}", $errno, $errstr, 20);
    if (!$socket) {
        throw new RuntimeException("SMTP connection failed: {$errstr} ({$errno})");
    }

    stream_set_timeout($socket, 20);
    amazonSmtpExpect($socket, [220]);
    amazonSmtpWrite($socket, 'EHLO amazonfiltration.co.ke');
    amazonSmtpExpect($socket, [250]);
    amazonSmtpWrite($socket, 'STARTTLS');
    amazonSmtpExpect($socket, [220]);

    if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
        throw new RuntimeException('SMTP TLS negotiation failed');
    }

    amazonSmtpWrite($socket, 'EHLO amazonfiltration.co.ke');
    amazonSmtpExpect($socket, [250]);
    amazonSmtpWrite($socket, 'AUTH LOGIN');
    amazonSmtpExpect($socket, [334]);
    amazonSmtpWrite($socket, base64_encode($username));
    amazonSmtpExpect($socket, [334]);
    amazonSmtpWrite($socket, base64_encode($password));
    amazonSmtpExpect($socket, [235]);
    amazonSmtpWrite($socket, "MAIL FROM:<{$fromEmail}>");
    amazonSmtpExpect($socket, [250]);
    amazonSmtpWrite($socket, "RCPT TO:<{$toEmail}>");
    amazonSmtpExpect($socket, [250, 251]);
    amazonSmtpWrite($socket, 'DATA');
    amazonSmtpExpect($socket, [354]);

    $safeSubject = str_replace(["\r", "\n"], '', $subject);
    $safeReplyTo = str_replace(["\r", "\n"], '', $replyTo);
    $encodedFrom = str_replace(["\r", "\n"], '', $fromName);
    $headers = [
        "From: {$encodedFrom} <{$fromEmail}>",
        "Reply-To: {$safeReplyTo}",
        "To: <{$toEmail}>",
        "Subject: {$safeSubject}",
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'Date: ' . date(DATE_RFC2822),
    ];

    $normalizedBody = str_replace(["\r\n", "\r"], "\n", $body);
    $normalizedBody = str_replace("\n.", "\n..", $normalizedBody);
    $data = implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n", "\r\n", $normalizedBody) . "\r\n.";
    amazonSmtpWrite($socket, $data, false);
    amazonSmtpExpect($socket, [250]);
    amazonSmtpWrite($socket, 'QUIT');
    fclose($socket);
    return true;
}

function amazonSmtpWrite($socket, $command, $appendCrlf = true) {
    fwrite($socket, $appendCrlf ? $command . "\r\n" : $command . "\r\n");
}

function amazonSmtpExpect($socket, $acceptedCodes) {
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (preg_match('/^\d{3}\s/', $line)) {
            break;
        }
    }
    if ($response === '') {
        throw new RuntimeException('SMTP server returned empty response');
    }
    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $acceptedCodes, true)) {
        throw new RuntimeException("SMTP error {$code}: " . trim($response));
    }
}
