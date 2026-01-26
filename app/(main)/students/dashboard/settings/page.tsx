// @ts-nocheck
'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GeneralSettings } from '@/components/dashboard/student/settings/general-settings';
import { SecuritySettings } from '@/components/dashboard/student/settings/security-settings';
import { Settings as SettingsIcon, Shield, User } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { StudentSidebar } from '@/components/student-sidebar';

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Account Settings</CardTitle>
            <CardDescription>
              Customize your profile and security preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1 rounded-lg">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="mt-0 space-y-6">
                <GeneralSettings />
              </TabsContent>

              <TabsContent value="security" className="mt-0 space-y-6">
                <SecuritySettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
