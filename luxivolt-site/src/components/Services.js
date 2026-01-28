import Image from 'next/image';

const services = [
    {
        title: "A.G. & Y.G. Sistemleri",
        description: "Alçak ve Yüksek Gerilim trafo merkezleri, enerji nakil hatları ve dağıtım panoları kurulumu.",
        image: "/service-agyg.png"
    },
    {
        title: "Endüstriyel Otomasyon",
        description: "PLC sistemleri, SCADA yazılımları ve fabrika üretim hattı otomasyon çözümleri.",
        image: "/hero-bg.png" // Reusing hero for now
    },
    {
        title: "Yenilenebilir Enerji",
        description: "Güneş enerjisi santralleri (GES) projelendirme, kurulum ve bakım hizmetleri.",
        image: "/service-solar.png"
    }
];

export default function Services() {
    return (
        <section id="hizmetler" className="section-padding">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Neler Yapıyoruz?</h2>
                    <div style={{ width: '80px', height: '4px', background: 'var(--primary)', margin: '0 auto' }}></div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {services.map((service, index) => (
                        <div key={index} className="glass-card" style={{ overflow: 'hidden', transition: 'var(--transition)' }}>
                            <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--primary-light)' }}>{service.title}</h3>
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>{service.description}</p>
                                <a href="#" style={{
                                    display: 'inline-block',
                                    marginTop: '1.5rem',
                                    color: 'white',
                                    fontWeight: '600',
                                    fontSize: '0.9rem'
                                }}>
                                    Detaylı Bilgi →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
