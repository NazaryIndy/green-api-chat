import { MessageInput } from '../../features/send-message/MessageInput.tsx';
import { MessageList } from './MessageList';
import type { Chat } from '../../shared/types/chat';
import type { Message } from '../../shared/types/message';
import type { RefObject } from 'react';
import { ChatHeader } from './ChatHeader.tsx';
import { EmptyChat } from './EmptyChat.tsx';

type ChatPanelProps = {
  chat: Chat | null;
  messages: Message[];
  messageText: string;
  isSending: boolean;
  error: string;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onBack: () => void;
  onMessageChange: (value: string) => void;
  onSend: () => void;
  isChatOpen: boolean;
};

export const ChatPanel = ({
  chat,
  messages,
  messageText,
  isSending,
  error,
  messagesEndRef,
  onBack,
  onMessageChange,
  onSend,
  isChatOpen,
}: ChatPanelProps) => {
  return (
    <section
      className={`
        relative
        flex
        h-full
        min-h-0
        min-w-0
        flex-col
        overflow-hidden
        bg-[#9ad5ed]
        bg-[url("../assets/chat-pattern.svg"),linear-gradient(45deg,#9ad5d6_0%,#8ac9ed_50%,#85c2f6_100%)]
        bg-repeat
        bg-[length:375px_812px,100%_100%]
        bg-[position:0_0,0_0]
        max-[700px]:h-full
        max-[700px]:w-full
        ${isChatOpen ? 'max-[700px]:flex' : 'max-[700px]:hidden'}
      `}
    >
      {chat ? (
        <>
          <ChatHeader phone={chat.phone} onBack={onBack} />

          {error && (
            <div
              role="alert"
              className="
                shrink-0
                px-4
                py-[7px]
                text-[13px]
                text-[#d64545]
                bg-white/[0.75]
              "
            >
              {error}
            </div>
          )}

          <MessageList messages={messages} messagesEndRef={messagesEndRef} />

          <MessageInput
            value={messageText}
            isSending={isSending}
            onChange={onMessageChange}
            onSend={onSend}
          />
        </>
      ) : (
        <EmptyChat />
      )}
    </section>
  );
};
