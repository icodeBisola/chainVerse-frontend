'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProfileDetailSectionProps {
    name: string;
    bio: string;
}

export const ProfileDetailSection: React.FC<ProfileDetailSectionProps> = ({ name, bio }) => {
    const [loading, setLoading] = React.useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Profile updated successfully!');
        }, 1000);
    };

    return (
        <div className="bg-[#F2F2F2] p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#0D1330]">Profile Detail</h3>
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
                <Label htmlFor="name" className="text-gray-600">Full Name</Label>
                <Input
                    id="name"
                    defaultValue={name}
                    placeholder="Full Name"
                    className="bg-gray-50 border-none h-12 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-600">Bio</Label>
                <Input
                    id="bio"
                    defaultValue={bio}
                    placeholder="Short bio about yourself"
                    className="bg-gray-50 border-none h-12 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
            </div>
        </div>
    );
};
