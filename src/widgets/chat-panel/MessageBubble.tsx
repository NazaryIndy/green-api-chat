import type { Message } from '../../shared/types/message.ts';
import { formatTimestamp, toMilliseconds } from './utils/formatTimestamp';
import { renderMessageText } from './utils/renderMessageText';

type MessageBubbleProps = {
  message: Message;
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const timestamp = toMilliseconds(message.timestamp);

  return (
    <div
      className={`
        w-fit
        max-w-[min(72%,600px)]
        max-[700px]:max-w-[82%]
        break-words
        rounded-[15px]
        px-2.5
        pb-[7px]
        pt-2
        leading-[1.4]
        shadow-[0_1px_2px_rgba(0,0,0,0.06)]
        ${
          message.sender === 'me'
            ? 'self-end rounded-br-[5px] bg-[#e9fefe]'
            : 'self-start rounded-bl-[5px] bg-white'
        }
      `}
    >
      <div className="flex flex-wrap items-end leading-[1.4]">
        <span className="min-w-0 text-[14px]">
          {renderMessageText(message.text)}
        </span>

        <time
          dateTime={new Date(timestamp).toISOString()}
          className="
            ml-auto
            pl-2
            pt-[3px]
            text-[10px]
            leading-none
            whitespace-nowrap
            text-[#7d858e]
          "
        >
          {formatTimestamp(message.timestamp)}
        </time>
      </div>
    </div>
  );
};
