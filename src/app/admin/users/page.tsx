'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  X,
  Loader2,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastContext';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { ServerPagination } from '@/components/admin/ServerPagination';
import { SearchInput } from '@/components/admin/SearchInput';
import { SkeletonTable, EmptyState, ErrorState } from '@/components/admin/StateViews';
import { UserRole, UserStatus } from '@/models/User';

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  image?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const currentUserRole = session?.user?.role;
  const isSuperAdmin = currentUserRole === 'super_admin';

  const toast = useToast();

  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal Create / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState<UserRole>('editor');
  const [formStatus, setFormStatus] = useState<UserStatus>('active');
  const [formError, setFormError] = useState('');

  // Delete Confirm Dialog
  const [deleteTarget, setDeleteTarget] = useState<UserItem | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        role: roleFilter,
        status: statusFilter,
      });

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Không thể tải danh sách người dùng');
      }

      setUsers(json.data);
      setTotal(json.pagination.total);
      setTotalPages(json.pagination.totalPages);
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, roleFilter, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Open modal create
  const handleOpenCreate = () => {
    setEditingUser(null);
    setFormName('');
    setFormEmail('');
    setFormPassword('');
    setFormRole('editor');
    setFormStatus('active');
    setFormError('');
    setModalOpen(true);
  };

  // Open modal edit
  const handleOpenEdit = (user: UserItem) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormPassword('');
    setFormRole(user.role);
    setFormStatus(user.status);
    setFormError('');
    setModalOpen(true);
  };

  // Submit Modal
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim() || !formEmail.trim()) {
      setFormError('Vui lòng nhập họ tên và email.');
      return;
    }

    if (!editingUser && (!formPassword || formPassword.length < 6)) {
      setFormError('Mật khẩu cho tài khoản mới cần ít nhất 6 ký tự.');
      return;
    }

    setModalLoading(true);

    try {
      const payload: any = {
        name: formName.trim(),
        email: formEmail.trim().toLowerCase(),
        role: formRole,
        status: formStatus,
      };

      if (formPassword.trim()) {
        payload.password = formPassword;
      }

      const url = editingUser
        ? `/api/admin/users/${editingUser._id}`
        : '/api/admin/users';
      const method = editingUser ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Không thể lưu thông tin người dùng');
      }

      toast.success(
        editingUser
          ? 'Đã cập nhật tài khoản thành công!'
          : 'Đã tạo tài khoản quản trị mới thành công!'
      );
      setModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      setFormError(err.message || 'Lỗi khi lưu dữ liệu');
      toast.error(err.message || 'Lỗi khi lưu dữ liệu');
    } finally {
      setModalLoading(false);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    if (deleteTarget._id === currentUserId) {
      toast.error('Bạn không thể tự xóa tài khoản của chính mình!');
      setDeleteTarget(null);
      return;
    }

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteTarget._id}`, {
        method: 'DELETE',
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Không thể xóa người dùng');
      }

      toast.success('Đã xóa tài khoản thành công!');
      setDeleteTarget(null);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || 'Không thể xóa người dùng');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-indigo-400" />
            Người dùng & Phân quyền
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Quản lý tài khoản ban biên tập, gán vai trò Role và bảo mật hệ thống
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Thêm tài khoản
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div className="sm:col-span-2">
          <SearchInput
            placeholder="Tìm theo họ tên hoặc email..."
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
          />
        </div>

        <div>
          <label htmlFor="user-role-filter" className="sr-only">Lọc theo vai trò người dùng</label>
          <select
            id="user-role-filter"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="w-full bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor (Biên tập)</option>
            <option value="user">User (Độc giả)</option>
          </select>
        </div>

        <div>
          <label htmlFor="user-status-filter" className="sr-only">Lọc theo trạng thái người dùng</label>
          <select
            id="user-status-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động (Active)</option>
            <option value="inactive">Đã khóa (Inactive)</option>
          </select>
        </div>
      </div>

      {/* Main Users Table */}
      {loading ? (
        <SkeletonTable rows={5} cols={5} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchUsers} />
      ) : users.length === 0 ? (
        <EmptyState
          title="Không tìm thấy người dùng"
          description="Không có tài khoản nào khớp với tiêu chí tìm kiếm."
          actionLabel={isSuperAdmin ? 'Tạo tài khoản mới' : undefined}
          onAction={isSuperAdmin ? handleOpenCreate : undefined}
        />
      ) : (
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead>
                <tr className="border-b border-zinc-800 text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-900/60">
                  <th className="py-3.5 px-6">Người dùng</th>
                  <th className="py-3.5 px-6">Email</th>
                  <th className="py-3.5 px-6">Vai trò (Role)</th>
                  <th className="py-3.5 px-6">Trạng thái</th>
                  <th className="py-3.5 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {users.map((u) => {
                  const isCurrent = u._id === currentUserId;
                  return (
                    <tr key={u._id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0 border border-zinc-700">
                            {u.name ? u.name[0].toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              {u.name}
                              {isCurrent && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-zinc-500">
                              Gia nhập: {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-mono text-xs text-zinc-400">
                        {u.email}
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                            u.role === 'super_admin'
                              ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                              : u.role === 'admin'
                              ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                              : u.role === 'editor'
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                              : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                          }`}
                        >
                          {u.role === 'super_admin' && <ShieldAlert className="w-3 h-3" />}
                          {u.role === 'admin' && <ShieldCheck className="w-3 h-3" />}
                          {u.role === 'editor' && <UserCheck className="w-3 h-3" />}
                          {u.role.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        {u.status === 'active' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle className="w-3 h-3" />
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            <XCircle className="w-3 h-3" />
                            Đã khóa
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isSuperAdmin && (
                            <>
                              <button
                                onClick={() => handleOpenEdit(u)}
                                className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors"
                                title="Chỉnh sửa phân quyền"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              {!isCurrent && (
                                <button
                                  onClick={() => setDeleteTarget(u)}
                                  className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-950/20 hover:bg-rose-950/40 rounded-lg border border-rose-900/30 transition-colors"
                                  title="Xóa tài khoản"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-800 px-4">
            <ServerPagination
              page={page}
              limit={limit}
              total={total}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
              onLimitChange={(l) => {
                setLimit(l);
                setPage(1);
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Add / Edit User */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-semibold text-white">
                {editingUser ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Họ và tên <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Email đăng nhập <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="user@pulse.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {editingUser ? 'Mật khẩu mới (Để trống nếu không đổi)' : 'Mật khẩu khởi tạo *'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="password"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder={editingUser ? '••••••••' : 'Tối thiểu 6 ký tự'}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Vai trò (Role)
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as any)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Trạng thái
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Đã khóa</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={modalLoading}
                  className="px-4 py-2 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-50"
                >
                  {modalLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {editingUser ? 'Lưu thay đổi' : 'Tạo tài khoản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Xóa tài khoản người dùng"
        message={`Bạn có chắc chắn muốn xóa tài khoản "${deleteTarget?.name}" (${deleteTarget?.email})? Hệ thống bảo vệ sẽ không cho phép xóa Super Admin cuối cùng.`}
        confirmLabel="Xác nhận xóa"
        isLoading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
