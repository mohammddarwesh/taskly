'use client';

import { cn } from '@/libs/utils';
import { forwardRef, TextareaHTMLAttributes, ReactNode } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  labelClassName?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, id, className, labelClassName, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-sm font-medium text-text-primary',
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          <textarea
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              'input min-h-37 resize-y', 
              error && 'input-error',
              className
            )}
            {...props}
          />
          {icon && <div className="absolute right-3 top-3">{icon}</div>}
        </div>
        {error && (
          <p id={`${id}-error`} className="text-sm text-text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;