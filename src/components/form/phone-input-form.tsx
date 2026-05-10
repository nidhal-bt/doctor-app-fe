import { FieldValues, UseControllerProps } from "react-hook-form";
import { PhoneInput } from "../phone-input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type Props<T extends FieldValues> = UseControllerProps<T> & {
  label: string;
  description?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
};

// TODO: fix input UI in arabic mode, the text is not aligned to the right
export function PhoneInputForm<T extends FieldValues>({
  control,
  name,
  label,
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
            <PhoneInput
              {...field}
              onChange={field.onChange}
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
