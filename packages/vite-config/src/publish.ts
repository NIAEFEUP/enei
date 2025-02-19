import { type PluginOption } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import { resolve, relative, extname } from "path";
import { readFile } from "fs/promises";

type PublishPluginOptions = { tsconfigPath?: string };

function resolveEntryName(exportedPath: string) {
  const relativePath = relative(".", exportedPath);

  const extension = extname(relativePath);
  return relativePath.substring(0, relativePath.length - extension.length);
}

function resolveEntries(exportedFiles: Record<string, string> | undefined) {
  if (!exportedFiles) {
    return {};
  }

  const entries: Record<string, string> = {};
  for (const [_modulePath, exportedPath] of Object.entries(exportedFiles)) {
    const entryName = resolveEntryName(exportedPath);
    entries[entryName] = resolve(process.cwd(), exportedPath);
  }

  return entries;
}

export default function publish(opts?: PublishPluginOptions): PluginOption[] {
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
          "exports" in config ? (config.exports as Record<string, string>) : undefined;

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
