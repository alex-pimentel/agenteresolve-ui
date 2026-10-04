import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Label } from './label';

describe('Label', () => {
  it('associates a label with a control via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email">E-mail</Label>
        <input id="email" />
      </>,
    );

    expect(screen.getByText('E-mail')).toHaveAttribute('for', 'email');
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
  });
});
