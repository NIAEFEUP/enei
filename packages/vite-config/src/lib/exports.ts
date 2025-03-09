import { z } from "zod";

const exportsValidator = z.record(
    z.union([
        z.string(),
        z.object({
            types: z.string(),
        })
    ])
)

export function parseExports(exports: unknown) {
    return exportsValidator.parse(exports);
}

export function getExportedFiles(exports: z.output<typeof exportsValidator>) {
    return Object.values(exports)
        .map(entry => typeof entry === "string" ? entry : entry.types);
}
