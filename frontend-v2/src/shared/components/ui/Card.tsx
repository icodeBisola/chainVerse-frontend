import React from "react";
import clsx from "clsx";
interface Props {
  children: React.ReactNode;
  className?: string;
}
export const Card: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};
