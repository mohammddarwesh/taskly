import { FieldValues, UseFormReturn } from "react-hook-form";

export function getDirtyValues<T extends FieldValues>(
  form: UseFormReturn<T>,
): Partial<T> {
  const { dirtyFields } = form.formState;
  const values = form.getValues();

  return Object.keys(dirtyFields).reduce((acc, key) => {
    acc[key as keyof T] = values[key as keyof T];
    return acc;
  }, {} as Partial<T>);
}
