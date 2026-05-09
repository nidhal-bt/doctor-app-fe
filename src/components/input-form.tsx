import React from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";




type Props<T extends FieldValues> = UseControllerProps<T> & {
  placeholder?: string;
  label: string;
  description?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
};

export function InputForm<T extends FieldValues>({
  control,
  placeholder,
  label,
  name,
  description,
  type,
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
            <Input
              type={type}
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
