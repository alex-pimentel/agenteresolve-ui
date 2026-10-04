import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

describe('Card', () => {
  it('renders all card sections', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
          <CardDescription>Descrição</CardDescription>
        </CardHeader>
        <CardContent>Conteúdo</CardContent>
        <CardFooter>Ações</CardFooter>
      </Card>,
    );

    expect(screen.getByText('Título')).toHaveAttribute('data-slot', 'card-title');
    expect(screen.getByText('Descrição')).toHaveAttribute('data-slot', 'card-description');
    expect(screen.getByText('Conteúdo')).toHaveAttribute('data-slot', 'card-content');
    expect(screen.getByText('Ações')).toHaveAttribute('data-slot', 'card-footer');
  });

  it('merges a custom className', () => {
    render(<Card className="max-w-md">conteúdo</Card>);

    const card = screen.getByText('conteúdo');
    expect(card).toHaveClass('max-w-md', 'rounded-2xl');
  });
});
