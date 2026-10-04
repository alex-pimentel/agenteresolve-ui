import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Separator } from './separator';

describe('Separator', () => {
  it('renders a horizontal separator by default', () => {
    render(<Separator data-testid="sep" />);

    expect(screen.getByTestId('sep')).toHaveClass('h-px', 'w-full');
  });

  it('renders a vertical separator when requested', () => {
    render(<Separator data-testid="sep" orientation="vertical" />);

    expect(screen.getByTestId('sep')).toHaveClass('h-full', 'w-px');
  });
});
