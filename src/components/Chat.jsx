import { useEffect, useRef, useState } from 'react';

import { sendMessage, chatStream } from '../chat';

export function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const chatContainerRef = useRef(null);

  useEffect(() => {
    const sub = chatStream.subscribe((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const timestamp = new Date().toISOString();

      sendMessage({ sender: username, text: input, timestamp });
      setInput('');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-50 p-8">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold text-slate-800">
          Hello <span className="text-teal-600">{username}</span>, welcome to
          the chat!
        </h1>

        <div
          className="h-64 overflow-y-auto rounded bg-white p-4 shadow-md"
          ref={chatContainerRef}
        >
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
            {messages.map((message, index) => {
              const isMine = message.sender === username;
              const timestamp = new Date(message.timestamp).toLocaleTimeString(
                [],
                {
                  hour: '2-digit',
                  minute: '2-digit',
                }
              );

              return (
                <div
                  key={index}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex max-w-full flex-col ${isMine ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`mb-0.5 text-xs font-normal text-slate-400 ${
                        isMine ? 'pr-2 text-right' : 'self-start pl-2 text-left'
                      }`}
                    >
                      {isMine ? timestamp : `${message.sender} - ${timestamp}`}
                    </div>

                    <div
                      className={`w-fit max-w-xs rounded-2xl px-4 py-2 shadow md:max-w-sm ${
                        isMine
                          ? 'rounded-br-none bg-teal-500 text-white'
                          : 'rounded-bl-none bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-white'
                      }`}
                    >
                      <div>{message.text}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
