import { useState } from 'react';
import type { SubmitEvent } from 'react';

import { isValidPhone, normalizePhone } from './model/phone';

type NewChatFormProps = {
  onCreateChat: (phone: string) => boolean;
};

export const NewChatForm = ({ onCreateChat }: NewChatFormProps) => {
  const [phone, setPhone] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const isValid = isValidPhone(phone);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitAttempted(true);

    if (!isValid) {
      return;
    }

    const normalizedPhone = normalizePhone(phone);
    const created = onCreateChat(normalizedPhone);

    if (!created) {
      return;
    }

    setPhone('');
    setSubmitAttempted(false);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="mb-1 text-[13px] font-semibold text-[#737b84]">
        Новый чат
      </div>

      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        aria-label="Номер телефона получателя"
        value={phone}
        onBeforeInput={(event) => {
          if (event.data && !/[\d+()\s-]/.test(event.data)) {
            event.preventDefault();
          }
        }}
        onChange={(event) => {
          setPhone(event.target.value);

          if (submitAttempted) {
            setSubmitAttempted(false);
          }
        }}
        placeholder="+7 900 123 45 67"
        aria-invalid={submitAttempted && !isValid}
        className="
          min-h-10
          w-full
          rounded-[10px]
          border
          border-transparent
          bg-[#f4f5f7]
          px-3
          text-[14px]
          text-[#1f2329]
          transition-colors
          placeholder:text-[#969ca5]
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-[#4d9cff]
        "
      />

      {submitAttempted && !isValid && (
        <div className="px-1 text-[12px] text-[#d64545]" role="alert">
          Введите корректный номер телефона
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid}
        className="
          min-h-10
          w-full
          rounded-[10px]
          bg-[#202327]
          px-4
          text-[14px]
          font-medium
          text-white
          transition-colors
          hover:bg-[#30343a]
          focus-visible:outline-2
          focus-visible:outline-offset-1
          focus-visible:outline-[#4d9cff]
          disabled:cursor-default
          disabled:opacity-40
        "
      >
        Создать чат
      </button>
    </form>
  );
};
