"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-bg-dark/80 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"}`} style={{
            backgroundColor: scrolled ? 'rgba(10, 25, 47, 0.9)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            padding: scrolled ? '1rem 0' : '1.5rem 0',
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 1000
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ position: 'relative', width: '45px', height: '45px', overflow: 'hidden' }}>
                        <Image
                            src="/luxivolt-logo.png"
                            alt="Luxivolt Logo"
                            fill
                            style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
                            sizes="45px"
                        />
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '1px', color: 'white' }}>LUXIVOLT</span>
                </Link>

                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <Link href="#hizmetler" style={{ fontWeight: '500', color: 'var(--text-light)' }}>Hizmetler</Link>
                    <Link href="#hakkimizda" style={{ fontWeight: '500', color: 'var(--text-light)' }}>Hakkımızda</Link>
                    <Link href="#referanslar" style={{ fontWeight: '500', color: 'var(--text-light)' }}>Referanslar</Link>
                    <Link href="#iletisim" className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>İletişim</Link>
                </div>
            </div>
        </nav>
    );
}
