const s = require("fs").readFileSync("c:/xampp/htdocs/amazon/static/js/main.d12675dc.js", "utf8");
const a = s.indexOf("Built for industry partners");
console.log(s.slice(a - 200, a + 450));
