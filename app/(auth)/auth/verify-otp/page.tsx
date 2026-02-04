"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button, Card, Input, Label } from "@/components/retroui";
import { useCountdown } from "@/lib/hooks/use-countdown";
import { useTranslation } from "@/lib/providers";

export default function VerifyOtpPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { count: countdown, start, isCounting } = useCountdown(0);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock verification
    setTimeout(() => {
      if (otp === "123456") {
        toast.success(t("auth.loginSuccess"));
        router.push("/dashboard");
      } else {
        toast.error(t("auth.otpInvalid"));
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleResend = () => {
    if (isCounting) return;
    toast.success(t("auth.otpResent"));
    start(60);
  };

  return (
    <Card className="w-full shadow-lg">
      <Card.Header className="pb-2">
        <Card.Title className="text-2xl font-bold">
          {t("auth.otpTitle")}
        </Card.Title>
        <Card.Description>{t("auth.otpDescription")}</Card.Description>
      </Card.Header>

      <Card.Content className="pt-6">
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp">{t("auth.otpLabel")}</Label>
            <Input
              id="otp"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="text-center text-2xl font-bold tracking-[0.5em]"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? t("common.loading") : t("auth.verify")}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            onClick={handleResend}
            className="text-muted-foreground hover:text-foreground text-sm font-normal"
            type="button"
            disabled={isCounting}
          >
            {isCounting
              ? `${t("auth.resendOtp")} (${countdown}s)`
              : t("auth.resendOtp")}
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
