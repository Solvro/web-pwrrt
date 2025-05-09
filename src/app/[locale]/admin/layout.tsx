// app/admin/AdminLayout.tsx
"use client";

import type { ReactNode } from "react";

import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import RentModal from "@/components/modals/RentModal";
import { AuthProvider } from "@/src/context/Auth/AuthContext";

// app/admin/AdminLayout.tsx

// app/admin/AdminLayout.tsx

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
