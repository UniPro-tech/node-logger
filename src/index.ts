import { nanoid } from "nanoid";
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
  getLogger(
    context: LogContext = { trace_id: nanoid(), request_id: nanoid() },
    extraContext: Record<string, any> = {}
  ): pino.Logger {
    if (!context.trace_id) {
      context.trace_id = nanoid();
    }
    if (!context.request_id) {
      context.request_id = nanoid();
    }
    const mergedContext = { ...context, ...extraContext };
    return this.baseLogger.child(mergedContext);
  }
}

type LogContext = { trace_id: string; request_id: string; user_id?: string };

export { default as Transporter } from "./Transporter";
