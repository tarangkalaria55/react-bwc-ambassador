import React, { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface UKPhoneInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const UKPhoneInput: React.FC<UKPhoneInputProps> = ({
  label,
  error,
  className,
  value,
  onChange,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");

    // Format as 07XXX XXXXXX
    if (cleaned.length >= 6) {
      return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`.trim();
    }
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Only allow digits and spaces
    if (!/^[0-9 ]*$/.test(newValue)) {
      return;
    }

    // Remove spaces for validation
    const digitsOnly = newValue.replace(/\s/g, "");

    // Ensure it starts with 07
    if (digitsOnly.length >= 2 && !digitsOnly.startsWith("07")) {
      return;
    }

    // Limit to 11 digits
    if (digitsOnly.length > 11) {
      return;
    }

    // Format the number
    const formatted = formatPhoneNumber(digitsOnly);

    // Create a new event with the formatted value
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: formatted,
        name: e.target.name,
      },
    };

    if (onChange) {
      onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const isValid = (value: string) => {
    const digitsOnly = value.replace(/\s/g, "");
    return /^07\d{9}$/.test(digitsOnly);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Input
          {...props}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "pl-10",
            error && "border-red-500",
            focused && "border-primary",
            props.className
          )}
          placeholder="07700 900123"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {!value && "+44"}
        </span>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {value && !isValid(value as string) && !error && (
        <p className="text-sm text-muted-foreground">
          Enter a valid UK mobile number (e.g., 07700 900123)
        </p>
      )}
    </div>
  );
};

export default UKPhoneInput;
