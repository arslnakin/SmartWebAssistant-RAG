"use client";
import Image from 'next/image';

export default function Hero() {
    const openChatbot = (e) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('openChatbot'));
        }
    };

    return (
        <section style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            <Image
                src="/hero-bg.png"
                alt="Luxivolt Hero Background"
                fill
                priority
                sizes="100vw"
                style={{ objectFit: 'cover', zIndex: 0 }}
            />
            {/* Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, rgba(6, 14, 27, 0.9) 0%, rgba(6, 14, 27, 0.4) 100%)',
                zIndex: 1
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ maxWidth: '700px' }} className="animate-fade">
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '700',
                        lineHeight: '1.2',
                        marginBottom: '1.5rem',
                        color: 'white'
                    }}>
                        Geleceği <span style={{ color: 'var(--primary-light)' }}>Enerjiyle</span> İnşa Ediyoruz
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-dim)',
                        marginBottom: '2.5rem',
                        lineHeight: '1.8'
                    }}>
                        Luxivolt Mühendislik, endüstriyel tesislerden modern binalara kadar geniş bir yelpazede yüksek standartlı elektrik ve mühendislik çözümleri sunar.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <a href="#hizmetler" className="btn-primary">Hizmetlerimizi Gör</a>
                        <button
                            onClick={openChatbot}
                            className="btn-outline flex items-center gap-2 group"
                            style={{ cursor: 'pointer' }}
                        >
                            <span>AI Chatbot</span>
                            {/* Simple SVG Icon inline */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Accent */}
            <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                height: '100px',
                background: 'linear-gradient(to top, var(--bg-dark), transparent)',
                zIndex: 3
            }}></div>
        </section>
    );
}
