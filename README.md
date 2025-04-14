# Realtime Chat App

A simple real-time chat application built with **React**, **RxJS**, and **WebSockets**, using **Bun** and **Rsbuild** as the development stack.

## Features

- Real-time chat messages with WebSockets
- Typing indicators with throttled and debounced updates
- Auto-scrolling chat UI
- Clean and responsive design using Tailwind CSS
- Lightweight and fast dev environment powered by Bun and Rsbuild

## Stack

- **Frontend**: React, RxJS, Tailwind
- **Server**: Fastify
- **Transport**: WebSocket
- **Bundler**: Rsbuild
- **Runtime**: Bun

## Getting Started

Install dependencies

```bash
bun install
```

Start the server

```bash
bun server
```

Start the app

```bash
bun dev
```

You can open two or more tabs on the browser to try it out.

## How It Works

### WebSocket Streaming

- A `ReconnectingWebSocket` connects to the server.
- All incoming messages are parsed and pushed into a shared `Subject` stream.
- RxJS is used to handle:
  - `typing` events (throttled)
  - `stop_typing` events (debounced)

### Typing Indicators

- When a user types, their username is emitted to the `typing$` subject.
- After 3 seconds of inactivity, a `stop_typing` message is sent.

### UI Behavior

- Incoming messages (system/user) are shown with timestamps.
- System messages (like join/leave) are styled differently.
- Typing users are displayed with "is typing..." hints.
- Auto-scroll to bottom on new messages.

## Example Message Format

```json
{
  "type": "message", // or "typing", "stop_typing", "system"
  "sender": "Antonis",
  "text": "Hello world!",
  "timestamp": "2025-04-14T13:00:00.000Z"
}
```
