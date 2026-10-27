import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { eventModeApi } from "./server/event-mode-plugin.ts";

export default defineConfig({
  plugins: [react(), tailwindcss(), eventModeApi()],
  server: {
    watch: {
      ignored: ["**/.data/**", "**/.event-owner.local"],
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "server/**/*.test.ts"],
  },
});
