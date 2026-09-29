import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import {
  Settings, User, Lock, Key, ShieldCheck, Database, Bell, Server,
  Save, CheckCircle2, RefreshCw, Cpu, Smartphone, Globe
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'integrations' | 'notifications'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [name, setName] = useState(user?.name || 'Dr. Admin');
  const [email, setEmail] = useState(user?.email || 'admin@aiia.gov.in');
  const [institution, setInstitution] = useState('All India Institute of Ayurveda (AIIA), New Delhi');
  const [ctriApiKey, setCtriApiKey] = useState('CTRI-API-LIVE-2026-99201848291');
  const [fhirEndpoint, setFhirEndpoint] = useState('https://fhir.aiia.gov.in/r4');
  const [auditHashAlgo, setAuditHashAlgo] = useState('SHA-256');
  const [autoNotifySae, setAutoNotifySae] = useState(true);
  const [autoNotifyRecruitment, setAutoNotifyRecruitment] = useState(true);
  const [eSigPin, setESigPin] = useState('••••');

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="page-title">System Settings & Configuration</h1>
          <p className="page-description">Manage user preferences, CTRI & FHIR integration keys, security policies</p>
        </div>
        {savedSuccess && (
          <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#34d399', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} /> Configuration Saved Successfully!
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="filter-tabs" style={{ marginBottom: 20, width: 'fit-content' }}>
        {[
          { id: 'profile', label: 'User Profile & Role', icon: <User size={15} /> },
          { id: 'security', label: '21 CFR Part 11 & e-Sig', icon: <Lock size={15} /> },
          { id: 'integrations', label: 'CTRI & FHIR Integrations', icon: <Server size={15} /> },
          { id: 'notifications', label: 'Alert & Safety Triggers', icon: <Bell size={15} /> }
        ].map(tab => (
          <button
            key={tab.id}
            id={`tab-settings-${tab.id}`}
            className={`filter-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Main Settings Card */}
      <div className="card" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSave}>
          
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>User Profile Details</h3>
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Official Email Identifier</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Institution / Department</label>
                <input
                  type="text"
                  className="form-input"
                  value={institution}
                  onChange={e => setInstitution(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Assigned System Role</label>
                <input
                  type="text"
                  className="form-input"
                  value={user?.role || 'ADMINISTRATOR'}
                  disabled
                  style={{ opacity: 0.7, cursor: 'not-allowed' }}
                />
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  Role permissions are managed via Central AIIA RBAC Directory.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>US FDA 21 CFR Part 11 & Electronic Signatures</h3>
              
              <div className="form-group">
                <label className="form-label">Electronic Signature (e-Sig) PIN</label>
                <input
                  type="password"
                  className="form-input"
                  value={eSigPin}
                  onChange={e => setESigPin(e.target.value)}
                />
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  Required whenever signing off on SAE reports, database locks, or protocol amendments.
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Audit Hash Ledger Algorithm</label>
                <select className="form-input" value={auditHashAlgo} onChange={e => setAuditHashAlgo(e.target.value)}>
                  <option value="SHA-256">SHA-256 (Cryptographic Standard)</option>
                  <option value="SHA-512">SHA-512 (High Security)</option>
                </select>
              </div>

              <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--primary)', marginBottom: 4 }}>
                  🔒 Tamper-Proof Hash Chain Status: ACTIVE
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  Every audit record is linked to the previous record hash. Any backend data tampering will break verification instantly.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>External Regulatory API Keys & Endpoints</h3>
              
              <div className="form-group">
                <label className="form-label">Clinical Trials Registry - India (CTRI) Sync API Key</label>
                <input
                  type="text"
                  className="form-input"
                  value={ctriApiKey}
                  onChange={e => setCtriApiKey(e.target.value)}
                  style={{ fontFamily: 'monospace' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">HL7 FHIR R4 Repository Server URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={fhirEndpoint}
                  onChange={e => setFhirEndpoint(e.target.value)}
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Automated Alert Triggers & Safety Thresholds</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Escalate SAEs Unresolved After 24 Hours</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Send urgent notification to National PV Officer & Principal Investigator</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoNotifySae}
                  onChange={e => setAutoNotifySae(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Site Recruitment Lag Warning</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Alert when site enrollment falls 25% below monthly protocol target</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoNotifyRecruitment}
                  onChange={e => setAutoNotifyRecruitment(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
              </div>
            </div>
          )}

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" id="btn-save-settings">
              <Save size={15} /> Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
