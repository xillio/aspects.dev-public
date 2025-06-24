import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/frontend/",
  plugins: [react()],
  assetsInclude: ["**/*.md"],
});
