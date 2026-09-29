import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sendMessage } from '../../../shared/api/greenApi';
import { useChatSession } from './useChatSession';
import { useNotifications } from './useNotifications';
import type { Message } from '../../../shared/types/message.ts';

vi.mock('../../../shared/api/greenApi', () => ({
  sendMessage: vi.fn(),
}));

vi.mock('./useNotifications.ts', () => ({
  useNotifications: vi.fn(),
}));

const credentials = {
  idInstance: '12345',
  apiTokenInstance: 'test-token',
};

describe('useChatSession', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a chat with normalized phone', () => {
    const { result } = renderHook(() =>
      useChatSession({
        credentials,
        enabled: true,
      }),
    );

    act(() => {
      result.current.createChat(' 79001234567 ');
    });

    expect(result.current.activeChat).toEqual({
      id: '79001234567@c.us',
      phone: '79001234567',
    });
  });

  it('sends a message and adds it to messages', async () => {
    vi.mocked(sendMessage).mockResolvedValue({
      idMessage: 'message-123',
    });

    const { result } = renderHook(() =>
      useChatSession({
        credentials,
        enabled: true,
      }),
    );

    act(() => {
      result.current.createChat('79001234567');
      result.current.setMessageText('  Привет!  ');
    });

    await act(async () => {
      await result.current.handleSendMessage();
    });

    expect(sendMessage).toHaveBeenCalledWith({
      idInstance: '12345',
      apiTokenInstance: 'test-token',
      chatId: '79001234567@c.us',
      message: 'Привет!',
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]).toMatchObject({
      id: 'message-123',
      text: 'Привет!',
      sender: 'me',
    });
    expect(result.current.messageText).toBe('');
    expect(result.current.isSending).toBe(false);
  });

  it('sets error when sending message fails', async () => {
    vi.mocked(sendMessage).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() =>
      useChatSession({
        credentials,
        enabled: true,
      }),
    );

    act(() => {
      result.current.createChat('79001234567');
      result.current.setMessageText('Привет!');
    });

    await act(async () => {
      await result.current.handleSendMessage();
    });

    expect(result.current.error).toBe('Не удалось отправить сообщение');
    expect(result.current.messages).toHaveLength(0);
    expect(result.current.isSending).toBe(false);
  });

  it('does not add the same incoming message twice', () => {
    let onMessage: ((message: Message) => void) | undefined;

    vi.mocked(useNotifications).mockImplementation(
      ({ onMessage: handleMessage }) => {
        onMessage = handleMessage;
      },
    );

    const { result } = renderHook(() =>
      useChatSession({
        credentials,
        enabled: true,
      }),
    );

    const message: Message = {
      id: 'incoming-123',
      text: 'Привет!',
      sender: 'them',
      timestamp: 1_700_000_000,
    };

    act(() => {
      onMessage?.(message);
      onMessage?.(message);
    });

    expect(result.current.messages).toEqual([message]);
  });
});
