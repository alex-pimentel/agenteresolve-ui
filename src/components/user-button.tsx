import * as React from 'react';
import { UserButton as ClerkUserButton } from '@clerk/clerk-react';
import { UserRound } from 'lucide-react';

import { useClerkAvailable } from '../lib/clerk';
import { Button } from './ui/button';

export interface UserButtonProps {
  /** Rendered instead of the fallback when Clerk is not configured. */
  fallback?: React.ReactNode;
  /** Label used by the built-in fallback. */
  signInLabel?: string;
}

/**
 * Thin wrapper around Clerk's `UserButton`. Renders a neutral, non-crashing
 * fallback when no Clerk publishable key is configured.
 */
export function UserButton({ fallback, signInLabel = 'Entrar' }: UserButtonProps) {
  const available = useClerkAvailable();

  if (!available) {
    if (fallback !== undefined) {
      return <>{fallback}</>;
    }

    return (
      <Button variant="outline" size="sm" type="button" aria-label={signInLabel}>
        <UserRound />
        <span>{signInLabel}</span>
      </Button>
    );
  }

  return <ClerkUserButton />;
}
