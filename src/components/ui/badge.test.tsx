import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './badge';

describe('Badge', () => {
  it('renders a span with the default variant', () => {
    render(<Badge>Novo</Badge>);

    const badge = screen.getByText('Novo');
    expect(badge).toHaveAttribute('data-slot', 'badge');
    expect(badge).toHaveClass('bg-brand');
  });

  it('applies the outline variant', () => {
    render(<Badge variant="outline">Rascunho</Badge>);

    expect(screen.getByText('Rascunho')).toHaveClass('border-border');
  });

  it('renders as a child element with asChild', () => {
    render(
      <Badge asChild variant="brand">
        <a href="/planos">Pro</a>
      </Badge>,
    );

    expect(screen.getByRole('link', { name: 'Pro' })).toHaveAttribute('href', '/planos');
  });
});
