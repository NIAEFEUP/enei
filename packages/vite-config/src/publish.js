import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import { resolve, relative, extname } from "path";
import { readFile } from "fs/promises";

/**
 * @typedef {{ tsconfigPath?: string }} PublishPluginOptions
 */

/**
 * @param {string} exportedPath 
 */
function resolveEntryName(exportedPath) {
  const relativePath = relative(".", exportedPath);

  const extension = extname(relativePath);
  return relativePath.substring(0, relativePath.length - extension.length);
}

/**
 * @param {Record<string, string> | undefined} exportedFiles 
 */
function resolveEntries(exportedFiles) {
  if (!exportedFiles) {
    return {};
  }

  const entries = /** @type {Record<string, string>} */ ({});
  for (const [_modulePath, exportedPath] of Object.entries(exportedFiles)) {
    const entryName = resolveEntryName(exportedPath);
    entries[entryName] = resolve(process.cwd(), exportedPath);
  }

  return entries;
}

/**
 * 
 * @param {PublishPluginOptions=} opts 
 * @returns {import("vite").PluginOption[]}
 */
export default function publish(opts) {
  const { tsconfigPath } = opts ?? {};
  const packageJsonPath = resolve(process.cwd(), "package.json");

  return [
    externalizeDeps(),
    dts({ tsconfigPath }),
    {
      name: "enei-vite-config:publish",
      config: async () => {
        const config = JSON.parse(await readFile(packageJsonPath, "utf-8"));
        const exportedFiles =
          "exports" in config ? /** @type {Record<string, string>} */ (config.exports) : undefined;

        return {
          build: {
            lib: {
              formats: ["es"],
              entry: resolveEntries(exportedFiles),
            },
          },
        };
      },
    },
  ];
}
