import tslint from "typescript-eslint"
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import base from "./base"

export default tslint.config(
    base,
    pluginReact,
    pluginReactHooks
)