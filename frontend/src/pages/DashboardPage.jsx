import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { theme } from '../styles/theme';

const STATUS_LABELS = {
  pending:   { label: 'قيد الانتظار', color: '#fff3cd', textColor: '#856404' },
  confirmed: { label: 'مؤكد',         color: '#d4edda', textColor: '#155724' },
  cancelled: { label: 'ملغي',         color: '#f8d7da', textColor: '#721c24' },
};

const SERVICE_LABELS = {
  oil_change:    '🛢️ تغيير زيت',
  filter_change: '🔩 تغيير فلتر',
  full_service:  '⚙️ صيانة شاملة',
};

function DashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filter, setFilter]             = useState('all');

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await api.get('/appointments');
      setAppointments(res.data.data);
    } catch {
      console.error('خطأ في جلب المواعيد');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      fetchAppointments();
    } catch {
      console.error('خطأ في تحديث الحالة');
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الموعد؟')) return;
    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch {
      console.error('خطأ في الحذف');
    }
  };

  const filtered = filter === 'all'
    ? appointments
    : appointments.filter((a) => a.status === filter);

  if (loading) return <div style={styles.center}>⏳ جاري التحميل...</div>;

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>لوحة التحكم</h2>
          <p style={styles.subtitle}>إجمالي المواعيد: {appointments.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        {[
          { key: 'all',       label: 'الكل' },
          { key: 'pending',   label: 'قيد الانتظار' },
          { key: 'confirmed', label: 'مؤكدة' },
          { key: 'cancelled', label: 'ملغية' },
        ].map((f) => (
          <button
            key={f.key}
            style={{ ...styles.filterBtn, ...(filter === f.key ? styles.filterActive : {}) }}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span style={styles.filterCount}>
              {f.key === 'all' ? appointments.length : appointments.filter(a => a.status === f.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <div style={styles.container}>
        {filtered.length === 0 ? (
          <div style={styles.empty}>📭 لا توجد مواعيد في هذا التصنيف</div>
        ) : (
          filtered.map((apt) => (
            <div key={apt.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div style={styles.cardRight}>
                  <span style={styles.customerName}>{apt.customer_name}</span>
                  <span style={styles.carType}>🚗 {apt.car_type}</span>
                </div>
                <span style={{
                  ...styles.badge,
                  backgroundColor: STATUS_LABELS[apt.status].color,
                  color: STATUS_LABELS[apt.status].textColor,
                }}>
                  {STATUS_LABELS[apt.status].label}
                </span>
              </div>

              <div style={styles.infoGrid}>
                <span>📱 {apt.phone}</span>
                <span>{SERVICE_LABELS[apt.service_type]}</span>
                <span>📅 {apt.appointment_date}</span>
                <span>🕐 {apt.appointment_time}</span>
                {apt.notes && <span style={styles.notes}>📝 {apt.notes}</span>}
              </div>

              <div style={styles.actions}>
                <button
                  style={{ ...styles.btn, ...styles.btnConfirm }}
                  onClick={() => updateStatus(apt.id, 'confirmed')}
                  disabled={apt.status === 'confirmed'}
                >
                  ✅ تأكيد
                </button>
                <button
                  style={{ ...styles.btn, ...styles.btnCancel }}
                  onClick={() => updateStatus(apt.id, 'cancelled')}
                  disabled={apt.status === 'cancelled'}
                >
                  ⏸ إلغاء
                </button>
                <button
                  style={{ ...styles.btn, ...styles.btnDelete }}
                  onClick={() => deleteAppointment(apt.id)}
                >
                  🗑️ حذف
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page:        { backgroundColor: theme.colors.gray100, minHeight: '100vh', direction: 'rtl' },
  header:      { backgroundColor: theme.colors.primary, borderBottom: `3px solid ${theme.colors.accent}`, padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title:       { color: theme.colors.white, fontSize: '1.8rem', fontWeight: 'bold', margin: 0 },
  subtitle:    { color: theme.colors.gray400, marginTop: '0.3rem', fontSize: '0.95rem' },
  filters:     { display: 'flex', gap: '0.8rem', padding: '1.5rem 3rem', backgroundColor: theme.colors.white, boxShadow: theme.shadows.sm, flexWrap: 'wrap' },
  filterBtn:   { padding: '0.5rem 1.2rem', border: `1px solid ${theme.colors.gray200}`, borderRadius: theme.radius.full, backgroundColor: 'transparent', cursor: 'pointer', fontSize: '0.9rem', color: theme.colors.gray600, display: 'flex', alignItems: 'center', gap: '0.5rem' },
  filterActive:{ backgroundColor: theme.colors.primary, color: theme.colors.white, borderColor: theme.colors.primary, fontWeight: 'bold' },
  filterCount: { backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.1rem 0.5rem', borderRadius: '20px', fontSize: '0.8rem' },
  container:   { maxWidth: '900px', margin: '2rem auto', padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
  card:        { backgroundColor: theme.colors.white, borderRadius: theme.radius.md, padding: '1.5rem', boxShadow: theme.shadows.sm, border: `1px solid ${theme.colors.gray200}` },
  cardTop:     { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' },
  cardRight:   { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  customerName:{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.colors.primary },
  carType:     { color: theme.colors.gray600, fontSize: '0.9rem' },
  badge:       { padding: '0.3rem 1rem', borderRadius: theme.radius.full, fontSize: '0.85rem', fontWeight: 'bold', whiteSpace: 'nowrap' },
  infoGrid:    { display: 'flex', flexWrap: 'wrap', gap: '0.8rem', color: theme.colors.gray600, fontSize: '0.95rem', marginBottom: '1.2rem', padding: '1rem', backgroundColor: theme.colors.gray100, borderRadius: theme.radius.sm },
  notes:       { width: '100%', color: theme.colors.gray800 },
  actions:     { display: 'flex', gap: '0.8rem', flexWrap: 'wrap' },
  btn:         { padding: '0.5rem 1.2rem', border: 'none', borderRadius: theme.radius.sm, cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' },
  btnConfirm:  { backgroundColor: '#d4edda', color: '#155724' },
  btnCancel:   { backgroundColor: '#fff3cd', color: '#856404' },
  btnDelete:   { backgroundColor: '#f8d7da', color: '#721c24', marginRight: 'auto' },
  empty:       { textAlign: 'center', padding: '4rem', color: theme.colors.gray400, fontSize: '1.1rem' },
  center:      { textAlign: 'center', padding: '5rem', color: theme.colors.gray600, fontSize: '1.1rem' },
};

export default DashboardPage;