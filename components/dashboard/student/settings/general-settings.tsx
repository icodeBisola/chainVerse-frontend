// Temporarily disabling the ts-check until dependencies are installed
// @ts-nocheck
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from 'react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Username can only contain letters, numbers, underscores, and hyphens.",
    }),
  email: z
    .string({
      required_error: "Please enter your email address.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  bio: z
    .string()
    .max(160, {
      message: "Bio must not exceed 160 characters.",
    })
    .min(4, {
      message: "Bio must be at least 4 characters.",
    }),
  timezone: z.string({
    required_error: "Please select a timezone.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This could come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
};

export function GeneralSettings() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    mode: "onChange",
  });
  
  const { isDirty, isValid } = form.formState;

  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">Profile Information</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the platform.
        </p>
      </div>
      
      {form.formState.errors.root?.serverError && (
        <div className="bg-destructive/15 p-4 rounded-md text-sm text-destructive border border-destructive/30">
          {form.formState.errors.root.serverError.message}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your username" 
                      {...field} 
                      className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. It can be your real name or a pseudonym.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your.email@example.com" 
                      {...field} 
                      className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the email associated with your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Tell us a little bit about yourself..."
                    {...field}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </FormControl>
                <FormDescription>
                  Brief description for your profile. Max 160 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={!isDirty || !isValid || isSubmitting}
              className="min-w-[140px] transition-all duration-200 hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : 'Update Profile'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}