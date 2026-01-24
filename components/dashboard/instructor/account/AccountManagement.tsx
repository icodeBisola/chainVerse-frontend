'use client';

import React from 'react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileDetailSection } from './ProfileDetailSection';
import { ContactDetailSection } from './ContactDetailSection';
import { PasswordSection } from './PasswordSection';
import { instructor } from '@/lib/mock-data/instructorsData';

export const AccountManagement: React.FC = () => {
    // In a real app, you'd fetch this from an API or global state
    const mockUser = {
        name: instructor.name || 'B.L Theraja',
        img: instructor.img || '',
        email: 'bltheraja@gmail.com',
        phone: '+234 9088 887 267',
        bio: instructor.name || 'B.L Theraja'
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">
            <h1 className="text-3xl font-bold text-[#0D1330] mb-8">Profile</h1>

            <ProfileHeader
                initialImage={mockUser.img}
                name={mockUser.name}
            />

            <div className="grid gap-6">
                <ProfileDetailSection
                    name={mockUser.name}
                    bio={mockUser.bio}
                />

                <ContactDetailSection
                    email={mockUser.email}
                    phoneNumber={mockUser.phone}
                />

                <PasswordSection />

                <div className="bg-[#F2F2F2] p-8 rounded-xl border border-dashed border-gray-200 shadow-sm min-h-[100px] flex items-center">
                    <h3 className="text-lg font-semibold text-[#0D1330]">Payment Method</h3>
                </div>
            </div>
        </div>
    );
};
