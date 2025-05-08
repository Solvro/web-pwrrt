"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import JoinusSection from "@/components/section/JoinusSection/JoinusSection";
import { useAuth } from "@/context/Auth/AuthContext";

interface AdminPageClientProps {
  dict: {
    title: string;
    buttonRecruitment: string;
    buttonPartner: string;
  };
}

const AdminPageContent: React.FC<AdminPageClientProps> = ({ dict }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/addNews");
    }
  }, [isAuthenticated, router]);

  return <JoinusSection dict={dict} sizeBig />;
};

const AdminPageClient: React.FC<AdminPageClientProps> = (props) => {
  return <AdminPageContent {...props} />;
};

export default AdminPageClient;
