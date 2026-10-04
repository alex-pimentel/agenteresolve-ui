import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('renders an input with the given type and placeholder', () => {
    render(<Input type="email" placeholder="voce@exemplo.com" />);

    const input = screen.getByPlaceholderText('voce@exemplo.com');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('data-slot', 'input');
  });

  it('merges a custom className', () => {
    render(<Input className="w-64" aria-label="nome" />);

    expect(screen.getByLabelText('nome')).toHaveClass('w-64');
  });
});
