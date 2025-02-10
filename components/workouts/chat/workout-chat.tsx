import { useChat } from 'ai/react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export default function WorkoutChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col space-y-4 max-w-xl mx-auto p-4">
      <div className="flex flex-col space-y-2">
        {messages.map((m) => (
          <div
            key={m.id}
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
          onChange={handleInputChange}
          placeholder="Ask for a workout plan..."
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}