import * as React from 'react';
import { useAuth } from '@clerk/clerk-react';

import { useClerkAvailable } from '../lib/clerk';

/** Resolves the current Clerk session token (`null` when signed out). */
export type TokenGetter = () => Promise<string | null>;

export interface ClerkTokenBridgeProps {
  /**
   * Receives the token getter when Clerk is configured, `null` when it is
   * not (or on unmount). Wire it to your API layer, e.g.
   * `<ClerkTokenBridge onGetToken={setAuthTokenGetter} />`.
   */
  onGetToken: (getter: TokenGetter | null) => void;
}

function ClerkTokenBridgeInner({ onGetToken }: ClerkTokenBridgeProps) {
  const { getToken } = useAuth();

  React.useEffect(() => {
    const getter: TokenGetter = () => getToken();
    onGetToken(getter);
    return () => onGetToken(null);
  }, [getToken, onGetToken]);

  return null;
}

/**
 * Bridges the Clerk session token to a plain (non-React) API layer. Renders
 * nothing. Safe to mount unconditionally: without a configured
 * `<ClerkProvider>` it reports `null` instead of throwing.
 */
export function ClerkTokenBridge({ onGetToken }: ClerkTokenBridgeProps) {
  const available = useClerkAvailable();

  if (!available) {
    return null;
  }

  return <ClerkTokenBridgeInner onGetToken={onGetToken} />;
}
