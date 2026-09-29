import { type SubmitEvent, useState } from 'react';
import type { GreenApiCredentials } from '../../shared/types/greenApi';

type ConnectFormProps = {
  error: string;
  isConnecting: boolean;
  onConnect: (credentials: GreenApiCredentials) => Promise<boolean>;
};

export const ConnectForm = ({
  error,
  isConnecting,
  onConnect,
}: ConnectFormProps) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    void onConnect({
      idInstance,
      apiTokenInstance,
    });
  };

  return (
    <form
      className="
        m-auto
        flex
        w-[min(380px,calc(100%_-_32px))]
        flex-col
        gap-3
        mt-2
        rounded-[18px]
        border
        border-[#e6eaee]
        bg-white/[0.96]
        p-7
        shadow-[0_12px_40px_rgba(35,45,60,0.1)]
      "
      onSubmit={handleSubmit}
    >
      <h2 className="mb-2 text-[23px] font-semibold tracking-[-0.2px]">
        Подключение
      </h2>

      <input
        aria-label="idInstance"
        value={idInstance}
        onChange={(event) => setIdInstance(event.target.value)}
        placeholder="idInstance"
        className="
          min-h-11
          rounded-[11px]
          border
          border-transparent
          bg-[#f4f5f7]
          px-3.5
          text-[#1f2329]
          outline-none
          transition-colors
          placeholder:text-[#969ca5]
          focus:border-[#b8bec7]
          focus:bg-white
        "
      />

      <input
        aria-label="apiTokenInstance"
        type="password"
        autoComplete="off"
        value={apiTokenInstance}
        onChange={(event) => setApiTokenInstance(event.target.value)}
        placeholder="apiTokenInstance"
        className="
          min-h-11
          rounded-[11px]
          border
          border-transparent
          bg-[#f4f5f7]
          px-3.5
          text-[#1f2329]
          outline-none
          transition-colors
          placeholder:text-[#969ca5]
          focus:border-[#b8bec7]
          focus:bg-white
        "
      />

      {error && (
        <div role="alert" className="text-[13px] text-[#d64545]">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isConnecting}
        className="
          min-h-11
          rounded-[11px]
          border-0
          bg-[#202327]
          px-4
          font-medium
          text-white
          transition-colors
          hover:bg-[#30343a]
          disabled:cursor-default
          disabled:opacity-50
        "
      >
        {isConnecting ? 'Подключение...' : 'Подключиться'}
      </button>
    </form>
  );
};
