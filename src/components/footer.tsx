import * as React from 'react';

import { cn } from '../lib/cn';
import { defaultServiceNav } from './header';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const defaultFooterColumns: FooterColumn[] = [
  {
    title: 'Serviços',
    links: defaultServiceNav.map(({ label, href, external }) => ({
      label,
      href,
      external,
    })),
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre', href: 'https://agenteresolve.com.br/sobre', external: true },
      { label: 'Blog', href: 'https://agenteresolve.com.br/blog', external: true },
      { label: 'Contato', href: 'https://agenteresolve.com.br/contato', external: true },
    ],
  },
];

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  description?: string;
  columns?: FooterColumn[];
  legal?: React.ReactNode;
}

function DefaultBrand() {
  return (
    <a href="https://agenteresolve.com.br" className="flex items-center gap-2">
      <span aria-hidden className="size-7 rounded-lg bg-brand-gradient" />
      <span className="text-sm font-semibold tracking-tight text-foreground">
        Agenteresolve
      </span>
    </a>
  );
}

export function Footer({
  logo,
  description = 'Ferramentas de IA para imagens, impressão e produtividade.',
  columns = defaultFooterColumns,
  legal,
  className,
  ...props
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      data-slot="footer"
      className={cn('w-full border-t border-border bg-background/60', className)}
      {...props}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3 sm:col-span-2">
          {logo ?? <DefaultBrand />}
          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-foreground">{column.title}</h2>
            <ul className="flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.href}-${link.label}`}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-6">
          <p className="text-xs text-muted-foreground">
            {legal ?? `© ${year} Agenteresolve. Todos os direitos reservados.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
