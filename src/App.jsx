import React, { useEffect, useState } from 'react';
import { sendMessage, chatStream } from './chat';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sender, setSender] = useState('');

  useEffect(() => {
    const username = prompt('Enter your name:');
    setSender(username ?? 'Anonymous');

    const sub = chatStream.subscribe((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => sub.unsubscribe();
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const timestamp = new Date().toISOString();

      sendMessage({ sender, text: input, timestamp });
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
          {messages.map((msg, idx) => (
            <div key={idx} className="text-sm text-slate-800">
              <strong>{msg.sender}:</strong> {msg.text}
              <span className="ml-2 text-xs text-gray-400">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
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
