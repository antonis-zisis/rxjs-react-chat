import { Subject } from 'rxjs';

const chat$ = new Subject();

export const sendMessage = (message) => chat$.next(message);

export const chatStream = chat$.asObservable();
