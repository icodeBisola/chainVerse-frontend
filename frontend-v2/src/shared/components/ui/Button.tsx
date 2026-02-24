import React from "react";
import clsx from "clsx";
type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}
const variantStyles: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-purple-600 text-white hover:bg-purple-700",
  outline: "border border-gray-300 hover:bg-gray-100",
  ghost: "hover:bg-gray-100",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
};
