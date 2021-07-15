## winston-rsyslog

A pure Javascript Rsyslog module with support for RFC3164, RFC5424 based on `syslog-pro`

By default, `winston-rsyslog` is use format `rfc3164`.

### Installation

```shell
npm install winston-rsyslog
```

### Example Usage

Example of using `winston-rsyslog`.

```js
import winston from 'winston'
import RSyslog from 'winston-rsyslog'

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
