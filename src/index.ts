import Transport from 'winston-transport'
import { RFC3164, RFC5424 } from 'syslog-pro'

type RSyslogOptions = {
  app: string,
  host?: string,
  port?: number,
  format?: string
}

class RSyslog extends Transport {
  logger: any

  constructor(options: RSyslogOptions) {
    if (!options.app) throw new Error('option app is required')

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
      const tasks = lines.reduce(async (acc, line) => {
        await acc
        return this.logger[level](line)
      }, Promise.resolve())
      tasks.finally(() => callback(null, true))
    } else {
      this.logger[level](JSON.stringify(message)).finally(() => callback(null, true))
    }
  }
}

export default RSyslog
