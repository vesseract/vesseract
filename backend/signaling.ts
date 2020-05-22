import {
    VESSClient
} from '../index.d';
import * as WebSocket from 'ws';

const webSocketPort = 4065;

const server = new WebSocket.Server({
    port: webSocketPort
});

console.log(`WebSocket server listening on port ${webSocketPort}`);

let clients: {
    [localAddress: string]: Readonly<VESSClient>;
} = {};

server.on('connection', (client: Readonly<WebSocket>) => {

    console.log('connection', client);

    client.on('message', (message: Readonly<WebSocket.Data>) => {
        const deserializedMessage = JSON.parse(message.toString());

        console.log('deserializedMessage', deserializedMessage);

        if (deserializedMessage.type === 'INITIAL_CONNECTION') {
            
            clients = {
                ...clients,
                [deserializedMessage.localAddress]: {
                    // timestamp: new Date().toLocaleDateString(), // TODO may not be necessary
                    localAddress: deserializedMessage.localAddress,
                    client
                }
            };
            
            return;
        }

        if (!clients[deserializedMessage.remoteAddress]) {
            return;
        }

        clients[deserializedMessage.remoteAddress].client.send(JSON.stringify(deserializedMessage));
    });

    client.on('close', (e: Readonly<WebSocketEventMap>) => {
        console.log('close', e);
    });
});