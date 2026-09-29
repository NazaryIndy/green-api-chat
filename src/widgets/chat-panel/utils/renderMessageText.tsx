const URL_PATTERN = /^(https?:\/\/\S+)$/;

export const renderMessageText = (text: string) => {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
    if (!URL_PATTERN.test(part)) {
      return <span key={index}>{part}</span>;
    }

    return (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all underline"
      >
        {part}
      </a>
    );
  });
};
