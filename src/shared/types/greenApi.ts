export type GreenApiCredentials = {
  idInstance: string;
  apiTokenInstance: string;
};

export type SendMessageParams = {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
  message: string;
};

export type SendMessageResponse = {
  idMessage: string;
};

export type ReceiveNotificationParams = {
  idInstance: string;
  apiTokenInstance: string;
  signal?: AbortSignal;
};

export type DeleteNotificationParams = {
  idInstance: string;
  apiTokenInstance: string;
  receiptId: number;
};

export type GetStateInstanceParams = {
  idInstance: string;
  apiTokenInstance: string;
};

export type GetStateInstanceResponse = {
  stateInstance: string;
};

type IncomingMessageBase = {
  typeWebhook: 'incomingMessageReceived';
  idMessage: string;
  timestamp: number;
  senderData: {
    chatId: string;
  };
};

export type IncomingTextMessage = IncomingMessageBase & {
  messageData: {
    typeMessage: 'textMessage';
    textMessageData: {
      textMessage: string;
    };
  };
};

export type IncomingExtendedTextMessage = IncomingMessageBase & {
  messageData: {
    typeMessage: 'extendedTextMessage';
    extendedTextMessageData: {
      text: string;
    };
  };
};

export type IncomingMessage = IncomingTextMessage | IncomingExtendedTextMessage;

export type GreenApiNotification = {
  receiptId: number;
  body: IncomingMessage;
};
