"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Label,
  Loader,
  Switch,
} from "@/components/retroui";
import { useAuth } from "@/lib/auth";
import type { MockUser } from "@/lib/mock/users";
import { roleDisplayInfo } from "@/lib/mock/users";
import { useTranslation } from "@/lib/providers";

export default function LoginPage() {
  const { t } = useTranslation();
  const { loginWithMockUser, getMockUsers } = useAuth();
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  // Mock dev login logic
  const mockUsers = getMockUsers();
  const handleMockLogin = async (user: MockUser) => {
    setSelectedUser(user);
    setIsLoggingIn(true);
    try {
      await loginWithMockUser(user);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <Card.Header className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <Card.Title className="text-2xl font-bold">
            {showDemo ? t("auth.devLogin") : t("auth.login")}
          </Card.Title>
          <Card.Description>
            {showDemo ? t("auth.devLoginDesc") : t("auth.welcomeBack")}
          </Card.Description>
        </div>
        <div className="flex items-center gap-2">
          <Label
            htmlFor="demo-mode"
            className="cursor-pointer text-xs font-medium"
          >
            {t("auth.demoMode")}
          </Label>
          <Switch
            id="demo-mode"
            checked={showDemo}
            onCheckedChange={setShowDemo}
          />
        </div>
      </Card.Header>

      <Card.Content className="pt-6">
        {showDemo ? (
          <div className="space-y-4">
            <div className="grid gap-2">
              {mockUsers.map((user) => {
                const roleInfo = roleDisplayInfo[user.role];
                const isSelected = selectedUser?.id === user.id;

                return (
                  <Button
                    key={user.id}
                    onClick={() => handleMockLogin(user)}
                    disabled={isLoggingIn}
                    variant="outline"
                    className="h-auto w-full justify-start gap-3 p-3 disabled:opacity-50"
                  >
                    {/* Avatar */}
                    <Avatar
                      className="h-10 w-10 border-2"
                      style={{ borderColor: roleInfo.color }}
                    >
                      <Avatar.Image
                        src={user.avatarUrl || undefined}
                        alt={user.name}
                      />
                      <Avatar.Fallback
                        style={{
                          backgroundColor: roleInfo.color,
                          color: "white",
                        }}
                        className="text-sm font-bold"
                      >
                        {user.name.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar>

                    {/* Info */}
                    <div className="min-w-0 flex-1 text-left">
                      <div className="truncate font-medium">{user.name}</div>
                      <div className="text-muted-foreground truncate text-xs">
                        {user.email}
                      </div>
                    </div>

                    {/* Role Badge or Loading */}
                    {isSelected && isLoggingIn ? (
                      <Loader size="sm" />
                    ) : (
                      <Badge
                        style={{
                          backgroundColor: roleInfo.color,
                          color: "white",
                        }}
                        className="border-0"
                      >
                        {roleInfo.label}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    {t("auth.forgotPassword")}
                  </Link>
                </div>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>

              <Button type="submit" disabled className="w-full">
                {t("auth.login")}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="border-border w-full border-t-2" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background text-muted-foreground px-4 text-sm">
                  {t("auth.or")}
                </span>
              </div>
            </div>

            <Button variant="outline" type="button" disabled className="w-full">
              {t("auth.loginWithGoogle")}
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              {t("auth.noAccount")}{" "}
              <Link
                href="/auth/register"
                className="text-foreground font-medium hover:underline"
              >
                {t("auth.registerNow")}
              </Link>
            </p>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
