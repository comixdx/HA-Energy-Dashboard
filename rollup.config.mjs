import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const dev = !!process.env.ROLLUP_WATCH;

export default {
  input: "src/energy-card.ts",
  output: {
    file: "energy-card.js",
    format: "es",
    sourcemap: dev,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    !dev && terser(),
  ],
};
