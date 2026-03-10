import { Link, useLocation } from 'react-router-dom';
import { theme } from '../styles/theme';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span style={styles.logoIcon}>⚙️</span>
        <div>
          <div style={styles.logoText}>سبيد أويل</div>
          <div style={styles.logoSub}>مركز تغيير الزيت</div>
        </div>
      </div>
      <div style={styles.links}>
        <Link to="/" style={{ ...styles.link, ...(isActive('/') ? styles.activeLink : {}) }}>
          الرئيسية
        </Link>
        <Link to="/booking" style={{ ...styles.link, ...(isActive('/booking') ? styles.activeLink : {}) }}>
          احجز موعد
        </Link>
        <Link to="/dashboard" style={{ ...styles.link, ...(isActive('/dashboard') ? styles.activeLink : {}) }}>
          لوحة التحكم
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 3rem',
    backgroundColor: theme.colors.primary,
    borderBottom: `2px solid ${theme.colors.accent}`,
    direction: 'rtl',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: theme.shadows.md,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  logoIcon: { fontSize: '2rem' },
  logoText: {
    color: theme.colors.accent,
    fontWeight: 'bold',
    fontSize: '1.3rem',
    letterSpacing: '1px',
  },
  logoSub: {
    color: theme.colors.gray400,
    fontSize: '0.75rem',
  },
  links: { display: 'flex', gap: '0.5rem' },
  link: {
    color: theme.colors.gray400,
    textDecoration: 'none',
    fontSize: '0.95rem',
    padding: '0.5rem 1rem',
    borderRadius: theme.radius.full,
    transition: 'all 0.2s',
  },
  activeLink: {
    color: theme.colors.accent,
    backgroundColor: 'rgba(201,168,76,0.1)',
    fontWeight: 'bold',
  },
};

export default Navbar;