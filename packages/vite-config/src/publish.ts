import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { getExportedFiles, parseExports } from "./lib/exports.js";
import { TypeScriptConfig } from "./lib/tsconfig.js";
import { stripExtension } from "./lib/path.js";
import type { PluginOption } from "vite";

type PublishPluginOptions = {
  tsconfigPath?: string;
}

export default function publish(opts?: PublishPluginOptions): PluginOption[] {
  opts = opts ?? {};

  const cwd = process.cwd();
  const packageJsonPath = resolve(cwd, "package.json");
  const tsconfigPath = resolve(cwd, opts.tsconfigPath ?? "tsconfig.json");

  const tsconfig = new TypeScriptConfig(tsconfigPath);

  return [
    externalizeDeps(),
    dts({ tsconfigPath }),
    {
      name: "enei-vite-config:publish",
      config: async () => {
        const config = JSON.parse(await readFile(packageJsonPath, "utf-8"));
        
        const exports = parseExports(config.exports ?? undefined); // undefined throws error
        const exportedFiles = getExportedFiles(exports);

        const entries = {} as Record<string, string>;
        for (const entry of exportedFiles) {
          const path = resolve(cwd, entry);
          const outputPath = tsconfig.toOutput(path);

          entries[stripExtension(outputPath)] = path;  
        }

        return {
          build: {
            lib: {
              formats: ["es"],
              entry: entries,
            },
          },
        };
      },
    },
  ];
}
