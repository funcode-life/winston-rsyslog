import chai from 'chai'
// @ts-ignore
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
      format: 'rfc5424'
    })
    rsyslog.logger.should.to.be.instanceOf(RFC5424)
  })
})
