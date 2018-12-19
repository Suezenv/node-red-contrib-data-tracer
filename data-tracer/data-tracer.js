module.exports = RED => {
    function addMetadata(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.on('input', msg => {
            const messageProperty = config.prop || 'payload';

            if (!msg.hasOwnProperty(messageProperty)) {
                node.error(`The message does not has a property named ${messageProperty}`, msg);

                return;
            }

            const log = {
                flowName: config.flowName,
                time: +new Date(),
            };

            const dataProperty = config.dataProp || '_metadata';

            msg[messageProperty][dataProperty] = msg[messageProperty][dataProperty] || {};
            msg[messageProperty][dataProperty].logs = msg[messageProperty][dataProperty].logs || [];
            msg[messageProperty][dataProperty].logs.push(log);

            node.send(msg);
        });
    }

    RED.nodes.registerType('data-tracer', addMetadata);
}
