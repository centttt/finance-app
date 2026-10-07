import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Modal({ open, onOpenChange, title, description, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#0A0F1C]/80 backdrop-blur-sm transition-opacity" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border border-borderSubtle bg-elevated p-6 shadow-lg rounded-xl duration-200">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight text-textPrimary">
              {title}
            </Dialog.Title>
            {description && (
              <Dialog.Description className="text-sm text-textSecondary mt-1">
                {description}
              </Dialog.Description>
            )}
          </div>
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-base transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent disabled:pointer-events-none"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-textSecondary hover:text-textPrimary transition-colors" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
