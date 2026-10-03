import * as React from 'react';
import { useClerk } from '@clerk/clerk-react';
import { LogIn } from 'lucide-react';

import { useClerkAvailable } from '../lib/clerk';
import { Button } from './ui/button';

export interface AuthButtonProps {
  children?: React.ReactNode;
  /** Rendered instead of the disabled fallback when Clerk is not configured. */
  fallback?: React.ReactNode;
  /** Clerk sign-in surface. */
  mode?: 'modal' | 'redirect';
}

function ClerkAuthButton({
  children,
  mode = 'modal',
}: {
  children: React.ReactNode;
  mode: 'modal' | 'redirect';
}) {
  const clerk = useClerk();

  return (
    <Button
      type="button"
      onClick={() => {
        if (mode === 'redirect') {
          void clerk.redirectToSignIn();
          return;
        }
        clerk.openSignIn();
      }}
    >
      <LogIn />
      {children}
    </Button>
  );
}

/**
 * Sign-in entry point. Uses Clerk when configured; otherwise renders a
 * disabled button (or a custom fallback) without crashing.
 */
export function AuthButton({
  children = 'Entrar',
  fallback,
  mode = 'modal',
}: AuthButtonProps) {
  const available = useClerkAvailable();

  if (!available) {
    if (fallback !== undefined) {
      return <>{fallback}</>;
    }

    return (
      <Button
        variant="default"
        type="button"
        disabled
        title="Configure VITE_CLERK_PUBLISHABLE_KEY para habilitar o login."
      >
        <LogIn />
        {children}
      </Button>
    );
  }

  return <ClerkAuthButton mode={mode}>{children}</ClerkAuthButton>;
}
