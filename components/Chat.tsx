"use client";
import { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';
import Suggestions from './Suggestions';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm your McAssistant. Ask me about menu items, prices, calories, or nearby stores." },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content }]);
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [...messages, { role: 'user', content }] }) });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat">
      <div className="messages" ref={listRef}>
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.content} />
        ))}
        {isLoading && <div className="meta">Thinking?</div>}
      </div>
      <Suggestions onPick={send} />
      <div className="inputRow">
        <input
          value={input}
          placeholder="Ask about Big Mac calories, price of fries, nearest store?"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send();
          }}
        />
        <button onClick={() => send()} disabled={isLoading}>Send</button>
      </div>
    </div>
  );
}
