import { useState } from 'react';

import { Chat } from './components/Chat';
import { Landing } from './components/Landing';

export default function App() {
  const [username, setUsername] = useState('');
  const [entered, setEntered] = useState(false);

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
