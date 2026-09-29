import type { Chat } from '../../shared/types/chat';
import type { Message } from '../../shared/types/message';
import { ChatAvatar } from '../../shared/ui/ChatAvatar.tsx';

type ChatItemProps = {
  chat: Chat;
  lastMessage: Message | undefined;
  onSelectChat: () => void;
};

export const ChatItem = ({
  chat,
  lastMessage,
  onSelectChat,
}: ChatItemProps) => {
  return (
    <button
      type="button"
      className="
        flex
        min-h-[72px]
        w-full
        items-center
        gap-[11px]
        rounded-none
        border-0
        bg-white
        px-[14px]
        py-2.5
        text-left
        text-[#1f2329]
        transition-colors
        hover:bg-[#f4f6f8]
        focus-visible:outline-2
        focus-visible:outline-offset-[-2px]
        focus-visible:outline-[#6da9ff]
        active:transform-none
      "
      onClick={onSelectChat}
    >
      <ChatAvatar />

      <span className="flex min-w-0 flex-col gap-[3px]">
        <span
          className="
            overflow-hidden
            text-[14px]
            font-semibold
            text-ellipsis
            whitespace-nowrap
          "
        >
          {chat.phone}
        </span>

        <span
          className="
            overflow-hidden
            text-[13px]
            text-[#8a919a]
            text-ellipsis
            whitespace-nowrap
          "
        >
          {lastMessage?.text ?? 'Нет сообщений'}
        </span>
      </span>
    </button>
  );
};
