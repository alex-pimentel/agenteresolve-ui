import * as React from 'react';
import { Menu } from 'lucide-react';

import { cn } from '../lib/cn';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';
import { UserButton } from './user-button';

export interface ServiceNavItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

export const defaultServiceNav: ServiceNavItem[] = [
  {
    label: 'Remover fundo',
    href: 'https://bg-removal.agenteresolve.com.br',
    external: true,
  },
  {
    label: 'Melhorar imagem',
    href: 'https://imageup.agenteresolve.com.br',
    external: true,
  },
  {
    label: 'QR Code',
    href: 'https://qrcode.agenteresolve.com.br',
    external: true,
  },
  {
    label: 'Imposição',
    href: 'https://imposition.agenteresolve.com.br',
    external: true,
  },
];

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  services?: ServiceNavItem[];
  localeSwitcher?: React.ReactNode;
  authSlot?: React.ReactNode;
  sticky?: boolean;
}

function DefaultLogo() {
  return (
    <a href="https://agenteresolve.com.br" className="flex items-center gap-2">
      <span aria-hidden className="size-7 rounded-lg bg-brand-gradient" />
      <span className="text-sm font-semibold tracking-tight text-foreground">Agenteresolve</span>
    </a>
  );
}

function ServiceLink({ item, className }: { item: ServiceNavItem; className?: string }) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noreferrer' : undefined}
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground',
        className,
      )}
    >
      {Icon ? <Icon className="size-4" /> : null}
      {item.label}
    </a>
  );
}

export function Header({
  logo,
  services = defaultServiceNav,
  localeSwitcher,
  authSlot,
  sticky = true,
  className,
  ...props
}: HeaderProps) {
  return (
    <header
      data-slot="header"
      className={cn(
        'z-40 w-full border-b border-border bg-background/70 backdrop-blur-lg',
        sticky && 'sticky top-0',
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>Menu</SheetTitle>
            <nav aria-label="Serviços" className="flex flex-col gap-1">
              {services.map((item) => (
                <ServiceLink key={item.href} item={item} />
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {logo ?? <DefaultLogo />}

        <nav aria-label="Serviços" className="hidden flex-1 items-center gap-1 md:flex">
          {services.map((item) => (
            <ServiceLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {localeSwitcher}
          {authSlot ?? <UserButton />}
        </div>
      </div>
    </header>
  );
}
