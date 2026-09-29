import { useCallback, useState } from 'react';
import { getStateInstance } from '../../../shared/api/greenApi';
import type { GreenApiCredentials } from '../../../shared/types/greenApi';

export const useChatConnection = () => {
  const [credentials, setCredentials] = useState<GreenApiCredentials | null>(
    null,
  );

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const connect = useCallback(async (nextCredentials: GreenApiCredentials) => {
    const idInstance = nextCredentials.idInstance.trim();
    const apiTokenInstance = nextCredentials.apiTokenInstance.trim();

    if (!idInstance || !apiTokenInstance) {
      setError('Введите idInstance и apiTokenInstance');
      return false;
    }

    try {
      setError('');
      setIsConnecting(true);

      const result = await getStateInstance({
        idInstance,
        apiTokenInstance,
      });

      if (result.stateInstance !== 'authorized') {
        setError(
          `Инстанс не авторизован. Текущий статус: ${result.stateInstance}`,
        );

        setIsConnected(false);

        return false;
      }

      setCredentials({
        idInstance,
        apiTokenInstance,
      });

      setIsConnected(true);

      return true;
    } catch {
      setError('Не удалось подключиться. Проверьте credentials.');

      setIsConnected(false);

      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  return {
    credentials,
    isConnected,
    isConnecting,
    error,
    connect,
  };
};
