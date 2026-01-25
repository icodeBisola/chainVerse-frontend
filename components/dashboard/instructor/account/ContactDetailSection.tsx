'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ContactDetailSectionProps {
    email: string;
    phoneNumber: string;
}

export const ContactDetailSection: React.FC<ContactDetailSectionProps> = ({ email, phoneNumber }) => {
    const [loading, setLoading] = React.useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Contact information updated successfully!');
        }, 1000);
    };

    return (
        <div className="bg-[#F2F2F2] p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#0D1330]">Contact Details</h3>
                <Button
                    variant="default"
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-[#4361EE] hover:bg-[#4361EE]/90"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-600">Email Address</Label>
                <Input
                    id="email"
                    type="email"
                    defaultValue={email}
                    placeholder="email@example.com"
                    className="bg-gray-50 border-none h-12 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-600">Phone Number</Label>
                <Input
                    id="phone"
                    defaultValue={phoneNumber}
                    placeholder="+234 ..."
                    className="bg-gray-50 border-none h-12 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
            </div>
        </div>
    );
};
