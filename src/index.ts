import pino, {
  type TransportPipelineOptions,
  type TransportTargetOptions,
} from "pino";

export class Logger {
  baseLogger: pino.Logger;
  constructor(
    name: string,
    transportTargets: readonly (
      | TransportTargetOptions<Record<string, any>>
      | TransportPipelineOptions<Record<string, any>>
    )[],
    options: pino.LoggerOptions = {},
    level?: string
  ) {
    this.baseLogger = pino({
      timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
      base: {
        service: name,
        environment: process.env.NODE_ENV || "production",
      },
      level: level
        ? level
        : process.env.NODE_ENV === "production"
        ? "info"
        : "trace",
      transport: {
        targets: transportTargets,
        options: {
          errorKey: "error",
          ...options,
        },
      },
    });
  }
  getLogger(context = {}): pino.Logger {
    return this.baseLogger.child(context);
  }
}

export { default as Transporter } from "./Transporter";
