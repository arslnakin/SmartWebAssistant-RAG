import Image from 'next/image';

const references = [
    {
        name: "Astrowatt Enerji",
        project: "Güneş Enerjisi Santrali (10MW)",
        location: "Konya, TR",
        category: "Yenilenebilir Enerji",
        color: "#4CAF50"
    },
    {
        name: "Boreas Endüstriyel",
        project: "Fabrika Otomasyon ve A.G. Panoları",
        location: "Kocaeli, TR",
        category: "Endüstriyel",
        color: "#0047AB"
    },
    {
        name: "Zenon Lojistik",
        project: "Akıllı Depo Aydınlatma ve Enerji Altyapısı",
        location: "İstanbul, TR",
        category: "Lojistik",
        color: "#E11D48"
    },
    {
        name: "Nova Tech Plaza",
        project: "Zayıf Akım ve Güvenlik Sistemleri",
        location: "Ankara, TR",
        category: "Ticari Bina",
        color: "#FF9800"
    },
    {
        name: "Terra Madencilik",
        project: "Y.G. Trafo Merkezi Kurulumu",
        location: "Sivas, TR",
        category: "Madencilik",
        color: "#795548"
    },
    {
        name: "AquaPure Tesisleri",
        project: "Pompa İstasyonu Elektrik Altyapısı",
        location: "İzmir, TR",
        category: "Arıtma",
        color: "#00BCD4"
    }
];

export default function References() {
    return (
        <section id="referanslar" className="section-padding">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Referanslarımız</h2>
                    <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto' }}>
                        Türkiye genelinde tamamladığımız 500'den fazla projeden bazıları.
                    </p>
                    <div style={{ width: '80px', height: '4px', background: 'var(--primary)', margin: '1.5rem auto' }}></div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {references.map((ref, index) => (
                        <div key={index} className="glass-card" style={{
                            padding: '2rem',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'var(--transition)',
                            cursor: 'default'
                        }}>
                            {/* Category Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                fontSize: '0.7rem',
                                fontWeight: '700',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '50px',
                                background: `${ref.color}22`,
                                color: ref.color,
                                border: `1px solid ${ref.color}44`,
                                textTransform: 'uppercase'
                            }}>
                                {ref.category}
                            </div>

                            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{ref.name}</h3>
                            <p style={{ color: 'var(--primary-light)', fontWeight: '600', fontSize: '1rem', marginBottom: '1rem' }}>
                                {ref.project}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                                <span>📍 {ref.location}</span>
                            </div>

                            {/* Decorative accent */}
                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                height: '4px',
                                background: `linear-gradient(90deg, transparent, ${ref.color}, transparent)`
                            }}></div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <a href="#" className="btn-outline">Tüm Projeleri İndir (Katalog)</a>
                </div>
            </div>
        </section>
    );
}
