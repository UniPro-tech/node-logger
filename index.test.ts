import { Logger, Transporter } from "./dist/bun";

const logger = Logger("MyApp", [
  Transporter.PinoPrettyTransporter(),
  Transporter.FileTransporter("./app.log"),
]);

logger.info({ service: "agenda" }, "Agenda connected to database.");
