import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

describe('Avatar', () => {
  it('renders image and fallback slots', () => {
    render(
      <Avatar>
        <AvatarImage src="/avatar.png" alt="Fulano" />
        <AvatarFallback>FU</AvatarFallback>
      </Avatar>,
    );

    expect(screen.getByText('FU')).toHaveAttribute('data-slot', 'avatar-fallback');
  });

  it('falls back to the fallback when there is no image', () => {
    render(
      <Avatar>
        <AvatarFallback>AN</AvatarFallback>
      </Avatar>,
    );

    expect(screen.getByText('AN')).toBeInTheDocument();
  });
});
