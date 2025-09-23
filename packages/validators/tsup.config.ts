import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/**/*.{ts,tsx}",
  ],
  outDir: "dist",
  // minify: true,
  format: ["esm"],
  sourcemap: false,
  clean: true,
  dts: true,
  tsconfig: "tsconfig.json",
});