import * as chai from 'chai'
import { RFC3164, RFC5424 } from 'syslog-pro'
import RSyslog from '../src/index'

chai.should()

describe('test winston rsyslog', () => {
  it('should use rfc3164', () => {
    const rsyslog = new RSyslog({
      app: 'test',
      host: '127.0.0.1',
      port: 456
    })
    rsyslog.logger.should.to.be.instanceOf(RFC3164)
  })

  it('should use rfc5424', () => {
    const rsyslog = new RSyslog({
      app: 'test',
      host: '127.0.0.1',
      port: 456,
      rfc: 'RFC5424'
    })
    rsyslog.logger.should.to.be.instanceOf(RFC5424)
  })
})
