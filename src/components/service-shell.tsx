import * as React from 'react';

import { cn } from '../lib/cn';
import { AuthProvider } from './auth-provider';
import { Footer, type FooterProps } from './footer';
import { Header, type HeaderProps, type ServiceNavItem } from './header';

export interface ServiceShellProps {
  children: React.ReactNode;
  /** Clerk publishable key. Falls back to `VITE_CLERK_PUBLISHABLE_KEY`. */
  publishableKey?: string;
  logo?: React.ReactNode;
  services?: ServiceNavItem[];
  localeSwitcher?: React.ReactNode;
  authSlot?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  headerProps?: Omit<HeaderProps, 'logo' | 'services' | 'localeSwitcher' | 'authSlot'>;
  footerProps?: Omit<FooterProps, 'logo'>;
}

/**
 * Standard service page layout: Header + main + Footer, wrapped in the auth
 * provider so Clerk degrades gracefully when unconfigured.
 */
export function ServiceShell({
  children,
  publishableKey,
  logo,
  services,
  localeSwitcher,
  authSlot,
  title,
  description,
  className,
  contentClassName,
  headerProps,
  footerProps,
}: ServiceShellProps) {
  const hasHeading = Boolean(title || description);

  return (
    <AuthProvider publishableKey={publishableKey}>
      <div
        data-slot="service-shell"
        className={cn('flex min-h-screen flex-col bg-background text-foreground', className)}
      >
        <Header
          logo={logo}
          services={services}
          localeSwitcher={localeSwitcher}
          authSlot={authSlot}
          {...headerProps}
        />

        <main data-slot="service-main" className={cn('flex-1', contentClassName)}>
          <div className="mx-auto w-full max-w-6xl px-4 py-10">
            {hasHeading ? (
              <div className="mb-8 flex flex-col gap-2">
                {title ? (
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {title}
                  </h1>
                ) : null}
                {description ? (
                  <p className="max-w-2xl text-base text-muted-foreground">{description}</p>
                ) : null}
              </div>
            ) : null}
            {children}
          </div>
        </main>

        <Footer logo={logo} {...footerProps} />
      </div>
    </AuthProvider>
  );
}
