'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

interface ProfileHeaderProps {
    initialImage: string;
    name: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ initialImage, name }) => {
    const [image, setImage] = useState(initialImage);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-[#F2F2F2] p-6 rounded-xl border border-gray-100 flex items-center gap-6 shadow-sm">
            <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center relative">
                    <Image
                        src={image || '/placeholder-avatar.png'}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white w-8 h-8" />
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-[#0D1330]">{name}</h2>
                <p className="text-gray-400 text-sm">Click image to change icon</p>
            </div>
        </div>
    );
};
