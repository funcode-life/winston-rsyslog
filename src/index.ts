import { Format } from 'logform';
import { RFC3164, RFC5424 } from 'syslog-pro';
import { LEVEL, MESSAGE } from 'triple-beam';
import Transport from 'winston-transport';

interface RSyslogOptions {
  app: string;
  host?: string;
  port?: number;
  rfc?: 'RFC5424' | 'RFC3164';
  format?: Format;
}

interface LogInfo {
  level: string;
  message: string;
}

class RSyslog extends Transport {
  logger: RFC3164 | RFC5424;

  constructor(options: RSyslogOptions) {
    if (!options.app) throw new Error('option app is required');

    super({
      format: options.format,
    });

    const Syslog = options?.rfc === 'RFC5424' ? RFC5424 : RFC3164;
    this.logger = new Syslog({
      applicationName: options.app,
      server: {
        target: options.host,
        port: options.port,
      },
    });
  }

  log(info: LogInfo, callback: (err: Error | null, ok?: boolean) => void) {
    const level = info[LEVEL];
    if (typeof this.logger[level] !== 'function')
      throw new Error(`This level ${level} is incorrect`);
    const message = info[MESSAGE];
    if (typeof message === 'string') {
      const lines = message.split('\n');
      const tasks = lines.reduce(async (acc, line) => {
        await acc;
        return this.logger[level](line);
      }, Promise.resolve());
      tasks.finally(() => callback(null, true));
    } else {
      this.logger[level](JSON.stringify(message)).finally(() =>
        callback(null, true),
      );
    }
  }
}

export default RSyslog;
