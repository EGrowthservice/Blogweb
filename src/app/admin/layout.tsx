'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
  PlusCircle,
  ShieldAlert,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Megaphone,
} from 'lucide-react';
import { ToastProvider } from '@/components/admin/ToastContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, render plain container with ToastProvider
  if (pathname === '/admin/login') {
    return <ToastProvider>{children}</ToastProvider>;
  }

  const role = session?.user?.role || 'user';
  const isSuperAdmin = role === 'super_admin';
  const isAdmin = role === 'admin' || isSuperAdmin;
  const isEditor = role === 'editor';

  const navItems = [
    {
      label: 'Tổng quan',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
      show: true,
    },
    {
      label: 'Tin tức & Bài viết',
      href: '/admin/posts',
      icon: FileText,
      active: pathname.startsWith('/admin/posts'),
      show: true,
    },
    {
      label: 'Danh mục',
      href: '/admin/categories',
      icon: FolderTree,
      active: pathname.startsWith('/admin/categories'),
      show: isAdmin,
    },
    {
      label: 'Người dùng & Phân quyền',
      href: '/admin/users',
      icon: Users,
      active: pathname.startsWith('/admin/users'),
      show: isAdmin,
    },
    {
      label: 'Quảng cáo & Analytics',
      href: '/admin/settings/advertising',
      icon: Megaphone,
      active: pathname.startsWith('/admin/settings/advertising'),
      show: isAdmin,
    },
  ];

  // Helper for Breadcrumbs
  const getBreadcrumbs = () => {
    const parts = pathname.split('/').filter(Boolean);
    const crumbs = [{ label: 'Admin', href: '/admin' }];

    if (parts.length > 1) {
      if (parts[1] === 'posts') {
        crumbs.push({ label: 'Tin tức', href: '/admin/posts' });
        if (parts[2] === 'create') crumbs.push({ label: 'Tạo bài viết', href: '/admin/posts/create' });
        else if (parts[3] === 'edit') crumbs.push({ label: 'Chỉnh sửa', href: pathname });
      } else if (parts[1] === 'categories') {
        crumbs.push({ label: 'Danh mục', href: '/admin/categories' });
      } else if (parts[1] === 'users') {
        crumbs.push({ label: 'Người dùng', href: '/admin/users' });
      } else if (parts[1] === 'settings' && parts[2] === 'advertising') {
        crumbs.push({ label: 'Cài đặt Quảng cáo', href: '/admin/settings/advertising' });
      }
    }
    return crumbs;
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row antialiased selection:bg-indigo-500 selection:text-white">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Mở menu quản trị"
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-white tracking-wider flex items-center gap-1.5 text-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              PULSE ADMIN
            </span>
          </div>
          <Link
            href="/admin/posts/create"
            className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <PlusCircle className="w-4 h-4" />
            Viết bài
          </Link>
        </div>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800/80 z-50 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Top Brand */}
          <div>
            <div className="h-16 px-6 flex items-center justify-between border-b border-zinc-800/60">
              <Link href="/admin" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 font-black text-white text-base">
                  P
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-tight text-white leading-tight">PULSE ADMIN</h1>
                  <p className="text-[10px] text-zinc-400 font-medium">Dashboard Quản Trị</p>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-1.5">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Quản lý
              </div>
              {navItems
                .filter((item) => item.show)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        item.active
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 font-semibold'
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}

              <div className="pt-4 px-3 py-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Lối tắt
              </div>
              <Link
                href="/admin/posts/create"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/20 transition-all border border-emerald-500/10"
              >
                <PlusCircle className="w-4 h-4 shrink-0" />
                Soạn bài viết mới
              </Link>

              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-all"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                Xem Website
              </Link>
            </nav>
          </div>

          {/* Bottom User Profile */}
          <div className="p-4 border-t border-zinc-800/60 bg-zinc-900/60">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 border border-zinc-700">
                {session?.user?.name ? session.user.name[0].toUpperCase() : 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {session?.user?.name || 'Quản trị viên'}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isSuperAdmin
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : isAdmin
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {isSuperAdmin && <ShieldAlert className="w-2.5 h-2.5 mr-1" />}
                    {role.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl border border-rose-900/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Đăng xuất
            </button>
          </div>
        </aside>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Header */}
          <header className="hidden md:flex h-16 items-center justify-between px-8 bg-zinc-900/50 border-b border-zinc-800/80 sticky top-0 z-20 backdrop-blur-md">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              {getBreadcrumbs().map((crumb, idx) => (
                <React.Fragment key={crumb.href}>
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />}
                  {idx === getBreadcrumbs().length - 1 ? (
                    <span className="text-zinc-200 font-semibold">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-zinc-200 transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Quick Actions & Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Hệ thống sẵn sàng
              </div>

              <Link
                href="/admin/posts/create"
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Soạn bài viết
              </Link>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
