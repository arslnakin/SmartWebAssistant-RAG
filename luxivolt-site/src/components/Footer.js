export default function Footer() {
    return (
        <footer id="iletisim" className="section-padding" style={{ backgroundColor: 'var(--bg-darker)', borderTop: '1px solid var(--glass-border)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white' }}>LUXIVOLT</h3>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                            Endüstriyel elektrik ve mühendislik çözümlerinde dünya standartlarında hizmet. Enerjinizi güvenle yönetiyoruz.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: '600' }}>Hızlı Linkler</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><a href="#" style={{ color: 'var(--text-dim)' }}>Anasayfa</a></li>
                            <li><a href="#hizmetler" style={{ color: 'var(--text-dim)' }}>Hizmetler</a></li>
                            <li><a href="#hakkimizda" style={{ color: 'var(--text-dim)' }}>Hakkımızda</a></li>
                            <li><a href="#referanslar" style={{ color: 'var(--text-dim)' }}>Referanslar</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: '600' }}>İletişim</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                            <li>📍 Organize Sanayi Bölgesi, 4. Cadde No: 12, İstanbul</li>
                            <li>📞 +90 (212) 555 00 00</li>
                            <li>✉️ info@luxivoltmuhendislik.com.tr</li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: '600' }}>Bülten</h4>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '1rem' }}>Gelişmelerden haberdar olun.</p>
                        <div style={{ display: 'flex' }}>
                            <input type="email" placeholder="E-posta adresiniz" style={{
                                padding: '0.8rem',
                                borderRadius: '4px 0 0 4px',
                                border: 'none',
                                background: 'var(--glass)',
                                color: 'white',
                                width: '100%'
                            }} />
                            <button className="btn-primary" style={{ borderRadius: '0 4px 4px 0', padding: '0.4rem 1rem' }}>Gönder</button>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                    <p>© 2026 Luxivolt Mühendislik & Elektrik A.Ş. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
}
