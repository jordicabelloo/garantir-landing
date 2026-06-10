'use client';
import React from 'react';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { createPortal } from 'react-dom';

type HeaderProps = {
    onCTA?: () => void;
};

export function Header({ onCTA }: HeaderProps) {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);

    const links = [
        { label: 'The problem', href: '#problem' },
        { label: 'How it works', href: '#how' },
        { label: 'What we test', href: '#tested' },
    ];

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-50 w-full bg-background border-b border-[rgba(236,230,216,0.1)]">
            <nav className="flex h-14 w-full items-center" style={{ paddingLeft: 'calc(10rem + 2.5rem)', paddingRight: 'calc(10rem + 2.5rem)' }}>
                {/* Logo — left */}
                <div className="flex-1 flex items-center">
                    <div className="hover:bg-accent rounded-md p-2">
                        <GarantirMark />
                    </div>
                </div>

                {/* Links — center */}
                <div className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
                        <a key={link.label} className={buttonVariants({ variant: 'ghost' })} href={link.href}>
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA — right */}
                <div className="flex-1 hidden md:flex justify-end">
                    <Button variant="outline" onClick={onCTA}>Get the verdict</Button>
                </div>

                {/* Mobile toggle */}
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setOpen(!open)}
                    className="md:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label="Toggle menu"
                >
                    <MenuToggleIcon open={open} className="size-5" duration={300} />
                </Button>
            </nav>
            <MobileMenu open={open} className="flex flex-col justify-between gap-2">
                <div className="grid gap-y-2">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            className={buttonVariants({
                                variant: 'ghost',
                                className: 'justify-start',
                            })}
                            href={link.href}
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        className="w-full"
                        onClick={() => { setOpen(false); onCTA?.(); }}
                    >
                        Get the verdict
                    </Button>
                </div>
            </MobileMenu>
        </header>
    );
}

type MobileMenuProps = React.ComponentProps<'div'> & {
    open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
    if (!open || typeof window === 'undefined') return null;

    return createPortal(
        <div
            id="mobile-menu"
            className={cn(
                'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
                'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
            )}
        >
            <div
                data-slot={open ? 'open' : 'closed'}
                className={cn(
                    'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
                    'size-full p-4',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}

function GarantirMark() {
    return (
        <Image
            src="/garantir-logo.png"
            alt="Garantir"
            width={0}
            height={0}
            sizes="100vw"
            style={{ height: '28px', width: 'auto', pointerEvents: 'none' }}
            draggable={false}
            priority
        />
    );
}
