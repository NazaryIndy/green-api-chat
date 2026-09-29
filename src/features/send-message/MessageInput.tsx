import type { SubmitEvent } from 'react';

type MessageInputProps = {
  value: string;
  isSending: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

export const MessageInput = ({
  value,
  isSending,
  onChange,
  onSend,
}: MessageInputProps) => {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending || !value.trim()) {
      return;
    }

    onSend();
  };

  const isDisabled = isSending || !value.trim();

  return (
    <form
      className="
        flex
        w-full
        shrink-0
        items-center
        gap-[9px]
        bg-transparent
        px-[14px]
        pb-[13px]
        pt-[10px]
      "
      onSubmit={handleSubmit}
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Сообщение"
        className="
          min-h-11
          min-w-0
          flex-1
          rounded-[22px]
          border-0
          bg-white
          px-[15px]
          text-[14px]
          text-[#1f2329]
          shadow-[0_1px_3px_rgba(0,0,0,0.08)]
          transition
          placeholder:text-[#9aa1aa]
          focus-visible:outline-2
          focus-visible:outline-offset-1
          focus-visible:outline-[#4d9cff]
        "
      />

      <button
        type="submit"
        disabled={isDisabled}
        aria-label="Отправить сообщение"
        className="
          flex
          h-11
          w-11
          min-h-11
          min-w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          border-0
          bg-[#2388ff]
          p-0
          font-[550]
          text-[20px]
          leading-none
          text-white
          shadow-[0_2px_5px_rgba(35,136,255,0.25)]
          transition-[background-color,transform,opacity]
          duration-[150ms]
          ease-linear
          hover:bg-[#147af0]
          active:translate-y-px
          focus-visible:outline-2
          focus-visible:outline-offset-1
          focus-visible:outline-[#4d9cff]
          disabled:cursor-default
          disabled:opacity-50
        "
      >
        ↑
      </button>
    </form>
  );
};
