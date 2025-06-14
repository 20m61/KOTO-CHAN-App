'use client';

// import { useState } from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { LoginForm } from '@/components/features/admin/LoginForm';
import { AdminDashboard } from '@/components/features/admin/AdminDashboard';
import { useAdminStore } from '@/lib/store/adminStore';

export default function AdminPage() {
  const { isAuthenticated } = useAdminStore();

  return (
    <PageContainer
      title="おとなメニュー"
      showBackButton={true}
      background="gradient"
      padding="large"
    >
      {isAuthenticated ? <AdminDashboard /> : <LoginForm />}
    </PageContainer>
  );
}
