## rsyslog-winston

A pure Javascript Rsyslog module with support for RFC3164, RFC5424 based on `syslog-pro`

By default, `rsyslog-winston` is use format `rfc3164`.

### Installation

```shell
npm install rsyslog-winston
```

### Example Usage

Example of using `rsyslog-winston`.

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
