'use client';

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { roleDisplayInfo } from "@/lib/mock/users";
import type { MockUser } from "@/lib/mock/users";

export default function LoginPage() {
  const { loginWithMockUser, getMockUsers, isLoading } = useAuth();
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const mockUsers = getMockUsers();

  const handleMockLogin = async (user: MockUser) => {
    setSelectedUser(user);
    setIsLoggingIn(true);
    try {
      await loginWithMockUser(user);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const clearSession = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lms_auth_user');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-bold text-3xl">Đăng nhập</h1>
        <p className="text-muted-foreground">
          Chào mừng trở lại! Nhập thông tin để tiếp tục.
        </p>
      </div>

      {/* Dev Login Section */}
      <div className="rounded-lg border-2 border-dashed border-primary/50 bg-primary/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-sm text-primary">🔧 Dev Login</h2>
          <button
            onClick={clearSession}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear Session
          </button>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          Chọn một tài khoản để đăng nhập nhanh:
        </p>
        <div className="grid gap-2">
          {mockUsers.map((user) => {
            const roleInfo = roleDisplayInfo[user.role];
            const isSelected = selectedUser?.id === user.id;
            
            return (
              <button
                key={user.id}
                onClick={() => handleMockLogin(user)}
                disabled={isLoggingIn}
                className={`
                  flex items-center gap-3 rounded border-2 p-3 text-left transition-all
                  ${isSelected && isLoggingIn 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border bg-background hover:border-primary/50 hover:bg-muted'
                  }
                  disabled:opacity-50
                `}
              >
                {/* Avatar */}
                <div 
                  className="h-10 w-10 rounded-full border-2 border-border bg-muted overflow-hidden flex-shrink-0"
                  style={{ borderColor: roleInfo.color }}
                >
                  {user.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div 
                      className="h-full w-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: roleInfo.color, color: 'white' }}
                    >
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{user.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                </div>

                {/* Role Badge */}
                <div 
                  className="rounded px-2 py-1 text-xs font-medium text-white flex-shrink-0"
                  style={{ backgroundColor: roleInfo.color }}
                >
                  {roleInfo.label}
                </div>

                {/* Loading indicator */}
                {isSelected && isLoggingIn && (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-sm text-muted-foreground">
            hoặc đăng nhập thủ công
          </span>
        </div>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full border-2 border-border bg-input px-4 py-3 shadow-xs transition-shadow focus:shadow-sm focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Mật khẩu
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full border-2 border-border bg-input px-4 py-3 shadow-xs transition-shadow focus:shadow-sm focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled
          className="w-full border-2 border-border bg-primary px-4 py-3 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md active:translate-x-0 active:translate-y-0 active:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Đăng nhập
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-sm text-muted-foreground">
            hoặc
          </span>
        </div>
      </div>

      <button
        type="button"
        disabled
        className="w-full border-2 border-border bg-background px-4 py-3 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Đăng nhập với Google
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Chưa có tài khoản?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-foreground hover:underline"
        >
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}
