'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PasswordSection: React.FC = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSave = () => {
        setError('');

        if (!newPassword || !confirmPassword) {
            setError('Please fill in both new password fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Password updated successfully!');
            setNewPassword('');
            setConfirmPassword('');
        }, 1000);
    };

    return (
        <div className="bg-[#F2F2F2] p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#0D1330]">Update Password</h3>
                <Button
                    variant="default"
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-[#4361EE] hover:bg-[#4361EE]/90"
                >
                    {loading ? 'Changing...' : 'Change Password'}
                </Button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="space-y-2">
                <Label htmlFor="oldPassword" className="text-gray-600">Old Password</Label>
                <div className="relative">
                    <Input
                        id="oldPassword"
                        type={showOldPassword ? "text" : "password"}
                        placeholder="............"
                        className="bg-gray-50 border-none h-12 pr-10 focus-visible:ring-1 focus-visible:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-600">Password</Label>
                <div className="relative">
                    <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-50 border-none h-12 pr-10 focus-visible:ring-1 focus-visible:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-600">Confirm Password</Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-50 border-none h-12 pr-10 focus-visible:ring-1 focus-visible:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};
