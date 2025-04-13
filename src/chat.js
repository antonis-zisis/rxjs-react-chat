import { Subject } from 'rxjs';
import ReconnectingWebSocket from 'reconnecting-websocket';

const chat$ = new Subject();
const ws = new ReconnectingWebSocket('ws://localhost:4000');

ws.addEventListener('message', async (event) => {
  const data = await event.data.text();
  const message = JSON.parse(data);

  chat$.next(message);
});

export const sendMessage = (msg) => {
  chat$.next(msg);
  ws.send(JSON.stringify(msg));
};

export const chatStream = chat$.asObservable();
