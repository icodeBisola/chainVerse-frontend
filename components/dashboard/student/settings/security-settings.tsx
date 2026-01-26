// Temporarily disabling the ts-check until dependencies are installed
// @ts-nocheck
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState, useCallback } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { PasswordStrengthMeter } from '@/components/shared/passwordStrenthMeter';

const securityFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    newPassword: z.string().min(8, {
      message: 'New password must be at least 8 characters.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Please confirm your new password.',
    }),
  })
  .refine((data: any) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SecurityFormValues = z.infer<typeof securityFormSchema>;

// Password strength meter component

export function SecuritySettings() {
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { isDirty, isValid, watch } = form;
  const newPassword = watch('newPassword');

  async function onSubmit(data: SecurityFormValues) {
    if (data.currentPassword === data.newPassword) {
      form.setError('newPassword', {
        type: 'manual',
        message: 'New password must be different from current password',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Password updated',
        description: 'Your password has been updated successfully.',
      });

      // Reset form after successful submission
      form.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          'There was an error updating your password. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">
          Change Password
        </h3>
        <p className="text-sm text-muted-foreground">
          Update your password associated with your account.
        </p>
      </div>

      {form.formState.errors.root?.serverError && (
        <div className="bg-destructive/15 p-4 rounded-md text-sm text-destructive border border-destructive/30 mb-6">
          {form.formState.errors.root.serverError.message}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="Enter your current password"
                        {...field}
                        className="pr-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter your new password"
                        {...field}
                        className="pr-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <PasswordStrengthMeter password={newPassword} />
                  <FormDescription>
                    Password must be at least 8 characters long and include
                    uppercase, lowercase, numbers, and special characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your new password"
                        {...field}
                        className="pr-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isValid || isSubmitting}
              className="min-w-[160px] transition-all duration-200 hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className="pt-8 border-t border-border/50">
        <div className="space-y-2 mb-4">
          <h3 className="text-lg font-semibold tracking-tight">
            Two-Factor Authentication
          </h3>
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your account.
          </p>
        </div>
        <Button variant="outline" className="transition-colors hover:bg-accent">
          Enable Two-Factor Authentication
        </Button>
      </div>
    </div>
  );
}
