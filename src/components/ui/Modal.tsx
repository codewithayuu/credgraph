"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const modalSizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children, size = "md" }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-250" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className={cn("w-full transform overflow-hidden rounded-2xl panel-elevated p-6 transition-all", modalSizes[size])}>
                {(title || description) && (
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      {title && <Dialog.Title className="text-h2 text-white">{title}</Dialog.Title>}
                      {description && <Dialog.Description className="text-b2 text-surface-400 mt-1.5">{description}</Dialog.Description>}
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-800 text-surface-500 hover:text-surface-200 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
