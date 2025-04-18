
import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isPhoneInput?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isPhoneInput, ...props }, ref) => {
    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isPhoneInput) return;
      
      let value = e.target.value.replace(/\D/g, '');
      
      // If the input is empty or just the prefix, set to +44
      if (!value || value === '44') {
        e.target.value = '+44 ';
        return;
      }
      
      // If user deletes the +44 prefix, restore it
      if (!value.startsWith('44')) {
        value = '44' + value;
      }
      
      // Format as +44 XXXX XXXXXX
      if (value.length > 2) {
        // Remove the 44 prefix for formatting
        const nationalNumber = value.substring(2);
        
        if (nationalNumber.length <= 4) {
          e.target.value = `+44 ${nationalNumber}`;
        } else {
          const firstPart = nationalNumber.substring(0, 4);
          const secondPart = nationalNumber.substring(4, 10);
          e.target.value = `+44 ${firstPart}${secondPart ? ' ' + secondPart : ''}`;
        }
      } else {
        e.target.value = `+44 `;
      }
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        onChange={isPhoneInput ? handlePhoneInput : undefined}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
