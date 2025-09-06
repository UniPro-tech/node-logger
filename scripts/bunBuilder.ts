import { resolve } from "path";
import { bunPluginPino } from "bun-plugin-pino";

await Bun.build({
  entrypoints: [resolve("src/index.ts")],
  outdir: resolve("dist/bun"),
  target: "bun",
  plugins: [
    bunPluginPino({
      transports: [
        "pino-pretty",
        "pino/file",
        "pino-loki",
        "pino-logfmt",
        "pino-discord-webhook",
      ],
    }),
  ],
});
