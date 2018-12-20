const should = require('should');
const helper = require('node-red-node-test-helper');
const dataTracerNode = require('../data-tracer/data-tracer.js');

helper.init(require.resolve('node-red'));

describe('data-tracer Node', () => {
  beforeEach(done => {
    helper.startServer(done);
  });

  afterEach(done => {
    helper.unload();
    helper.stopServer(done);
  });

  it('should be loaded', done => {
    const flow = [{ id: 'n1', type: 'data-tracer', name: 'test name' }];

    helper.load(dataTracerNode, flow, () => {
      const n1 = helper.getNode('n1');
      n1.should.have.property('name', 'test name');
      done();
    });
  });

  xit('should add data trace', done => {
    const flowName = 'example-enricher';
    const flow = [
      { id: 'n1', type: 'data-tracer', name: '', prop: '', flowName, dataProp: '', wires:[['n2']] },
      { id: 'n2', type: 'helper' }
    ];

    helper.load(dataTracerNode, flow, () => {
      const n1 = helper.getNode('n1');
      const n2 = helper.getNode('n2');

      n2.on('input', msg => {
        msg.should.have.propery('payload');
        msg.payload.should.have.propery('id', 123);
        msg.payload.should.have.propery('_metadata');
        msg.payload._metadata.should.have.propery('logs');
        msg.payload._metadata.logs.should.have.propery(0);
        msg.payload._metadata.logs[0].should.have.propery('flowName', flowName);

        done();
      });

      n1.receive({ payload: { id: 123 } });
    });
  });
});
