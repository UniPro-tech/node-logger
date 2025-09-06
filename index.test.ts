import { Logger, Transporter } from "./dist/bun";

const logSystem = new Logger("test", [Transporter.ConsoleTransporter()]);

const logger = logSystem.getLogger({ module: "index.test" });

logger.trace("Hello, world!");
