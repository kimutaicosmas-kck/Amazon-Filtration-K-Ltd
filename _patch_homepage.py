# -*- coding: utf-8 -*-
import re
path = r"c:\xampp\htdocs\amazon\static\js\main.d12675dc.js"
log = r"c:\xampp\htdocs\amazon\_patch_homepage_log.txt"
with open(path, "r", encoding="utf-8") as f:
    s = f.read()

def logw(msg):
    with open(log, "a", encoding="utf-8") as lf:
        lf.write(msg + "\n")

open(log, "w").close()
logw("len=%d" % len(s))

needle = "Amazon-filtration-company-pic"
pos = s.find(needle)
logw("needle pos=%d" % pos)

# Search backward for function start - user said const gt=function
chunk_start = s.rfind("const gt=function", 0, pos + 1)
logw("rfind const gt=function before needle: %d" % chunk_start)

if chunk_start < 0:
    # try without const
    chunk_start = s.rfind("gt=function", 0, pos + 1)
    logw("rfind gt=function: %d" % chunk_start)

# Show 200 chars before needle
if pos >= 0:
    logw("context before needle: " + repr(s[max(0, pos - 300):pos + 80]))

# Find module: often "123:(e,t,n)=>{" pattern - search for unique strings near HomePage
for pat in ["Explore Our Solutions", "Why Choose Amazon Filtration", "Machine Filtration"]:
    p = s.find(pat)
    logw("%s -> %d" % (pat, p))
