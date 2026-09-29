import { useState } from 'react';
import type { Chat } from '../../shared/types/chat';
import type { Message } from '../../shared/types/message';
import { NewChatForm } from '../../features/create-chat/NewChatForm.tsx';
import { ChatItem } from './ChatItem.tsx';

type ChatSidebarProps = {
  chat: Chat | null;
  messages: Message[];
  onCreateChat: (phone: string) => boolean;
  onSelectChat: () => void;
  isChatOpen: boolean;
};

export const ChatSidebar = ({
  chat,
  messages,
  onCreateChat,
  onSelectChat,
  isChatOpen,
}: ChatSidebarProps) => {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  const handleCreateChat = (phone: string) => {
    const created = onCreateChat(phone);

    if (created) {
      setIsNewChatOpen(false);
    }

    return created;
  };

  return (
    <aside
      className={`
        flex
        min-w-0
        flex-col
        overflow-hidden
        border-r
        border-[#e5e8ec]
        bg-white
        max-[700px]:h-full
        max-[700px]:w-full
        ${isChatOpen ? 'max-[700px]:hidden' : ''}
      `}
    >
      <div className="flex h-16 min-w-0 shrink-0 items-center justify-between px-4">
        <h2 className="m-0 min-w-0 truncate text-[21px] font-semibold tracking-[-0.2px]">
          Чаты
        </h2>

        <button
          type="button"
          className="
            flex
            h-9
            w-9
            min-w-9
            basis-9
            min-h-9
            shrink-0
            items-center
            justify-center
            rounded-full
            border-0
            bg-[#202327]
            p-0
            text-white
            transition-[background-color,transform]
            duration-[150ms]
            hover:bg-[#30343a]
            active:scale-95
          "
          onClick={() => setIsNewChatOpen((prev) => !prev)}
          aria-label="Новый чат"
          aria-expanded={isNewChatOpen}
        >
          <span
            className="
              block
              text-[23px]
              font-normal
              leading-none
              transition-transform
              duration-[150ms]
              translate-y-[-2px]
            "
          >
            {isNewChatOpen ? '×' : '+'}
          </span>
        </button>
      </div>

      <div
        className={`
          grid
          transition-[grid-template-rows,opacity]
          duration-[180ms]
          ease-in-out
          ${isNewChatOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}
        aria-hidden={!isNewChatOpen}
      >
        <div
          className={`
            min-h-0
            overflow-hidden
            px-3
            transition-[padding,transform]
            duration-[280ms]
            ease-in-out
            ${isNewChatOpen ? 'pb-6 translate-y-0' : 'translate-y-[-6px]'}
          `}
        >
          <NewChatForm onCreateChat={handleCreateChat} />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
        {chat ? (
          <ChatItem
            chat={chat}
            lastMessage={messages.at(-1)}
            onSelectChat={onSelectChat}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center text-[14px] text-[#7f8a95]">
            Нет чатов
          </div>
        )}
      </div>
    </aside>
  );
};
