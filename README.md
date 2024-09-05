# rsyslog-winston

An pure javascript [rsyslog][0] transport for [winston][1] with support for RFC3164, RFC5424 based on [`syslog-pro`][2]

By default, `rsyslog-winston` is use format `rfc3164`.

## Installation

```shell
npm install rsyslog-winston
```

## Usage

```js
import winston from 'winston'
import RSyslog from 'rsyslog-winston'

const logger = winston.createLogger({
  level: 'error',
  transports: [
    new RSyslog({
      host: 'send_to_remote_host',
      port: 'send_to_remote_port'
    })
  ]
})
```

## Options

```js
{
  app: string, // application name
  host?: string, // rsyslog host
  port?: number, // rysylog port
  rfc?: 'RFC5424' | 'RFC3164',
  format?: Format, // winston log format
}
```

[0]: http://en.wikipedia.org/wiki/Rsyslog
[1]: https://github.com/flatiron/winston
[2]: https://github.com/cyamato/SyslogPro
