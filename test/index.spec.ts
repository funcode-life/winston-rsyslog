import RSyslog from '../src/index';
import runServer from './server';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import getPort from 'get-port';
import parse from 'nsyslog-parser';
import * as winston from 'winston';

const randomMessage = () => Math.random().toString(36).slice(2);

chai.use(chaiAsPromised);
chai.should();

describe('test winston rsyslog', () => {
  it('RFC3164', async () => {
    const port = await getPort();
    const message = randomMessage();
    await runServer(port, (msg) => {
      const parsed = parse(msg);
      chai.expect(parsed).property('type').equal('BSD');
      chai.expect(parsed).property('level').equal('error');
      chai.expect(parsed).property('message').includes(message);
    });
    const logger = winston.createLogger({
      transports: [
        new RSyslog({
          app: 'test',
          host: '127.0.0.1',
          port,
        }),
      ],
    });
    logger.error({ message });
  });

  it('RFC5424', async () => {
    const port = await getPort();
    const message = randomMessage();
    await runServer(port, (msg) => {
      const parsed = parse(msg);
      chai.expect(parsed).property('type').equal('RFC5424');
      chai.expect(parsed).property('level').equal('warn');
      chai.expect(parsed).property('message').includes(message);
    });
    const logger = winston.createLogger({
      transports: [
        new RSyslog({
          rfc: 'RFC5424',
          app: 'test',
          host: '127.0.0.1',
          port,
        }),
      ],
    });
    logger.warn(message);
  });
});
