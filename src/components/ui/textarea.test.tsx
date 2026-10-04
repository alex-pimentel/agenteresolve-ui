import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders a textarea with the given placeholder', () => {
    render(<Textarea placeholder="Descreva o problema" />);

    const textarea = screen.getByPlaceholderText('Descreva o problema');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('data-slot', 'textarea');
  });
});
