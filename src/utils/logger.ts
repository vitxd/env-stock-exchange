import { createLogger, format, transports, addColors } from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  trace: 5,
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'

  return isDevelopment ? 'debug' : 'warn'
}

const logger = createLogger({
  level: level(),
  levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
    format.json(),
  ),
  transports: [
    new transports.Console(),
  ],
});

export default logger;