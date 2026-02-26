"use client";

import Link from "next/link";

import { Button, Card, Input, Label } from "@/components/ui";
import { useTranslation } from "@/lib/providers";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();

  return (
    <Card className="w-full shadow-lg">
      <Card.Header className="pb-2">
        <Card.Title className="text-2xl font-bold">
          {t("auth.forgotPassword")}
        </Card.Title>
        <Card.Description>{t("auth.resetDescription")}</Card.Description>
      </Card.Header>

      <Card.Content className="pt-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>

          <Button type="submit" className="w-full">
            {t("auth.sendResetLink")}
          </Button>
        </form>

        <p className="text-muted-foreground mt-4 text-center text-sm">
          {t("auth.rememberPassword")}{" "}
          <Link
            href="/auth/login"
            className="text-foreground font-medium hover:underline"
          >
            {t("auth.loginNow")}
          </Link>
        </p>
      </Card.Content>
    </Card>
  );
}
