'use client';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

export function PasswordStrengthMeter({ password }: { password: string }) {
  const getPasswordStrength = useCallback((pwd: string) => {
    if (!pwd) return 0;

    let strength = 0;
    // Length check
    if (pwd.length >= 8) strength += 1;
    // Contains number
    if (/\d/.test(pwd)) strength += 1;
    // Contains special char
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;
    // Contains both lower and uppercase
    if (/(?=.*[a-z])(?=.*[A-Z])/.test(pwd)) strength += 1;

    return Math.min(Math.ceil((strength / 4) * 100), 100);
  }, []);

  const strength = getPasswordStrength(password);
  const strengthText =
    strength < 25
      ? 'Very Weak'
      : strength < 50
        ? 'Weak'
        : strength < 75
          ? 'Moderate'
          : 'Strong';

  const strengthColor =
    strength < 25
      ? 'bg-red-500'
      : strength < 50
        ? 'bg-orange-500'
        : strength < 75
          ? 'bg-yellow-500'
          : 'bg-green-500';

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn('h-full transition-all duration-300', strengthColor)}
          style={{ width: `${strength}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Password strength: {strengthText}
      </p>
    </div>
  );
}
