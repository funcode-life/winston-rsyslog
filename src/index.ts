import Transport from 'winston-transport'
// @ts-ignore
import { RFC3164, RFC5424 } from 'syslog-pro'

type RSyslogOptions = {
  app?: string,
  host?: string,
  port?: number,
  format?: string
}

type RSyslogMessage = {
  level: string,
  message: string
}

class RSyslog extends Transport {
  logger: any
  messages: RSyslogMessage[] = []
  is_sending: boolean = false

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

  async serial_sender(): Promise<void> {
    // 循环中跳出
    if (this.is_sending) return

    // 循环主体
    const loop = async (): Promise<void> => {
      // 空队列重置
      if (!this.messages.length) {
        this.is_sending = false
        return
      }

      this.is_sending = true
      const { level, message } = this.messages.shift() as RSyslogMessage
      try {
        await this.logger[level](message)
      } catch (e) {
        console.error('send rsyslog failed: ', e)
      }
      return loop()
    }

    return loop()
  }

  log(info: any, callback: Function) {
    const { level, message } = info
    if (typeof this.logger[level] !== 'function') throw new Error(`this level ${level} is incorrect`)

    if (typeof message === 'string') {
      const lines = message.split('\n')
      lines.forEach(line => this.messages.push({
        level,
        message: line
      }))
    } else {
      this.messages.push({
        level,
        message: JSON.stringify(message)
      })
    }

    this.serial_sender()

    callback(null, true)
  }
}

export default RSyslog
