import { useEffect } from 'react';

import {
  deleteNotification,
  receiveNotification,
} from '../../../shared/api/greenApi.ts';
import type { Message } from '../../../shared/types/message.ts';
import type { IncomingMessage } from '../../../shared/types/greenApi.ts';

type UseNotificationsParams = {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
  onMessage: (message: Message) => void;
  onChatId: (chatId: string) => void;
  enabled: boolean;
};

const getMessageText = (message: IncomingMessage) => {
  if (message.messageData.typeMessage === 'textMessage') {
    return message.messageData.textMessageData.textMessage;
  }

  return message.messageData.extendedTextMessageData.text;
};

export const useNotifications = ({
  idInstance,
  apiTokenInstance,
  chatId,
  onMessage,
  onChatId,
  enabled,
}: UseNotificationsParams) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const receiveMessages = async () => {
      while (!signal.aborted) {
        try {
          const notification = await receiveNotification({
            idInstance,
            apiTokenInstance,
            signal,
          });

          if (signal.aborted) {
            return;
          }

          if (!notification) {
            continue;
          }

          const { body } = notification;
          const incomingChatId = body.senderData.chatId;

          if (!chatId) {
            onChatId(incomingChatId);
          }

          if (chatId && incomingChatId !== chatId) {
            await deleteNotification({
              idInstance,
              apiTokenInstance,
              receiptId: notification.receiptId,
            });

            continue;
          }

          const message = getMessageText(body);

          onMessage({
            id: body.idMessage,
            text: message,
            sender: 'them',
            timestamp: body.timestamp,
          });

          await deleteNotification({
            idInstance,
            apiTokenInstance,
            receiptId: notification.receiptId,
          });
        } catch {
          if (signal.aborted) {
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    };

    void receiveMessages();

    return () => {
      controller.abort();
    };
  }, [enabled, idInstance, apiTokenInstance, onMessage, onChatId, chatId]);
};
