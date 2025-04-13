import Fastify from 'fastify';
import WebSocket, { WebSocketServer } from 'ws';

const fastify = Fastify();
const wss = new WebSocketServer({ noServer: true });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (message) => {
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

fastify.server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});

fastify.listen({ port: 4000 }, (err) => {
  if (err) {
    throw err;
  }

  console.log('WebSocket server running on ws://localhost:4000');
});
