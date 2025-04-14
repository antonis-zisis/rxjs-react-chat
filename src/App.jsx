import { useCallback, useEffect, useState } from 'react';

import { sendMessage } from './chat';
import { Chat } from './components/Chat';
import { Landing } from './components/Landing';

export default function App() {
  const [username, setUsername] = useState('');
  const [entered, setEntered] = useState(false);

  const sendSystemMessage = useCallback(() => {
    if (entered && username) {
      sendMessage({
        type: 'system',
        sender: username,
        text: `${username} joined the chat`,
        timestamp: new Date().toISOString(),
      });
    }
  }, [entered, username]);

  useEffect(() => {
    sendSystemMessage();
  }, [sendSystemMessage]);

  if (!entered) {
    return (
      <Landing
        setEntered={setEntered}
        setUsername={setUsername}
        username={username}
      />
    );
  }

  return <Chat username={username} />;
}
