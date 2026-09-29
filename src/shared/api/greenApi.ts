import axios from 'axios';

import type {
  DeleteNotificationParams,
  GetStateInstanceParams,
  GetStateInstanceResponse,
  GreenApiNotification,
  ReceiveNotificationParams,
  SendMessageParams,
  SendMessageResponse,
} from '../types/greenApi';

const GREEN_API_URL = 'https://api.green-api.com';

const buildUrl = (
  idInstance: string,
  apiTokenInstance: string,
  method: string,
) => `${GREEN_API_URL}/waInstance${idInstance}/${method}/${apiTokenInstance}`;

export const sendMessage = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  message,
}: SendMessageParams) => {
  const response = await axios.post<SendMessageResponse>(
    buildUrl(idInstance, apiTokenInstance, 'sendMessage'),
    {
      chatId,
      message,
    },
  );

  return response.data;
};

export const receiveNotification = async ({
  idInstance,
  apiTokenInstance,
  signal,
}: ReceiveNotificationParams) => {
  const response = await axios.get<GreenApiNotification | null>(
    buildUrl(idInstance, apiTokenInstance, 'receiveNotification'),
    {
      params: {
        receiveTimeout: 60,
      },
      signal,
    },
  );

  return response.data;
};

export const deleteNotification = async ({
  idInstance,
  apiTokenInstance,
  receiptId,
}: DeleteNotificationParams) => {
  const response = await axios.delete<{ result: boolean }>(
    `${buildUrl(idInstance, apiTokenInstance, 'deleteNotification')}/${receiptId}`,
  );

  return response.data;
};

export const getStateInstance = async ({
  idInstance,
  apiTokenInstance,
}: GetStateInstanceParams) => {
  const response = await axios.get<GetStateInstanceResponse>(
    buildUrl(idInstance, apiTokenInstance, 'getStateInstance'),
  );

  return response.data;
};
