import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renders its children as a button', () => {
    render(<Button>Salvar</Button>);

    const button = screen.getByRole('button', { name: 'Salvar' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-slot', 'button');
  });

  it('applies the requested variant and size classes', () => {
    render(
      <Button variant="outline" size="lg">
        Enviar
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Enviar' });
    expect(button).toHaveClass('border-border', 'h-11');
  });

  it('renders a different element when asChild is used', () => {
    render(
      <Button asChild>
        <a href="/docs">Documentação</a>
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Documentação' });
    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveClass('inline-flex');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('merges a custom className and forwards disabled', () => {
    render(
      <Button className="w-full" disabled>
        Bloqueado
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Bloqueado' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('w-full');
  });
});
