Amazon Filtration — overlay
===========================

This zip ONLY overwrites a few files. It does not wipe the site.

DO NOT delete public_html.
DO NOT delete the images folder.

1. Open cPanel File Manager -> public_html
2. If you see a folder named "about" sitting NEXT TO index.html
   (not inside images), delete that "about" folder only.
   It is an old photo folder. Refreshing /about then shows
   "Index of /about/" instead of the About page.
   Keep images/about if it exists.
3. Upload amazon-filtration-careers-OVERLAY.zip
4. Extract here (overwrite same-named files only)
5. Hard-refresh with Ctrl+F5

The new .htaccess sends /about, /products, /careers, /contact
to the website even if an old folder is still there.
