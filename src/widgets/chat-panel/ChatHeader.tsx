import { ChatAvatar } from '../../shared/ui/ChatAvatar.tsx';

type ChatHeaderProps = {
  phone: string;
  onBack: () => void;
};

export const ChatHeader = ({ phone, onBack }: ChatHeaderProps) => {
  return (
    <header
      className="
        z-[1]
        flex
        min-h-16
        shrink-0
        items-center
        gap-[11px]
        border-b
        border-[rgba(222,228,234,0.9)]
        bg-white/[0.94]
        px-4
        py-[9px]
        shadow-[0_1px_2px_rgba(0,0,0,0.04)]
      "
    >
      <button
        type="button"
        className="
            hidden
            h-9
            w-9
            min-h-9
            min-w-9
            shrink-0
            basis-9
            items-center
            justify-center
            rounded-full
            border-0
            bg-transparent
            p-0
            text-[#4b535c]
            transition-colors
            hover:bg-[#f0f2f4]
            max-[700px]:flex
        "
        onClick={onBack}
        aria-label="Назад к чатам"
      >
        <svg
          viewBox="0 0 24 24"
          focusable="false"
          height="28"
          width="28"
          className="rotate-180"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z" />
        </svg>
      </button>

      <ChatAvatar />

      <div className="min-w-0">
        <h2 className="m-0 overflow-hidden text-[15px] font-semibold text-ellipsis whitespace-nowrap">
          {phone}
        </h2>
      </div>
    </header>
  );
};
