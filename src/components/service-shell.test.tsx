import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ServiceShell } from './service-shell';

describe('ServiceShell', () => {
  it('renders the header, main content and footer', () => {
    render(
      <ServiceShell>
        <p>Conteúdo do serviço</p>
      </ServiceShell>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('data-slot', 'service-main');
    expect(within(main).getByText('Conteúdo do serviço')).toBeInTheDocument();
  });

  it('renders a title and description when provided', () => {
    render(
      <ServiceShell title="Remover fundo" description="Remova o fundo em segundos.">
        <p>corpo</p>
      </ServiceShell>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Remover fundo' })).toBeInTheDocument();
    expect(screen.getByText('Remova o fundo em segundos.')).toBeInTheDocument();
  });

  it('renders the service navigation and the default logo', () => {
    render(
      <ServiceShell
        services={[
          { label: 'QR Code', href: 'https://qrcode.agenteresolve.com.br' },
          { label: 'Imposição', href: 'https://imposition.agenteresolve.com.br' },
        ]}
      >
        <p>corpo</p>
      </ServiceShell>,
    );

    const banner = screen.getByRole('banner');
    const nav = within(banner).getByRole('navigation', { name: 'Serviços' });
    expect(within(nav).getByRole('link', { name: 'QR Code' })).toHaveAttribute(
      'href',
      'https://qrcode.agenteresolve.com.br',
    );
    expect(within(nav).getByRole('link', { name: 'Imposição' })).toBeInTheDocument();
    expect(within(banner).getByText('Agenteresolve')).toBeInTheDocument();
  });

  it('degrades gracefully without a Clerk publishable key', () => {
    render(
      <ServiceShell>
        <p>corpo</p>
      </ServiceShell>,
    );

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });
});
