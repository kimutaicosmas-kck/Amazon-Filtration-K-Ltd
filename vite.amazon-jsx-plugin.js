import path from "path";
import { transform } from "esbuild";

/**
 * Root-level React components use .js + JSX (CRA-style). Vite's import scanner
 * expects .jsx for JSX; this pre-plugin compiles JSX in those files first.
 */
export function amazonJsxPrePlugin(rootDir) {
  const root = path.resolve(rootDir);
  return {
    name: "amazon-jsx-in-root-js",
    enforce: "pre",
    async transform(code, id) {
      const rel = path.relative(root, id);
      if (rel.startsWith("..") || path.isAbsolute(rel)) return null;
      const norm = id.replace(/\\/g, "/");
      if (norm.includes("/node_modules/")) return null;
      if (norm.includes("/static/js/")) return null;
      if (!id.endsWith(".js")) return null;
      const depth = rel.split(/[/\\]/).filter(Boolean).length;
      if (depth !== 1) return null;
      const base = path.basename(rel);
      if (base.startsWith("_")) return null;

      const r = await transform(code, {
        loader: "jsx",
        jsx: "automatic",
        sourcefile: id,
      });
      return { code: r.code };
    },
  };
}
