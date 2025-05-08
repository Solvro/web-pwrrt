// app/admin/AdminLayout.tsx
'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/Auth/AuthContext';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import RentModal from '@/components/modals/RentModal';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="">
      <LoginModal />
      <RegisterModal />
      <RentModal />
      <AuthProvider>
        <div className="admin-layout">{children}</div>
      </AuthProvider>
    </div>
  );
};

export default AdminLayout;
