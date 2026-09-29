import React, { useState } from 'react';
import { Database, AlertTriangle, CheckCircle2, RefreshCw, Filter, Search, Plus, MessageSquare } from 'lucide-react';

export default function DataQualityPage() {
  const [runningScan, setRunningScan] = useState(false);
  const [scanTime, setScanTime] = useState(new Date().toLocaleTimeString());
  const [activeFilter, setActiveFilter] = useState('');

  const [queries, setQueries] = useState([
    { id: 'DQ-101', study: 'AIIA-CT-2026-01', site: 'AIIA Delhi Central', participant: 'DEL-P-042', field: 'Baseline Prakriti Assessment', issue: 'Missing Vata-Pitta classification score', severity: 'HIGH', status: 'OPEN', assigned: 'coord1@aiia.gov.in' },
    { id: 'DQ-102', study: 'AIIA-CT-2026-03', site: 'NIA Jaipur', participant: 'JPR-P-112', field: 'Systolic Blood Pressure (V2)', issue: 'Out of range value (195 mmHg) requires PI signoff', severity: 'CRITICAL', status: 'OPEN', assigned: 'pi1@aiia.gov.in' },
    { id: 'DQ-103', study: 'AIIA-CT-2026-02', site: 'IPGT&RA Jamnagar', participant: 'JAM-P-088', field: 'Visit 3 Follow-up Window', issue: 'Visit completed 9 days outside protocol window', severity: 'MEDIUM', status: 'RESOLVED', assigned: 'coord2@aiia.gov.in' },
    { id: 'DQ-104', study: 'AIIA-CT-2026-05', site: 'AIIA Goa Center', participant: 'GOA-P-019', field: 'Concomitant Medication Name', issue: 'Uncoded drug term "Ayush KW-68"', severity: 'LOW', status: 'CLOSED', assigned: 'data_mgr@aiia.gov.in' }
  ]);

  function handleRunScan() {
    setRunningScan(true);
    setTimeout(() => {
      setRunningScan(false);
      setScanTime(new Date().toLocaleTimeString());
    }, 1200);
  }

  function handleResolveQuery(id: string) {
    setQueries(prev => prev.map(q => q.id === id ? { ...q, status: 'RESOLVED' } : q));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Data Quality & Validation Engine</h1>
          <p className="page-description">Automated clinical data validation, discrepancy detection & query resolution</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleRunScan}
          disabled={runningScan}
          id="btn-run-dq-scan"
        >
          {runningScan ? <div className="spinner" style={{ width: 14, height: 14 }} /> : <RefreshCw size={14} />}
          {runningScan ? 'Scanning Data...' : 'Run Data Validation Rules'}
        </button>
      </div>

      {/* Overview Cards */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="kpi-card" style={{ '--accent-color': '#10b981' } as any}>
          <div className="kpi-icon" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
            <CheckCircle2 size={20} />
          </div>
          <div className="kpi-value" style={{ color: '#10b981' }}>96.8%</div>
          <div className="kpi-label">Overall Cleanliness Score</div>
          <div className="kpi-trend up">High data integrity</div>
        </div>

        <div className="kpi-card" style={{ '--accent-color': '#f59e0b' } as any}>
          <div className="kpi-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>
            <AlertTriangle size={20} />
          </div>
          <div className="kpi-value" style={{ color: '#f59e0b' }}>{queries.filter(q => q.status === 'OPEN').length}</div>
          <div className="kpi-label">Open Clinical Queries</div>
          <div className="kpi-trend down">Requires resolution</div>
        </div>

        <div className="kpi-card" style={{ '--accent-color': '#3b82f6' } as any}>
          <div className="kpi-icon" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>
            <Database size={20} />
          </div>
          <div className="kpi-value" style={{ color: '#3b82f6' }}>14,890</div>
          <div className="kpi-label">EDC Fields Validated</div>
          <div className="kpi-trend up">Last scan: {scanTime}</div>
        </div>

        <div className="kpi-card" style={{ '--accent-color': '#8b5cf6' } as any}>
          <div className="kpi-icon" style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6' }}>
            <CheckCircle2 size={20} />
          </div>
          <div className="kpi-value" style={{ color: '#8b5cf6' }}>24h</div>
          <div className="kpi-label">Avg Query Resolution Time</div>
          <div className="kpi-trend up">Within target SLA</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs" style={{ marginBottom: 16, width: 'fit-content' }}>
        {['', 'OPEN', 'RESOLVED', 'CLOSED'].map(st => (
          <button
            key={st || 'all'}
            className={`filter-tab ${activeFilter === st ? 'active' : ''}`}
            onClick={() => setActiveFilter(st)}
            id={`filter-dq-${st || 'all'}`}
          >
            {st || 'All Queries'}
          </button>
        ))}
      </div>

      {/* Data Queries Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Query ID</th>
              <th>Study & Site</th>
              <th>Participant</th>
              <th>Field / Variable</th>
              <th>Discrepancy Details</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {queries.filter(q => !activeFilter || q.status === activeFilter).map(q => (
              <tr key={q.id}>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  {q.id}
                </td>
                <td>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{q.study}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{q.site}</div>
                </td>
                <td style={{ fontSize: 12, fontFamily: 'monospace' }}>{q.participant}</td>
                <td style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{q.field}</td>
                <td style={{ fontSize: 12, maxWidth: 260 }}>{q.issue}</td>
                <td>
                  <span className={`badge ${q.severity === 'CRITICAL' ? 'badge-danger' : q.severity === 'HIGH' ? 'badge-warning' : 'badge-info'}`}>
                    {q.severity}
                  </span>
                </td>
                <td>
                  <span className={`badge ${q.status === 'OPEN' ? 'badge-warning' : q.status === 'RESOLVED' ? 'badge-success' : 'badge-neutral'}`}>
                    {q.status}
                  </span>
                </td>
                <td>
                  {q.status === 'OPEN' ? (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleResolveQuery(q.id)}
                      id={`btn-resolve-${q.id}`}
                      style={{ fontSize: 11, padding: '4px 10px' }}
                    >
                      Resolve Query
                    </button>
                  ) : (
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Verified</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
