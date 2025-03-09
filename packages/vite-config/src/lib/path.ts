import { extname } from "path";

export function stripExtension(path: string) {
    const extension = extname(path);
    return path.substring(0, path.length - extension.length);
}