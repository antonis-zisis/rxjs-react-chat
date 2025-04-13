import React, { useEffect, useState } from 'react';
import { sendMessage, chatStream } from './chat';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const sub = chatStream.subscribe((message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => sub.unsubscribe();
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage({ text: input, timestamp: new Date().toISOString() });
      setInput('');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-50 p-8">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold text-teal-600">
          Chat App with RxJS and React
        </h1>

        <div className="h-64 overflow-y-auto rounded bg-white p-4 shadow-md">
          {messages.map((message, index) => (
            <div key={index} className="text-sm text-slate-800">
              [{new Date(message.timestamp).toLocaleTimeString()}]{' '}
              {message.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 rounded border p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          <button
            className="rounded bg-teal-600 px-4 py-2 text-white"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
