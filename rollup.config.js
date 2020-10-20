import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import browsersync from "rollup-plugin-browsersync";

const isProduction = process.env.NODE_ENV === "production";

export default {
  input: "src/main.ts",
  plugins: [
    nodeResolve({ browser: true }),
    typescript(),
    isProduction ? terser() : browsersync({ server: "dist" }),
  ],
  output: [
    {
      file: "dist/main.js",
      format: "iife",
    },
  ],
};
