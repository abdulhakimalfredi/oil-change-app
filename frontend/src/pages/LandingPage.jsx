import { Link } from 'react-router-dom';
import { theme } from '../styles/theme';

const services = [
  { icon: '🛢️', title: 'تغيير الزيت', desc: 'زيوت عالية الجودة لجميع أنواع السيارات' },
  { icon: '🔧', title: 'تغيير الفلتر', desc: 'فلاتر أصلية لأفضل أداء لمحركك' },
  { icon: '⚙️', title: 'صيانة شاملة', desc: 'فحص كامل وصيانة دورية احترافية' },
];

const stats = [
  { number: '+500', label: 'عميل راضٍ' },
  { number: '+5', label: 'سنوات خبرة' },
  { number: '30', label: 'دقيقة متوسط الخدمة' },
  { number: '7', label: 'أيام في الأسبوع' },
];

function LandingPage() {
  return (
    <div style={{ backgroundColor: theme.colors.gray100, minHeight: '100vh', direction: 'rtl' }}>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <p style={styles.heroTag}>⚡ الأسرع في المنطقة</p>
          <h1 style={styles.heroTitle}>
            خدمة زيت احترافية<br />
            <span style={{ color: theme.colors.accent }}>في 30 دقيقة</span>
          </h1>
          <p style={styles.heroSub}>
            نعتني بسيارتك كما نعتني بسيارتنا — خبرة تتجاوز 5 سنوات في خدمة أكثر من 500 عميل
          </p>
          <div style={styles.heroBtns}>
            <Link to="/booking" style={styles.btnPrimary}>احجز موعدك الآن</Link>
            <a href="#services" style={styles.btnSecondary}>اعرف أكثر</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={styles.statsBar}>
        {stats.map((s, i) => (
          <div key={i} style={styles.statItem}>
            <div style={styles.statNumber}>{s.number}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Services */}
      <section id="services" style={styles.section}>
        <h2 style={styles.sectionTitle}>خدماتنا</h2>
        <p style={styles.sectionSub}>كل ما تحتاجه سيارتك في مكان واحد</p>
        <div style={styles.cardsGrid}>
          {services.map((s, i) => (
            <div key={i} style={styles.serviceCard}>
              <div style={styles.serviceIcon}>{s.icon}</div>
              <h3 style={styles.serviceTitle}>{s.title}</h3>
              <p style={styles.serviceDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>جاهز تحجز موعدك؟</h2>
        <p style={styles.ctaSub}>لا تنتظر — احجز الآن وسنتواصل معك خلال دقائق</p>
        <Link to="/booking" style={styles.btnPrimary}>احجز الآن مجاناً</Link>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 سبيد أويل — جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}

const styles = {
  hero: {
    position: 'relative',
    background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
    padding: '6rem 2rem',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(circle at 70% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)',
  },
  heroContent: { position: 'relative', maxWidth: '700px', margin: '0 auto' },
  heroTag: {
    display: 'inline-block',
    backgroundColor: 'rgba(201,168,76,0.15)',
    color: theme.colors.accent,
    padding: '0.4rem 1.2rem',
    borderRadius: theme.radius.full,
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
    border: `1px solid ${theme.colors.accent}`,
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: '3rem',
    fontWeight: 'bold',
    lineHeight: 1.3,
    marginBottom: '1rem',
  },
  heroSub: {
    color: theme.colors.gray400,
    fontSize: '1.1rem',
    lineHeight: 1.8,
    marginBottom: '2.5rem',
  },
  heroBtns: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.primary,
    padding: '0.9rem 2.5rem',
    borderRadius: theme.radius.full,
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    boxShadow: theme.shadows.gold,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    color: theme.colors.white,
    padding: '0.9rem 2.5rem',
    borderRadius: theme.radius.full,
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    border: `1px solid rgba(255,255,255,0.3)`,
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0',
    backgroundColor: theme.colors.white,
    boxShadow: theme.shadows.md,
    flexWrap: 'wrap',
  },
  statItem: {
    padding: '2rem 3rem',
    textAlign: 'center',
    borderLeft: `1px solid ${theme.colors.gray200}`,
  },
  statNumber: { fontSize: '2rem', fontWeight: 'bold', color: theme.colors.accent },
  statLabel: { color: theme.colors.gray600, fontSize: '0.9rem', marginTop: '0.3rem' },
  section: { padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' },
  sectionTitle: { fontSize: '2rem', fontWeight: 'bold', color: theme.colors.primary, marginBottom: '0.5rem' },
  sectionSub: { color: theme.colors.gray600, marginBottom: '3rem' },
  cardsGrid: { display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' },
  serviceCard: {
    backgroundColor: theme.colors.white,
    padding: '2.5rem 2rem',
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadows.sm,
    flex: '1',
    minWidth: '220px',
    maxWidth: '300px',
    border: `1px solid ${theme.colors.gray200}`,
    transition: 'transform 0.2s',
  },
  serviceIcon: { fontSize: '3rem', marginBottom: '1rem' },
  serviceTitle: { color: theme.colors.primary, fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' },
  serviceDesc: { color: theme.colors.gray600, lineHeight: 1.7 },
  cta: {
    backgroundColor: theme.colors.primary,
    padding: '5rem 2rem',
    textAlign: 'center',
    borderTop: `3px solid ${theme.colors.accent}`,
  },
  ctaTitle: { color: theme.colors.white, fontSize: '2rem', marginBottom: '1rem' },
  ctaSub: { color: theme.colors.gray400, marginBottom: '2rem', fontSize: '1.1rem' },
  footer: {
    backgroundColor: '#060e1a',
    color: theme.colors.gray600,
    textAlign: 'center',
    padding: '1.5rem',
    fontSize: '0.9rem',
  },
};

export default LandingPage;