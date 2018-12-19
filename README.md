# NodeRed Data Tracer

It helps enriching given object with metadata.  
It add information about when the data has been treated and by which NodeRed flow.  

E.g. the following object...
```js
{
    id: 123,
    name: 'qwerty',
    // ...
}
```

...will be enriched as following:
```js
{
    id: 123,
    name: 'qwerty',
    // ...
    _metadata: {
        logs: [
            {
                flowName: 'example-collector',
                time: 1545218628149,
            },
            {
                flowName: 'example-enricher',
                time: 1545218628151,
            },
        ],
    },
}
```

## How to use it

Pick `data-tracer` from the list of nodes.  
Wire it at the end of the nodered process.  
Configure the node property, the flow name and the target property.  

## Local development


```console
npm install -g node-red
node-red
```

Nodered should works [localhost:1880](http://localhost:1880), now kill it 🔫

```console
cd ~/.node-red
npm link /path/to/node-red-contrib-data-tracer
node-red
```

The node `data-tracer` is now available 💪

Working NodeRed example:

```json
[{"id":"709ae9a5.fb128","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"e7a83422.2c5da8","type":"inject","z":"709ae9a5.fb128","name":"","topic":"","payload":"{\"id\":123,\"_metadata\":{\"logs\":[{\"flowName\":\"example-collector\",\"time\":1545229474815}]}}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":60,"wires":[["f99e6105.8bb5e"]]},{"id":"c3c992e7.79cf48","type":"debug","z":"709ae9a5.fb128","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":130,"y":220,"wires":[]},{"id":"f99e6105.8bb5e","type":"data-tracer","z":"709ae9a5.fb128","name":"","prop":"","flowName":"example-enricher","dataProp":"_metadata","x":150,"y":140,"wires":[["c3c992e7.79cf48"]]}]
```
