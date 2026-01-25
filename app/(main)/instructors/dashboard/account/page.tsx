import { AccountManagement } from '@/components/dashboard/instructor/account/AccountManagement';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Instructor Account | ChainVerse Academy',
    description: 'Manage your instructor profile and account settings',
};

export default function InstructorAccountPage() {
    return (
        <div className="bg-[#FAFAFA] min-h-screen p-6 md:p-8">
            <AccountManagement />
        </div>
    );
}
