import pino, {
  type TransportPipelineOptions,
  type TransportTargetOptions,
} from "pino";

import transporter from "./Transporter";

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
    transport: {
      targets: transportTargets,
      options: {
        name,
        level: level
          ? level
          : process.env.NODE_ENV === "development"
          ? "trace"
          : "info",
        timestamp: () => `,"time":"${new Date().toUTCString()}"`,
        errorKey: "error",
        ...options,
      },
    },
  });

export const Transporter = transporter;

export default {
  Transporter,
  Logger,
};
