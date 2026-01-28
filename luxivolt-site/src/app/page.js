import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import References from "@/components/References";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <References />
      <About />

      {/* Partners Section/Ticker */}
      <section style={{ padding: '3rem 0', background: 'white' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            opacity: 0.6,
            filter: 'grayscale(100%)'
          }}>
            <span style={{ color: '#000', fontWeight: '800', fontSize: '1.5rem' }}>SIEMENS</span>
            <span style={{ color: '#000', fontWeight: '800', fontSize: '1.5rem' }}>SCHNEIDER</span>
            <span style={{ color: '#000', fontWeight: '800', fontSize: '1.5rem' }}>ABB</span>
            <span style={{ color: '#000', fontWeight: '800', fontSize: '1.5rem' }}>EATON</span>
            <span style={{ color: '#000', fontWeight: '800', fontSize: '1.5rem' }}>LEGRAND</span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
