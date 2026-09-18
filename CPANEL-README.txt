Amazon Filtration — cPanel extract instructions
================================================

1. In cPanel File Manager open public_html.
2. Upload amazon-filtration-cpanel-careers.zip.
3. Extract HERE (do not extract into a new subfolder).
4. Confirm you see index.html, .htaccess, static/, images/, backend-php/ in public_html.
5. Set backend-php/uploads and backend-php/uploads/resumes to writable (chmod 755 or 775).

After extract, test:
  https://amazonfiltration.co.ke/
  https://amazonfiltration.co.ke/careers

Admin vacancies (hidden access, same as before):
  Double-click the lock in the footer, or click the logo 5 times, then open Vacancies.

Job tables are created automatically the first time /careers or Admin → Vacancies is opened.
No extra SQL step is required if the existing MySQL database is already working.
