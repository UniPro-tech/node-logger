import pino, {
  type TransportPipelineOptions,
  type TransportTargetOptions,
} from "pino";

export const Logger = (
  name: string,
  transportTargets: readonly (
    | TransportTargetOptions<Record<string, any>>
    | TransportPipelineOptions<Record<string, any>>
  )[],
  level: string = "info",
  options: pino.LoggerOptions = {}
) =>
  pino({
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
      targets: transportTargets,
      options: {
        name,
        level: level
          ? level
          : process.env.NODE_ENV === "development"
          ? "trace"
          : "info",

        errorKey: "error",
        ...options,
      },
    },
  });

export { default as Transporter } from "./Transporter";
