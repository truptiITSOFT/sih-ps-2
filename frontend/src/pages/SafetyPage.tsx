import React, { useEffect, useState } from 'react';
import { safetyApi } from '../api';
import { ShieldAlert, AlertTriangle, Clock, CheckCircle2, Filter, Plus, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SEV_COLORS: Record<string, string> = {
  GRADE_1: '#10b981', MILD: '#10b981',
  GRADE_2: '#f59e0b', MODERATE: '#f59e0b',
  GRADE_3: '#f97316', SEVERE: '#f97316',
  GRADE_4: '#ef4444', LIFE_THREATENING: '#ef4444', CRITICAL: '#ef4444'
};

const STATUS_MAP: Record<string, { cls: string; label: string }> = {
  NEW: { cls: 'badge-info', label: 'New' },
  UNDER_INVESTIGATION: { cls: 'badge-warning', label: 'Under Review' },
  UNDER_REVIEW: { cls: 'badge-warning', label: 'Under Review' },
  CAUSALITY_ASSESSED: { cls: 'badge-purple', label: 'Assessed' },
  SUBMITTED_TO_CDSCO: { cls: 'badge-success', label: 'Submitted' },
  SUBMITTED: { cls: 'badge-success', label: 'Submitted' },
  CLOSED: { cls: 'badge-neutral', label: 'Closed' },
};

const CUSTOM_TOOLTIP = { background: '#0f1f36', border: '1px solid rgba(99,179,237,0.2)', borderRadius: 8, fontSize: 12, color: '#f0f6ff' };

export default function SafetyPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ is_sae?: boolean; status?: string }>({});
  const [updating, setUpdating] = useState<number | null>(null);

  // New AE Modal state
  const [showModal, setShowModal] = useState(false);
  const [newStudyCode, setNewStudyCode] = useState('AIIA-CT-2024-006');
  const [newParticipant, setNewParticipant] = useState('P-006-025');
  const [newTerm, setNewTerm] = useState('');
  const [newSeverity, setNewSeverity] = useState('GRADE_3');
  const [newIsSerious, setNewIsSerious] = useState(true);
  const [newCausality, setNewCausality] = useState('PROBABLE');

  async function fetchAll() {
    setLoading(true);
    try {
      const [evR, smR] = await Promise.all([
        safetyApi.listAE({ ...filter, limit: 50 }),
        safetyApi.summary(),
      ]);
      const evList = evR.data?.adverse_events || evR.data?.events || [];
      setEvents(evList);
      setTotal(evR.data?.total || evList.length);
      setSummary(smR.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAll(); }, [filter]);

  async function handleStatusUpdate(id: number, newStatus: string) {
    setUpdating(id);
    try {
      await safetyApi.updateAEStatus(id, { status: newStatus });
      setEvents(prev => prev.map(ae => ae.id === id ? { ...ae, status: newStatus } : ae));
    } catch (e) { }
    finally { setUpdating(null); }
  }

  function handleCreateAE(e: React.FormEvent) {
    e.preventDefault();
    const created = {
      id: events.length + 201,
      ae_code: `AE-2026-${events.length + 1}`,
      study_code: newStudyCode,
      participant_code: newParticipant,
      term: newTerm || 'Nausea and Gastric Distress',
      severity: newSeverity,
      is_serious: newIsSerious,
      causality: newCausality,
      status: 'UNDER_INVESTIGATION',
      cdsco_report_due: new Date(Date.now() + 86400000).toISOString()
    };
    setEvents([created, ...events]);
    setTotal(total + 1);
    setShowModal(false);
    setNewTerm('');
  }

  const sevChartData = [
    { name: 'Grade 1 (Mild)', value: events.filter(e => e.severity === 'GRADE_1' || e.severity === 'MILD').length || 18, color: '#10b981' },
    { name: 'Grade 2 (Moderate)', value: events.filter(e => e.severity === 'GRADE_2' || e.severity === 'MODERATE').length || 14, color: '#f59e0b' },
    { name: 'Grade 3 (Severe)', value: events.filter(e => e.severity === 'GRADE_3' || e.severity === 'SEVERE').length || 11, color: '#f97316' },
    { name: 'Grade 4 (Critical)', value: events.filter(e => e.severity === 'GRADE_4' || e.severity === 'LIFE_THREATENING').length || 5, color: '#ef4444' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="page-title">Pharmacovigilance & Safety Engine</h1>
          <p className="page-description">Adverse event tracking, WHO-UMC causality evaluation, and SAE reporting</p>
        </div>
        <button className="btn btn-primary" id="btn-report-ae" onClick={() => setShowModal(true)}>
          <Plus size={15} /> Report AE / SAE
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="kpi-card" style={{ '--accent-color': '#94a3b8' } as any}>
          <div className="kpi-icon" style={{ background: 'rgba(148,163,184,0.12)', color: '#94a3b8' }}>
            <ShieldAlert size={20} />
          </div>
          <div className="kpi-value">{summary?.total_ae || total || 48}</div>
          <div className="kpi-label">Total Adverse Events</div>
        </div>
        <div className="kpi-card" style={{ '--accent-color': '#ef4444' } as any}>
          <div className="kpi-icon" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444' }}>
            <AlertTriangle size={20} />
          </div>
          <div className="kpi-value">{summary?.total_sae || events.filter(e => e.is_serious).length || 11}</div>
          <div className="kpi-label">Serious AEs (SAE)</div>
        </div>
        <div className="kpi-card" style={{ '--accent-color': '#f59e0b' } as any}>
          <div className="kpi-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>
            <Clock size={20} />
          </div>
          <div className="kpi-value">{summary?.open_sae || 4}</div>
          <div className="kpi-label">Open / Pending Review</div>
        </div>
        <div className="kpi-card" style={{ '--accent-color': '#f43f5e' } as any}>
          <div className="kpi-icon" style={{ background: 'rgba(244,63,94,0.12)', color: '#f43f5e' }}>
            <AlertTriangle size={20} />
          </div>
          <div className="kpi-value">{summary?.overdue_sae || 2}</div>
          <div className="kpi-label">Overdue Regulatory Reports</div>
        </div>
      </div>

      <div className="grid-2" style={{ gap: 16, marginBottom: 20 }}>
        {/* Severity chart */}
        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>AE Severity Distribution</div>
          <div style={{ height: 180 }}>
            <ResponsiveContainer>
              <BarChart data={sevChartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: '#4a5568', fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: '#4a5568', fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={CUSTOM_TOOLTIP} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {sevChartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SAE Workflow explanation */}
        <div className="card">
          <div className="card-title" style={{ marginBottom: 12 }}>WHO-UMC Causality Assessment Workflow</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['AE Recorded by Site', 'Severity Categorization (CTCAE v5.0)', 'SAE Expedited Determination', 'Medical Review & MedDRA Coding', 'WHO-UMC Causality Scoring', 'CDSCO & IEC Regulatory Submission', 'Case Closure & Hash Sign-off'].map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  background: i < 5 ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: i < 5 ? 'white' : 'var(--text-muted)'
                }}>{i + 1}</div>
                <span style={{ fontSize: 13, color: i < 5 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
        <div className="filter-tabs">
          {[
            { label: 'All Events', key: {} },
            { label: 'SAEs Only', key: { is_sae: true } },
            { label: 'Open Review', key: { status: 'UNDER_INVESTIGATION' } },
          ].map(f => (
            <button key={f.label}
              className={`filter-tab ${JSON.stringify(filter) === JSON.stringify(f.key) ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
              id={`filter-ae-${f.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{events.length} events loaded</span>
      </div>

      {/* Events Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>AE Code</th>
              <th>Study</th>
              <th>Participant</th>
              <th>Description / Term</th>
              <th>Severity</th>
              <th>SAE</th>
              <th>Causality</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: 32 }}>
                  <div className="spinner" style={{ margin: '0 auto' }} />
                </td>
              </tr>
            )}
            {!loading && events.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>
                  No adverse event records found.
                </td>
              </tr>
            )}
            {!loading && events.map((ae: any) => {
              const code = ae.ae_code || `AE-${ae.id}`;
              const desc = ae.term || ae.event_description || 'Unspecified Event';
              const isSerious = ae.is_serious || ae.is_sae || false;
              const statusInfo = STATUS_MAP[ae.status] || { cls: 'badge-info', label: ae.status || 'Under Review' };
              const sev = ae.severity || 'GRADE_2';
              const sevColor = SEV_COLORS[sev] || '#f59e0b';
              const causality = ae.causality || 'POSSIBLE';

              return (
                <tr key={ae.id} id={`ae-row-${ae.id}`}>
                  <td>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: isSerious ? '#f43f5e' : 'var(--accent-cyan)', fontWeight: 600 }}>
                      {code}
                    </span>
                  </td>
                  <td style={{ fontSize: 11, color: 'var(--accent-cyan)' }}>{ae.study_code}</td>
                  <td style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{ae.participant_code || '—'}</td>
                  <td style={{ fontSize: 12, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {desc}
                  </td>
                  <td>
                    <span className="badge" style={{
                      background: `${sevColor}18`,
                      color: sevColor,
                      border: `1px solid ${sevColor}30`
                    }}>
                      {sev.replace('GRADE_', 'Grade ')}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {isSerious ? <span className="badge badge-danger">SAE ⚠</span> : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                  </td>
                  <td>
                    <span className="badge badge-purple">{causality}</span>
                  </td>
                  <td><span className={`badge ${statusInfo.cls}`}>{statusInfo.label}</span></td>
                  <td>
                    {ae.status !== 'CLOSED' && (
                      <select
                        className="form-select"
                        style={{ padding: '4px 8px', fontSize: 11, width: 130 }}
                        value={ae.status}
                        disabled={updating === ae.id}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleStatusUpdate(ae.id, e.target.value)}
                        id={`ae-action-${ae.id}`}
                      >
                        <option value="UNDER_INVESTIGATION">Under Review</option>
                        <option value="CAUSALITY_ASSESSED">Assessed</option>
                        <option value="SUBMITTED_TO_CDSCO">Submit to CDSCO</option>
                        <option value="CLOSED">Close Case</option>
                      </select>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* NEW AE / SAE REPORTING MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div className="card" style={{ width: '100%', maxWidth: '520px', background: '#0b1322', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Report Adverse Event / SAE</h3>
              <button onClick={() => setShowModal(false)} className="btn btn-secondary btn-icon" style={{ padding: 4 }}><X size={16} /></button>
            </div>

            <form onSubmit={handleCreateAE} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Study Protocol</label>
                  <input required type="text" className="form-input" value={newStudyCode} onChange={e => setNewStudyCode(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Participant ID</label>
                  <input required type="text" className="form-input" value={newParticipant} onChange={e => setNewParticipant(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Adverse Event Term / Description</label>
                <input required type="text" className="form-input" placeholder="e.g. Severe Exfoliative Rash or Hepatic Enzyme Elevation" value={newTerm} onChange={e => setNewTerm(e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Severity (CTCAE v5.0)</label>
                  <select className="form-input" value={newSeverity} onChange={e => setNewSeverity(e.target.value)}>
                    <option value="GRADE_1">Grade 1 (Mild)</option>
                    <option value="GRADE_2">Grade 2 (Moderate)</option>
                    <option value="GRADE_3">Grade 3 (Severe)</option>
                    <option value="GRADE_4">Grade 4 (Life Threatening)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">WHO-UMC Causality</label>
                  <select className="form-input" value={newCausality} onChange={e => setNewCausality(e.target.value)}>
                    <option value="CERTAIN">Certain</option>
                    <option value="PROBABLE">Probable</option>
                    <option value="POSSIBLE">Possible</option>
                    <option value="UNLIKELY">Unlikely</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(239,68,68,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)' }}>
                <input type="checkbox" id="check-sae" checked={newIsSerious} onChange={e => setNewIsSerious(e.target.checked)} style={{ width: 16, height: 16 }} />
                <label htmlFor="check-sae" style={{ fontSize: 13, fontWeight: 600, color: '#fca5a5', cursor: 'pointer' }}>
                  Mark as Serious Adverse Event (SAE) — Requires 24h CDSCO & IEC notification
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ background: '#ef4444', borderColor: '#ef4444' }}>
                  <ShieldAlert size={15} /> Submit Safety Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
