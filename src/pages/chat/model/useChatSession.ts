import { useCallback, useEffect, useRef, useState } from 'react';
import { sendMessage } from '../../../shared/api/greenApi';
import { useNotifications } from './useNotifications.ts';
import type { Chat } from '../../../shared/types/chat';
import type { GreenApiCredentials } from '../../../shared/types/greenApi';
import type { Message } from '../../../shared/types/message';

type UseChatSessionParams = {
  credentials: GreenApiCredentials | null;
  enabled: boolean;
};

export const useChatSession = ({
  credentials,
  enabled,
}: UseChatSessionParams) => {
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const createChat = useCallback((phone: string) => {
    const normalizedPhone = phone.trim();

    if (!normalizedPhone) {
      return null;
    }

    const chat: Chat = {
      id: `${normalizedPhone}@c.us`,
      phone: normalizedPhone,
    };

    setActiveChat(chat);
    setMessages([]);
    setMessageText('');
    setError('');

    return chat;
  }, []);

  const setChatId = useCallback((chatId: string) => {
    setActiveChat((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        chatId,
      };
    });
  }, []);

  const handleMessage = useCallback((message: Message) => {
    setMessages((prev) => {
      if (prev.some((item) => item.id === message.id)) {
        return prev;
      }

      return [...prev, message];
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !activeChat || !credentials || isSending) {
      return;
    }

    const message = messageText.trim();

    try {
      setError('');
      setIsSending(true);

      const result = await sendMessage({
        idInstance: credentials.idInstance,
        apiTokenInstance: credentials.apiTokenInstance,
        chatId: activeChat.chatId ?? activeChat.id,
        message,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: result.idMessage,
          text: message,
          sender: 'me',
          timestamp: Date.now(),
        },
      ]);

      setMessageText('');
    } catch {
      setError('Не удалось отправить сообщение');
    } finally {
      setIsSending(false);
    }
  };

  useNotifications({
    idInstance: credentials?.idInstance ?? '',
    apiTokenInstance: credentials?.apiTokenInstance ?? '',
    chatId: activeChat?.chatId ?? '',
    onMessage: handleMessage,
    onChatId: setChatId,
    enabled: enabled && Boolean(credentials) && Boolean(activeChat),
  });

  return {
    activeChat,
    messages,
    messageText,
    isSending,
    error,
    messagesEndRef,
    createChat,
    setMessageText,
    handleSendMessage,
  };
};
