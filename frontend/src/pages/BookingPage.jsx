import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { theme } from '../styles/theme';

function BookingPage() {
  const [form, setForm] = useState({
    customer_name: '', phone: '', car_type: '',
    service_type: 'oil_change', appointment_date: '',
    appointment_time: '', notes: '',
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/appointments', form);
      setMessage({ type: 'success', text: '✅ تم حجز موعدك بنجاح! سنتواصل معك قريباً.' });
      setForm({ customer_name: '', phone: '', car_type: '', service_type: 'oil_change', appointment_date: '', appointment_time: '', notes: '' });
    } catch  {
      setMessage({ type: 'error', text: '❌ حدث خطأ، يرجى المحاولة مرة أخرى.' });
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>احجز موعدك</h2>
          <p style={styles.subtitle}>أدخل بياناتك وسنتواصل معك لتأكيد الموعد</p>
        </div>

        {message && (
          <div style={{
            ...styles.alert,
            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>الاسم الكامل</label>
              <input style={styles.input} name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="محمد العلي" required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>رقم الجوال</label>
              <input style={styles.input} name="phone" value={form.phone} onChange={handleChange} placeholder="05XXXXXXXX" required />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>نوع السيارة</label>
              <input style={styles.input} name="car_type" value={form.car_type} onChange={handleChange} placeholder="تويوتا كامري 2022" required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>نوع الخدمة</label>
              <select style={styles.input} name="service_type" value={form.service_type} onChange={handleChange}>
                <option value="oil_change">🛢️ تغيير زيت</option>
                <option value="filter_change">🔩 تغيير فلتر</option>
                <option value="full_service">⚙️ صيانة شاملة</option>
              </select>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>التاريخ</label>
              <input style={styles.input} type="date" name="appointment_date" value={form.appointment_date} onChange={handleChange} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>الوقت</label>
              <input style={styles.input} type="time" name="appointment_time" value={form.appointment_time} onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>ملاحظات إضافية (اختياري)</label>
            <textarea style={{ ...styles.input, height: '90px', resize: 'vertical' }} name="notes" value={form.notes} onChange={handleChange} placeholder="أي معلومات إضافية تود إضافتها..." />
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? '⏳ جاري الحجز...' : '🗓️ احجز الآن'}
          </button>
        </form>

        <p style={styles.backLink}>
          <Link to="/" style={{ color: theme.colors.accent }}>← العودة للرئيسية</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { backgroundColor: theme.colors.gray100, minHeight: '100vh', padding: '3rem 1rem', direction: 'rtl' },
  container: { maxWidth: '680px', margin: '0 auto', backgroundColor: theme.colors.white, borderRadius: theme.radius.lg, boxShadow: theme.shadows.lg, overflow: 'hidden' },
  header: { backgroundColor: theme.colors.primary, padding: '2.5rem 2rem', textAlign: 'center', borderBottom: `3px solid ${theme.colors.accent}` },
  title: { color: theme.colors.white, fontSize: '1.8rem', fontWeight: 'bold', margin: 0 },
  subtitle: { color: theme.colors.gray400, marginTop: '0.5rem', fontSize: '0.95rem' },
  alert: { margin: '1.5rem 2rem 0', padding: '1rem', borderRadius: theme.radius.md, textAlign: 'center', fontWeight: 'bold' },
  form: { padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  row: { display: 'flex', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', flex: 1, gap: '0.4rem' },
  label: { fontWeight: 'bold', color: theme.colors.gray800, fontSize: '0.9rem' },
  input: { padding: '0.75rem 1rem', borderRadius: theme.radius.sm, border: `1px solid ${theme.colors.gray200}`, fontSize: '1rem', fontFamily: 'inherit', outline: 'none', backgroundColor: theme.colors.gray100 },
  submitBtn: { padding: '1rem', backgroundColor: theme.colors.accent, color: theme.colors.primary, border: 'none', borderRadius: theme.radius.md, fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: theme.shadows.gold, marginTop: '0.5rem' },
  backLink: { textAlign: 'center', padding: '1rem', fontSize: '0.9rem' },
};

export default BookingPage;