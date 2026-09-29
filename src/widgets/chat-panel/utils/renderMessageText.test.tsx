import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderMessageText } from './renderMessageText';

describe('renderMessageText', () => {
  it('renders plain text', () => {
    render(<div>{renderMessageText('Привет, как дела?')}</div>);

    expect(screen.getByText('Привет, как дела?')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders URL as a clickable link', () => {
    render(<div>{renderMessageText('https://example.com')}</div>);

    const link = screen.getByRole('link', {
      name: 'https://example.com',
    });

    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders URL inside text as a clickable link', () => {
    const { container } = render(
      <div>{renderMessageText('Открой https://example.com пожалуйста')}</div>,
    );

    expect(container).toHaveTextContent(
      'Открой https://example.com пожалуйста',
    );

    expect(
      screen.getByRole('link', { name: 'https://example.com' }),
    ).toBeInTheDocument();
  });

  it('renders multiple URLs as separate links', () => {
    render(
      <div>
        {renderMessageText(
          'Сайт https://example.com и документация https://docs.example.com',
        )}
      </div>,
    );

    expect(
      screen.getByRole('link', { name: 'https://example.com' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'https://docs.example.com' }),
    ).toBeInTheDocument();
  });

  it('does not render non-http URL as a link', () => {
    render(<div>{renderMessageText('www.example.com')}</div>);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
