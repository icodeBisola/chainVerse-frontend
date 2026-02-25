import React from 'react';
import { cn } from '@/lib';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  action,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8", className)}>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-gray-500">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex items-center gap-3">
          {action}
        </div>
      )}
    </div>
  );
};