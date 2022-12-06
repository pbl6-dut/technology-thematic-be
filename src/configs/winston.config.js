import * as winston from 'winston';
import * as path from 'path';
import { LogstashTransport } from 'winston-logstash-transport';

const logstashTransport = new LogstashTransport({
  host: 'logstash',
  port: 1514,
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((log) => {
      if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
      return `[${log.timestamp}] [${log.level}] ${log.message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.colorize({
        all: true,
      }),
    }),
    new winston.transports.File({
      level: 'error',
      filename: path.join(__dirname, '../', 'logs/errors.log'),
      format: winston.format.printf((log) => {
        if (log.stack) return `[${log.timestamp}] ${log.stack}`;
        return `[${log.timestamp}] [${log.level}] ${log.message}`;
      }),
    }),
    new winston.transports.File({
      level: 'info',
      filename: path.join(__dirname, '../', 'logs/infors.log'),
      format: winston.format.combine(
        winston.format.printf((log) => {
          if (log.stack) return `[${log.timestamp}] ${log.stack}`;
          return `[${log.timestamp}] [${log.level}] ${log.message}`;
        }),
        winston.format.colorize({
          all: false,
        })
      ),
    }),
    logstashTransport,
  ],
});

export default logger;
