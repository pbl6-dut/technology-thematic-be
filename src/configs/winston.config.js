import * as winston from 'winston';
// import * as path from 'path';
// import logstash from 'winston-logstash-transport';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  elasticsearch: {
    level: 'debug',
    clientOpts: {
      node: 'http://localhost:9200',
      log: 'info',
      maxRetries: 2,
      requestTimeout: 10000,
      sniffOnStart: false,
    },
  },
};

const logger = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.Console(options.console),
    new ElasticsearchTransport(options.elasticsearch),
  ],
});

logger.debug('a debug message');
logger.info('an info log');

export default logger;
