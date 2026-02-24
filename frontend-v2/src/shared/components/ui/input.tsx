import React from "react";
import clsx from "clsx";
import { FormError } from "./FormError";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export const Input: React.FC<Props> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <input
        className={clsx(
          "w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500",
          error ? "border-red-500" : "border-gray-300",
          className,
        )}
        {...props}
      />
      {error && <FormError message={error} />}
    </div>
  );
};
