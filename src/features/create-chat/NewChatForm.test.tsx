import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { NewChatForm } from './NewChatForm';

describe('NewChatForm', () => {
  it('disables submit button when phone is invalid', () => {
    render(<NewChatForm onCreateChat={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Создать чат' })).toBeDisabled();
  });

  it('enables submit button for a valid phone', async () => {
    const user = userEvent.setup();

    render(<NewChatForm onCreateChat={vi.fn()} />);

    const input = screen.getByRole('textbox', {
      name: 'Номер телефона получателя',
    });

    await user.type(input, '8 900 123 45 67');

    expect(screen.getByRole('button', { name: 'Создать чат' })).toBeEnabled();
  });

  it('creates chat with normalized phone', async () => {
    const user = userEvent.setup();
    const onCreateChat = vi.fn().mockReturnValue(true);

    render(<NewChatForm onCreateChat={onCreateChat} />);

    const input = screen.getByRole('textbox', {
      name: 'Номер телефона получателя',
    });

    await user.type(input, '8 900 123 45 67');
    await user.click(screen.getByRole('button', { name: 'Создать чат' }));

    expect(onCreateChat).toHaveBeenCalledWith('79001234567');
  });

  it('clears input after successful chat creation', async () => {
    const user = userEvent.setup();
    const onCreateChat = vi.fn().mockReturnValue(true);

    render(<NewChatForm onCreateChat={onCreateChat} />);

    const input = screen.getByRole('textbox', {
      name: 'Номер телефона получателя',
    });

    await user.type(input, '8 900 123 45 67');
    await user.click(screen.getByRole('button', { name: 'Создать чат' }));

    expect(input).toHaveValue('');
  });

  it('keeps input when chat creation fails', async () => {
    const user = userEvent.setup();
    const onCreateChat = vi.fn().mockReturnValue(false);

    render(<NewChatForm onCreateChat={onCreateChat} />);

    const input = screen.getByRole('textbox', {
      name: 'Номер телефона получателя',
    });

    await user.type(input, '8 900 123 45 67');
    await user.click(screen.getByRole('button', { name: 'Создать чат' }));

    expect(input).toHaveValue('8 900 123 45 67');
  });
});
