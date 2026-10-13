import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';

type DrawerSide = 'bottom' | 'right';

interface DrawerContentProps extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: DrawerSide;
}

const Drawer = Sheet;
const DrawerTrigger = SheetPrimitive.Trigger;
const DrawerClose = SheetPrimitive.Close;

const DrawerContent = React.forwardRef<ElementRef<typeof SheetPrimitive.Content>, DrawerContentProps>(
  ({ side = 'bottom', className, ...props }, ref) => (
    <SheetContent
      ref={ref}
      side={side === 'bottom' ? 'bottom' : 'right'}
      className={cn(
        side === 'bottom' && 'max-h-[85vh] rounded-t-card-lg',
        className
      )}
      {...props}
    />
  )
);
DrawerContent.displayName = 'DrawerContent';

const DrawerTitle = SheetTitle;
const DrawerDescription = SheetDescription;
const DrawerHeader = SheetHeader;
const DrawerFooter = SheetFooter;

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
  DrawerFooter,
};
