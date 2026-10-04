import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

import { cn } from '../../lib/cn';

export type SheetSide = 'top' | 'bottom' | 'left' | 'right';

interface SheetContextValue {
  open: boolean;
}

const SheetContext = React.createContext<SheetContextValue>({ open: false });

export interface SheetProps extends Omit<
  React.ComponentProps<typeof SheetPrimitive.Root>,
  'children'
> {
  children?: React.ReactNode;
}

export function Sheet({ open, defaultOpen, onOpenChange, children, ...props }: SheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <SheetContext.Provider value={{ open: actualOpen }}>
      <SheetPrimitive.Root open={actualOpen} onOpenChange={handleOpenChange} {...props}>
        {children}
      </SheetPrimitive.Root>
    </SheetContext.Provider>
  );
}

export function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

export function SheetPortal(props: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

export function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn('fixed inset-0 z-50 bg-black/70 backdrop-blur-sm', className)}
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-base font-semibold text-foreground', className)}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

const SIDE_CLASSES: Record<SheetSide, string> = {
  top: 'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 border-t',
  left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r',
  right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l',
};

const SIDE_MOTION = {
  top: { initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '-100%' } },
  bottom: { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } },
  left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
  right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
} satisfies Record<SheetSide, { initial: object; animate: object; exit: object }>;

export interface SheetContentProps extends React.ComponentProps<typeof SheetPrimitive.Content> {
  side?: SheetSide;
}

export function SheetContent({ side = 'right', className, children, ...props }: SheetContentProps) {
  const { open } = React.useContext(SheetContext);

  return (
    <SheetPrimitive.Portal forceMount>
      <AnimatePresence>
        {open ? (
          <React.Fragment key="sheet">
            <SheetPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              />
            </SheetPrimitive.Overlay>
            <SheetPrimitive.Content asChild forceMount {...props}>
              <motion.div
                initial={SIDE_MOTION[side].initial}
                animate={SIDE_MOTION[side].animate}
                exit={SIDE_MOTION[side].exit}
                transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
                className={cn(
                  'fixed z-50 flex flex-col gap-4 border-border bg-popover p-6 text-popover-foreground shadow-xl',
                  SIDE_CLASSES[side],
                  className,
                )}
              >
                {children}
                <SheetPrimitive.Close className="absolute right-4 top-4 rounded-md text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <X className="size-4" />
                  <span className="sr-only">Fechar</span>
                </SheetPrimitive.Close>
              </motion.div>
            </SheetPrimitive.Content>
          </React.Fragment>
        ) : null}
      </AnimatePresence>
    </SheetPrimitive.Portal>
  );
}
