import { dirname, resolve, relative } from "path";
import ts from "typescript";

function loadTypeScriptConfig(path: string) {
    const resolvedPath = resolve(process.cwd(), path);
    const basePath = dirname(resolvedPath);

    const configJson = ts.readConfigFile(resolvedPath, ts.sys.readFile);
    const config = ts.parseJsonConfigFileContent(
        configJson.config,
        ts.sys,
        basePath,
    )

    return config;
}

function parseRootDirs(config: ts.ParsedCommandLine) {
    const rootDirs = config.options.rootDirs
        ?? (config.options.rootDir && [config.options.rootDir]);

    if (!rootDirs) {
        throw new Error("No root directories found in tsconfig.json");
    }

    return rootDirs;
}

export class TypeScriptConfig {
    #rootDirs;

    constructor(path: string) {
        const config = loadTypeScriptConfig(path);
        this.#rootDirs = parseRootDirs(config);
    }

    toOutput(path: string) {
        for (const root of this.#rootDirs) {
            const relativePath = relative(root, path);
    
            if (!relativePath.startsWith("..")) {
                return relativePath
            }
        }
    
      throw new Error(`Path ${path} is not contained in any of the root directories`);
    }
}
