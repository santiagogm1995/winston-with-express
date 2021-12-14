const winston = require("winston");
const { splat, combine, timestamp, printf } = winston.format;
const express = require("express");
const app = express();

//Format logs
const customFormat = printf(({ timestamp, level, message, meta }) => {
  return `{"level":"${level}","time":"${Intl.DateTimeFormat("es-ES", {
    dateStyle: "short",
    timeStyle: "long",
  }).format(new Date(timestamp))}","content":${JSON.stringify(message)}}`;
});

//Create the logger
const logger = winston.createLogger({
  format: combine(timestamp(), splat(), customFormat),
  transports: [new winston.transports.Console()],
});

app.listen(process.env.PORT, () => {
  logger.info("system", `Server running on port ${process.env.PORT}`);
});
