import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

import { Text } from '@/components/retroui';
import { cn } from '@/lib/utils';

interface LogoProps {
  title?: string;
  className?: string;
}

export function Logo({ title = 'LMS', className }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <div className="border-border bg-primary flex h-9 w-9 items-center justify-center border-2 shadow-sm">
        <GraduationCap className="h-5 w-5" />
      </div>
      {title && (
        <Text as="h3" className="font-bold">
          {title}
        </Text>
      )}
    </Link>
  );
}
