import * as React from 'react';

const ENV_KEY = 'VITE_CLERK_PUBLISHABLE_KEY';

/**
 * Resolves the Clerk publishable key from an explicit prop or, as a
 * best-effort fallback, from `import.meta.env`. Returns `undefined` when no
 * key is configured — the UI then degrades gracefully instead of crashing.
 */
export function resolveClerkPublishableKey(explicit?: string): string | undefined {
  if (explicit && explicit.trim()) {
    return explicit.trim();
  }

  try {
    const meta = import.meta as ImportMeta & {
      env?: Record<string, string | undefined>;
    };
    const fromEnv = meta.env?.[ENV_KEY];
    if (fromEnv && fromEnv.trim()) {
      return fromEnv.trim();
    }
  } catch {
    // `import.meta.env` is unavailable outside a bundler environment.
  }

  return undefined;
}

/** `true` when the tree is rendered inside a configured `<ClerkProvider>`. */
export const ClerkAvailableContext = React.createContext(false);

export function useClerkAvailable(): boolean {
  return React.useContext(ClerkAvailableContext);
}
