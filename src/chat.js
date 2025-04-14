import ReconnectingWebSocket from 'reconnecting-websocket';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, throttleTime, map } from 'rxjs/operators';

const ws = new ReconnectingWebSocket('ws://localhost:4000');

const chat$ = new Subject();
const typing$ = new Subject();

ws.addEventListener('message', async (event) => {
  const data = await event.data.text();
  const message = JSON.parse(data);

  chat$.next(message);
});

const setupTypingStream = (sendTyping) => {
  const subscription = new Subscription();

  const typingSub = typing$
    .pipe(
      throttleTime(2000),
      map((username) => ({ sender: username, type: 'typing' }))
    )
    .subscribe(sendTyping);

  const stopTypingSub = typing$
    .pipe(
      debounceTime(3000),
      map((username) => ({ sender: username, type: 'stop_typing' }))
    )
    .subscribe(sendTyping);

  subscription.add(typingSub);
  subscription.add(stopTypingSub);

  return () => subscription.unsubscribe();
};

export const initializeTypingStream = () => {
  return setupTypingStream(sendMessage);
};

export const sendMessage = (message) => {
  chat$.next(message);
  ws.send(JSON.stringify(message));
};

export const chatStream = chat$.asObservable();
export const typingSubject = typing$;
