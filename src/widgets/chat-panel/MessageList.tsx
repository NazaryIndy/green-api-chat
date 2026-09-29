import type { RefObject } from 'react';
import type { Message } from '../../shared/types/message.ts';
import { MessageBubble } from './MessageBubble.tsx';

type MessageListProps = {
  messages: Message[];
  messagesEndRef: RefObject<HTMLDivElement | null>;
};

export const MessageList = ({ messages, messagesEndRef }: MessageListProps) => {
  return (
    <div
      className="
        flex
        min-h-0
        flex-1
        flex-col
        gap-1.5
        overflow-y-auto
        px-5
        pb-3.5
        pt-[18px]
        [scrollbar-width:thin]
      "
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};
