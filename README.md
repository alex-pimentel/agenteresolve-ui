# @agenteresolve/ui

[![CI](https://github.com/alex-pimentel/agenteresolve-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/alex-pimentel/agenteresolve-ui/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/alex-pimentel/agenteresolve-ui)](https://github.com/alex-pimentel/agenteresolve-ui/releases/latest)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Design system + **Service Shell** compartilhado da Agenteresolve. Usado pelo site
Laravel/Inertia e pelos serviços React (`bg-removal`, `image-up`, `qrcode`,
`imposition`) para que todos pareçam um produto único e compartilhem o login Clerk.

- **React 19** + **TypeScript**
- **Tailwind v4** (token layer em CSS variables + `@theme`, dark por padrão)
- Componentes no estilo **shadcn/ui** sobre **Radix** + `lucide-react` + `motion`
- Wrapper fino de **Clerk** que degrada com elegância sem publishable key
- Empacotamento: pacote único **ESM-only** com declarações TypeScript

---

## Publicação (GitHub Packages)

O pacote é versionado por **tag/release** e tem workflow de publicação em
`.github/workflows/publish.yml` (tag `v*` / manual). Porém a publicação no
GitHub Packages está **bloqueada por escopo**: o GitHub exige que o escopo npm
seja igual ao dono do repositório, e este pacote é `@agenteresolve/ui` enquanto
o repositório pertence a `alex-pimentel` (não existe org `agenteresolve`). O
workflow detecta isso e **não publica** até o escopo ser alinhado. Consumidores
devem usar a **git dependency** abaixo.

## Instalação

O pacote não é publicado no npm registry. Consuma por **git dependency** ou por
**workspace** do npm.

### Git dependency (recomendado para os serviços)

```jsonc
// package.json do consumidor
{
  "dependencies": {
    "@agenteresolve/ui": "github:alex-pimentel/agenteresolve-ui",
  },
}
```

O npm clona o repositório e roda o script `prepare` (`npm run build`), gerando
`dist/`. Para fixar uma revisão, use uma tag/commit:

```jsonc
"@agenteresolve/ui": "github:alex-pimentel/agenteresolve-ui#v0.1.0"
```

### npm workspaces (monorepo)

```jsonc
// package.json raiz do workspace
{
  "workspaces": ["ui", "apps/*"],
}
```

E no app consumidor:

```jsonc
"dependencies": { "@agenteresolve/ui": "*" }
```

### Peer dependencies

O consumidor deve ter `react` e `react-dom` **19.x**. As demais dependências
(Radix, Clerk, lucide, motion, etc.) vêm com o pacote.

---

## Uso

### 1. Tailwind v4 + tokens

No CSS global do consumidor, importe o Tailwind e depois os tokens do pacote:

```css
@import 'tailwindcss';
@import '@agenteresolve/ui/styles.css';
```

`styles.css` contém as CSS variables, o `@theme` do Tailwind v4 e o
`@source` que faz o build do consumidor escanear os componentes compilados.
O tema é **dark por padrão** — não é necessário adicionar a classe `.dark`.

Se o consumidor usa Vite, garanta que o Tailwind está ativo
(`@tailwindcss/vite` ou PostCSS).

### 2. Service Shell

```tsx
import { ServiceShell } from '@agenteresolve/ui';
import '@agenteresolve/ui/styles.css';

export function App() {
  return (
    <ServiceShell
      title="Remover fundo"
      description="Remova o fundo de imagens em segundos."
      // Passe explicitamente a chave; o fallback de env é best-effort.
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
    >
      <MinhaFerramenta />
    </ServiceShell>
  );
}
```

### 3. Clerk (login opcional, sem crash)

Envolva a árvore com `AuthProvider` (o `ServiceShell` já faz isso por você) e
use `UserButton` / `AuthButton`. Sem publishable key, eles renderizam um
fallback neutro em vez de lançar erro — útil em `qrcode`/`imposition`, onde o
login é opcional.

```tsx
import { AuthButton, UserButton } from '@agenteresolve/ui';

<UserButton signInLabel="Entrar" />
<AuthButton mode="modal">Entrar</AuthButton>

// Fallback customizado:
<UserButton fallback={<a href="/login">Entrar</a>} />
```

A chave pode ser passada por prop (`publishableKey`) ou, em builds Vite, via
`VITE_CLERK_PUBLISHABLE_KEY`.

### 4. Componentes

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  Skeleton,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Header,
  Footer,
  cn,
} from '@agenteresolve/ui';
```

Header e Footer também aceitam slots:

```tsx
<Header
  logo={<MeuLogo />}
  services={[{ label: 'QR Code', href: 'https://qrcode.agenteresolve.com.br' }]}
  localeSwitcher={<LocaleSwitch />}
  authSlot={<UserButton />}
/>
```

---

## Tokens

Definidos em `src/styles/globals.css` (`:root`) e expostos ao Tailwind via
`@theme inline`. Use como utilities (`bg-background`, `text-brand`,
`border-border`, `bg-brand-gradient`, ...) ou diretamente como CSS variables.

| Variável                                     | Papel                                | Valor                          |
| -------------------------------------------- | ------------------------------------ | ------------------------------ |
| `--background`                               | fundo base (grafite quase preto)     | `oklch(0.16 0.006 265)`        |
| `--foreground`                               | texto principal                      | `oklch(0.97 0.003 265)`        |
| `--surface`                                  | superfície glass (`white/5`)         | `oklch(1 0 0 / 5%)`            |
| `--surface-strong`                           | superfície elevada (`white/8`)       | `oklch(1 0 0 / 8%)`            |
| `--card` / `--card-foreground`               | card                                 | `surface` / `foreground`       |
| `--popover` / `--popover-foreground`         | popover, sheet                       | grafite elevado / `foreground` |
| `--muted` / `--muted-foreground`             | estados discretos                    | `white/6` / cinza              |
| `--border`                                   | bordas glass (`white/10`)            | `oklch(1 0 0 / 10%)`           |
| `--input`                                    | borda de campos                      | `oklch(1 0 0 / 12%)`           |
| `--ring`                                     | anel de foco                         | azul da marca                  |
| `--brand` / `--brand-foreground`             | azul de marca                        | `oklch(0.62 0.19 256)`         |
| `--brand-violet`                             | gradiente (início)                   | `oklch(0.62 0.23 295)`         |
| `--brand-blue`                               | gradiente (meio)                     | `oklch(0.62 0.19 256)`         |
| `--brand-cyan`                               | gradiente (fim)                      | `oklch(0.78 0.14 200)`         |
| `--brand-gradient`                           | gradiente violeta→azul→ciano         | `linear-gradient(...)`         |
| `--destructive` / `--destructive-foreground` | erros                                | vermelho                       |
| `--success`                                  | sucesso                              | verde                          |
| `--radius`                                   | raio base (sm/md/lg/xl derivam dele) | `0.75rem`                      |

Tipografia: **Inter Variable** (`@fontsource-variable/inter`), aplicada via
`--font-sans`.

Variantes de componente reutilizáveis: `buttonVariants`, `badgeVariants`.

---

## Scripts

| Comando                 | Descrição                                                                       |
| ----------------------- | ------------------------------------------------------------------------------- |
| `npm run build`         | limpa, builda ESM + declarações e copia `styles.css`                            |
| `npm run lint`          | ESLint (flat config)                                                            |
| `npm run format`        | Prettier (write)                                                                |
| `npm run format:check`  | Prettier (check, usado no CI)                                                   |
| `npm run types`         | `tsc --noEmit`                                                                  |
| `npm test`              | Vitest + Testing Library                                                        |
| `npm run test:watch`    | Vitest em watch                                                                 |
| `npm run test:coverage` | Vitest com cobertura V8 (limiar mínimo: 60% linhas/branches/funções/statements) |
| `npm run check:css`     | compila o token layer com o Tailwind CLI (smoke test)                           |

### CI / qualidade

O repositório segue o [padrão de qualidade Agenteresolve](../ci/docs/quality-standard.md).
No CI (`.github/workflows/ci.yml`) rodam lint, format check, types, testes,
cobertura, build e `npm audit --audit-level=high` (workflow reutilizável
`alex-pimentel/agenteresolve-ci`), além de gitleaks/Trivy/Semgrep e CodeQL.

Para rodar os gates localmente igual ao CI:

```bash
npm ci
npm run lint && npm run format:check && npm run types && npm test && npm run test:coverage && npm run build
npm audit --audit-level=high
```

Um `overrides` fixa `@parcel/watcher` em `^2.5.4` para eliminar uma
vulnerabilidade transitiva de `braces` trazida por `@tailwindcss/cli` (dependência
de build) sem downgrade do CLI.

### Estrutura

```
src/
  index.ts                 # exports públicos
  styles/globals.css       # tokens + @theme + @source
  lib/{cn,clerk}.ts
  components/
    ui/                    # Button, Badge, Card, Input, ... (shadcn style)
    header.tsx footer.tsx
    auth-provider.tsx auth-button.tsx user-button.tsx
    service-shell.tsx
```

## Notas

- **ESM-only.** Os consumidores são apps Vite/Inertia; não há build CJS.
- `@clerk/clerk-react` está marcado como _deprecated_ upstream (migração para
  `@clerk/react`), mas é o pacote exigido pelo contrato atual do design system
  (spec C §12.1). A troca pode ser feita de forma isolada em `auth-*`.
- Nunca versione segredos. Apenas a _publishable key_ do Clerk vai ao frontend;
  `CLERK_SECRET_KEY` fica no backend.
