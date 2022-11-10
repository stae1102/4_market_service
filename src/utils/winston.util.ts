import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

const env = process.env.NODE_ENV;

const dailyOptions = (level: string) => {
  return {
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'MM-DD-YYYY HH:mm:ss',
      }),
      winston.format.printf(
        (info) => `[${info.timestamp}] ${env}.${info.level}: ${info.message}`,
      ),
    ),
    datePattern: 'MM-DD-YYYY',
    filename: `logs/${level}/%DATE%.${level}.log`,
    maxFiles: 30,
    zippedArchive: true,
  };
};

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: env === 'production' ? 'http' : 'silly',
      format:
        env === 'production'
          ? winston.format.simple()
          : winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike('Market'),
            ),
    }),
    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
});
