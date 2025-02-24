import js from "@eslint/js"
import tslint from "typescript-eslint"
import configPrettier from "eslint-config-prettier"
import pluginOnlyWarn from "eslint-plugin-only-warn";
import pluginTurbo from "eslint-plugin-turbo";

export default tslint.config(
    { ignores: ["dist/**"] },
    js.configs.recommended,
    tslint.configs.recommendedTypeChecked,
    configPrettier,
    pluginOnlyWarn,
    pluginTurbo,
)