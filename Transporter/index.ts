import type { TransportSingleOptions } from "pino";

export const ConsoleTransporter = (
  options?: Record<string, any>,
  level?: string
) => {
  return {
    target: "pino/file",
    options: { destination: 1, ...options },
    level,
  } as TransportSingleOptions;
};

export const FileTransporter = (
  filePath: string,
  options?: Record<string, any>,
  level?: string
) => {
  return {
    target: "pino/file",
    options: { destination: filePath, ...options },
    level,
  } as TransportSingleOptions;
};

export const PinoPrettyTransporter = (options?: Record<string, any>) => {
  return {
    target: "pino-pretty",
    options: { colorize: true, ...options },
  } as TransportSingleOptions;
};

export const LokiTransporter = (
  host: string,
  options?: Record<string, any>,
  level?: string
) => {
  return {
    target: "pino-loki",
    options: { host, batching: true, interval: 5, ...options },
    level,
  } as TransportSingleOptions;
};

export const LogFmtTransporter = (
  options?: Record<string, any>,
  level?: string
) => {
  return {
    target: "pino-logfmt",
    options: { ...options },
    level,
  } as TransportSingleOptions;
};

export const DiscordTransporter = (
  webhookUrl: string,
  options?: Record<string, any>,
  level?: string
) => {
  return {
    target: "pino-discord-webhook",
    options: { webhookUrl, ...options },
    level,
  } as TransportSingleOptions;
};

export default {
  ConsoleTransporter,
  FileTransporter,
  PinoPrettyTransporter,
  LokiTransporter,
  LogFmtTransporter,
  DiscordTransporter,
};
