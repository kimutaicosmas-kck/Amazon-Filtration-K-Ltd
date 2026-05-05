const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "static", "js");
for (const f of fs.readdirSync(dir)) {
  if (!/^main\.[a-f0-9]+\.js$/.test(f)) continue;
  const p = path.join(dir, f);
  const s = fs.readFileSync(p, "utf8");
  if (!s.includes("See more") || !s.includes("Built for industry")) continue;
  const { spawnSync } = require("child_process");
  const r = spawnSync(process.execPath, ["--check", p], { encoding: "utf8" });
  console.log(f, r.status === 0 ? "OK" : "FAIL", (r.stderr || "").slice(0, 120));
}
