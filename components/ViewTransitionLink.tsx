'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface ViewTransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ViewTransitionLink({ href, children, ...props }: ViewTransitionLinkProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // @ts-ignore
    if (!document.startViewTransition) {
      router.push(href.toString());
      return;
    }

    // @ts-ignore
    document.startViewTransition(() => {
      startTransition(() => {
        router.push(href.toString());
      });
    });
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
