import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Sheet, SheetContent, SheetTrigger } from './sheet';

describe('Sheet', () => {
  it('does not render content when closed', () => {
    render(
      <Sheet>
        <SheetTrigger>Abrir</SheetTrigger>
        <SheetContent>Painel</SheetContent>
      </Sheet>,
    );

    expect(screen.getByRole('button', { name: 'Abrir' })).toBeInTheDocument();
    expect(screen.queryByText('Painel')).not.toBeInTheDocument();
  });

  it('renders content when open', () => {
    render(
      <Sheet open>
        <SheetContent>Painel</SheetContent>
      </Sheet>,
    );

    expect(screen.getByText('Painel')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument();
  });
});
