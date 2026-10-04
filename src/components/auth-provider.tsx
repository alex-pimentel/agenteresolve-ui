import * as React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

import { ClerkAvailableContext, resolveClerkPublishableKey } from '../lib/clerk';

export interface AuthProviderProps {
  /** Clerk publishable key. Falls back to `VITE_CLERK_PUBLISHABLE_KEY`. */
  publishableKey?: string;
  children: React.ReactNode;
}

/**
 * Wraps the app in `<ClerkProvider>` when a publishable key is available.
 * Without a key it renders children untouched and marks Clerk as unavailable,
 * so `<UserButton>` / `<AuthButton>` fall back instead of throwing.
 */
export function AuthProvider({ publishableKey, children }: AuthProviderProps) {
  const key = resolveClerkPublishableKey(publishableKey);

  if (!key) {
    return (
      <ClerkAvailableContext.Provider value={false}>{children}</ClerkAvailableContext.Provider>
    );
  }

  return (
    <ClerkAvailableContext.Provider value={true}>
      <ClerkProvider publishableKey={key}>{children}</ClerkProvider>
    </ClerkAvailableContext.Provider>
  );
}
