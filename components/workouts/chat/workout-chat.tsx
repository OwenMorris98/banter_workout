'use client'
import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface Message {
  role: 'user' | 'assistant'; // Define the roles
  content: string;
}

export default function WorkoutChat() {
  const [messages, setMessages] = useState<Message[]>([]); // Specify the type here
  const [input, setInput] = useState('');

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    const userMessage: Message = { role: 'user', content: input }; // Use the Message type
    setMessages([...messages, userMessage]);

    const response = await fetch('/api/workouts/chat-workout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await response.json();
    setMessages([...messages, userMessage, data]);
    setInput('');
  };

  return (
    <div className="flex flex-col space-y-4 max-w-xl mx-auto p-4">
      <div className="flex flex-col space-y-2">
        {messages.map((m, index) => (
          <div
            key={index} // Use index as key for simplicity, but consider a unique identifier if available
            className={`p-4 rounded-lg ${
              m.role === 'assistant'
                ? 'bg-black-800 text-white'
                : 'bg-black-700 text-white'
            }`}
          >
            <p className="text-sm font-semibold mb-1">
              {m.role === 'assistant' ? 'AI Trainer' : 'You'}:
            </p>
            <p className="text-sm whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a workout plan..."
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}