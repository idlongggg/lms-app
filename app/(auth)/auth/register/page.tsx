'use client';

import { ChevronsUpDown, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Avatar, Button, Card, Command, Input, Label, Popover } from '@/components/retroui';
import { mockSchools } from '@/lib/mock/schools';
import { useTranslation } from '@/lib/providers';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock registration API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/verify-otp');
    }, 1000);
  };

  return (
    <Card className="w-full shadow-lg">
      <Card.Header className="pb-2">
        <Card.Title className="text-2xl font-bold">{t('auth.register')}</Card.Title>
        <Card.Description>{t('auth.startJourney')}</Card.Description>
      </Card.Header>

      <Card.Content className="pt-6">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('auth.name')}</Label>
            <Input id="name" type="text" placeholder="Nguyễn Văn A" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <Label>{t('auth.school')}</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <Popover.Trigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between font-normal"
                >
                  {value ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5 border">
                        <Avatar.Image
                          src={mockSchools.find((school) => school.id === value)?.logo}
                          alt="School Logo"
                        />
                        <Avatar.Fallback>S</Avatar.Fallback>
                      </Avatar>
                      <span className="truncate">
                        {mockSchools.find((school) => school.id === value)?.name}
                      </span>
                    </div>
                  ) : (
                    t('auth.selectSchool')
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </Popover.Trigger>
              <Popover.Content className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <Command.Input placeholder={t('auth.searchSchool')} />
                  <Command.List>
                    <Command.Empty>{t('auth.noSchoolFound')}</Command.Empty>
                    <Command.Group>
                      {mockSchools.map((school) => (
                        <Command.Item
                          key={school.id}
                          value={school.name}
                          onSelect={() => {
                            setValue(school.id === value ? '' : school.id);
                            setOpen(false);
                          }}
                        >
                          <Command.Check
                            className={cn(
                              'mr-2 ml-0',
                              value === school.id ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border">
                              <Avatar.Image src={school.logo} alt={school.name} />
                              <Avatar.Fallback>S</Avatar.Fallback>
                            </Avatar>
                            <span>{school.name}</span>
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  </Command.List>
                </Command>
              </Popover.Content>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('common.loading') : t('auth.register')}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="border-border w-full border-t-2" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background text-muted-foreground px-4 text-sm">{t('auth.or')}</span>
          </div>
        </div>

        <Button variant="outline" type="button" className="w-full">
          {t('auth.registerWithGoogle')}
        </Button>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          {t('auth.haveAccount')}{' '}
          <Link href="/auth/login" className="text-foreground font-medium hover:underline">
            {t('auth.loginNow')}
          </Link>
        </p>
      </Card.Content>
    </Card>
  );
}
