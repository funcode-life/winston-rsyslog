import Transport from 'winston-transport'
// @ts-ignore
import { RFC3164, RFC5424 } from 'syslog-pro'

type RSyslogOptions = {
  app?: string,
  host?: string,
  port?: number,
  format?: string
}

class RSyslog extends Transport {
  logger: any

  constructor(options: RSyslogOptions) {
    super({})

    const Syslog = options?.format?.toLowerCase() === 'rfc5424'
      ? RFC5424 : RFC3164
    this.logger = new Syslog({
      applacationName: options.app,
      server: {
        target: options.host,
        port: options.port
      }
    })
  }

  log(info: any, callback: Function) {
    const level = info.level
    if (typeof this.logger[level] !== 'function') throw new Error(`this level ${level} is incorrect`)
    const message = info.message
    if (typeof message === 'string') {
      const lines = message.split('\n')
      lines.forEach(line => this.logger[level](line).finally(() => callback(null, true)))
    } else {
      this.logger[level](JSON.stringify(message)).finally(() => callback(null, true))
    }
  }
}

export default RSyslog
