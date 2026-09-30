import React, { useEffect, useState } from 'react';
import { alertsApi } from '../api';
import { Bell, CheckCircle2, AlertTriangle, Info, Filter } from 'lucide-react';

const TYPE_ICONS: Record<string, string> = {
  RECRUITMENT: '📊', SAFETY: '🛡', COMPLIANCE: '⚖', DATA_QUALITY: '📁', MONITORING: '🔍'
};

const SEV_CLASS: Record<string, string> = { CRITICAL: 'critical', WARNING: 'warning', INFO: 'info' };

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [resolving, setResolving] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function fetchAlerts() {
    setLoading(true);
    try {
      const res = await alertsApi.list({ limit: 100, alert_type: typeFilter || undefined, type: typeFilter || undefined });
      const alertList = res.data?.alerts || [];
      setAlerts(alertList);
      setTotal(res.data?.total || alertList.length);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAlerts(); }, [typeFilter]);

  async function handleResolve(id: number) {
    setResolving(id);
    try {
      await alertsApi.resolve(id);
      setToast('Alert resolved successfully');
      setTimeout(() => setToast(null), 2000);
      await fetchAlerts();
    } catch (e) { }
    finally { setResolving(null); }
  }

  const types = ['', 'RECRUITMENT', 'SAFETY', 'COMPLIANCE', 'DATA_QUALITY', 'MONITORING'];

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="page-title">Alert Center</h1>
          <p className="page-description">{total} open alerts requiring attention</p>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-tabs" style={{ marginBottom: 16, width: 'fit-content' }}>
        {types.map(t => (
          <button key={t || 'all'}
            className={`filter-tab ${typeFilter === t ? 'active' : ''}`}
            onClick={() => setTypeFilter(t)}
            id={`alert-filter-${t || 'all'}`}
          >
            {t ? `${TYPE_ICONS[t] || '⚠'} ${t.replace('_', ' ')}` : 'All Alerts'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {loading ? (
          <div className="loading-screen"><div className="spinner" style={{ width: 28, height: 28 }} /></div>
        ) : alerts.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>✓</div>
            <div className="empty-state-text" style={{ fontSize: 16, color: 'var(--text-secondary)' }}>No open alerts in this category</div>
          </div>
        ) : alerts.map(alert => {
          const alertType = alert.type || alert.alert_type || 'GENERAL';
          const severity = alert.severity || 'INFO';
          return (
            <div key={alert.id} className={`alert-item ${SEV_CLASS[severity] || 'info'}`} id={`alert-${alert.id}`}>
              <div className="alert-icon" style={{
                background: severity === 'CRITICAL' ? 'rgba(239,68,68,0.15)' : severity === 'WARNING' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)',
                color: severity === 'CRITICAL' ? '#ef4444' : severity === 'WARNING' ? '#f59e0b' : '#3b82f6',
                fontSize: 18,
              }}>
                {TYPE_ICONS[alertType] || '⚠'}
              </div>
              <div className="alert-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
                  <span className="alert-title" style={{ fontWeight: 700, fontSize: 14 }}>{alert.title}</span>
                  <span className={`badge ${severity === 'CRITICAL' ? 'badge-danger' : severity === 'WARNING' ? 'badge-warning' : 'badge-info'}`}>
                    {severity}
                  </span>
                  <span className="badge badge-neutral">{alertType.replace('_', ' ')}</span>
                </div>
                <div className="alert-msg">{alert.message}</div>
                <div className="alert-meta" style={{ marginTop: 4, fontSize: 11, color: 'var(--text-muted)' }}>
                  {alert.created_at ? `Triggered ${new Date(alert.created_at).toLocaleString()}` : 'Active system alert'}
                </div>
              </div>
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleResolve(alert.id)}
                disabled={resolving === alert.id}
                id={`btn-resolve-${alert.id}`}
                style={{ flexShrink: 0 }}
              >
                {resolving === alert.id ? <div className="spinner" style={{ width: 14, height: 14 }} /> : <><CheckCircle2 size={13} /> Resolve</>}
              </button>
            </div>
          );
        })}
      </div>

      {toast && <div className="toast toast-success"><CheckCircle2 size={16} /> {toast}</div>}
    </div>
  );
}
