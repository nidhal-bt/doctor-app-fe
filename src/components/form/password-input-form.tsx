import React from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

import { PasswordInput } from "../password-input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type Props<T extends FieldValues> = UseControllerProps<T> & {
  // name: string;
  placeholder?: string;
  label: string;
  description?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
};

export function PasswordInputForm<T extends FieldValues>({
  control,
  placeholder,
  label,
  name,
  description,
  className,
  inputClassName,
  labelClassName,
  disabled,
}: Props<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={labelClassName}>{label}</FormLabel>
          <FormControl>
            <PasswordInput
              placeholder={placeholder}
              {...field}
              className={inputClassName}
              disabled={disabled}
            />
          </FormControl>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
