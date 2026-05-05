import os
import shutil

src = r"C:\Users\Admin\.cursor\projects\c-xampp-htdocs-amazon\assets\c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_6d5be770217df89bf9263d332ecc2616_images_WIBA_PAGE-f4bdec39-c3b2-4725-a338-6d096329f35c.png"
dst_dir = r"c:\xampp\htdocs\amazon\images\hero"
dst = os.path.join(dst_dir, "homepage-air-filter-hero.png")
os.makedirs(dst_dir, exist_ok=True)
if os.path.isfile(src):
    shutil.copy2(src, dst)
    open(r"c:\xampp\htdocs\amazon\tools\copy-hero.ok", "w").write("ok")
else:
    open(r"c:\xampp\htdocs\amazon\tools\copy-hero.ok", "w").write("missing:" + src)
