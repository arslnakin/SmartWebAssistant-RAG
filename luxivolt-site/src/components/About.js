import Image from 'next/image';

export default function About() {
    return (
        <section id="hakkimizda" className="section-padding" style={{ backgroundColor: 'var(--bg-darker)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '100%',
                            height: '400px',
                            backgroundColor: 'var(--primary)',
                            borderRadius: '20px',
                            opacity: 0.1,
                            position: 'absolute',
                            top: '20px',
                            left: '-20px',
                            zIndex: 0
                        }}></div>
                        <div style={{
                            width: '100%',
                            height: '400px',
                            borderRadius: '20px',
                            position: 'relative',
                            zIndex: 1,
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            backdropFilter: 'none'
                        }}>
                            <Image
                                src="/luxivolt-logo.png"
                                alt="Luxivolt Logo"
                                fill
                                style={{ objectFit: 'contain', padding: '2rem', mixBlendMode: 'multiply' }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>Güçlü Yarınlar İçin <br /> <span style={{ color: 'var(--primary-light)' }}>Uzman Kadro</span></h2>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                            Luxivolt Mühendislik, 20 yılı aşkın tecrübesiyle elektrik sektöründe güvenin ve kalitenin adresi olmuştur. Modern mühendislik yaklaşımlarını, geleneksel iş disipliniyle birleştirerek projelendirmeden uygulamaya her aşamada yanınızdayız.
                        </p>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
                            Vizyonumuz, Türkiye'nin ve dünyanın enerji altyapısını en akıllı ve sürdürülebilir çözümlerle güçlendirmektir. Müşteri memnuniyeti ve teknik mükemmellik vazgeçilmez ilkelerimizdir.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <h4 style={{ color: 'var(--primary-light)', fontSize: '2rem', fontWeight: '800' }}>500+</h4>
                                <p style={{ color: 'white', fontWeight: '500' }}>Tamamlanan Proje</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--primary-light)', fontSize: '2rem', fontWeight: '800' }}>150+</h4>
                                <p style={{ color: 'white', fontWeight: '500' }}>Mutlu Kurumsal Müşteri</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
