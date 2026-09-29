import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import {
  FlaskConical, ShieldAlert, FileCheck, ClipboardList, Link2, Users,
  MapPin, Activity, CheckCircle2, ArrowRight, ShieldCheck, Lock, Sparkles,
  Database, Server, RefreshCw, BarChart2, Cpu, Globe, Award, ChevronRight,
  Eye, Zap, FileText, CheckCircle, AlertTriangle
} from 'lucide-react';
import { MOCK_USERS } from '../mockData';

export default function LandingPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'safety' | 'compliance' | 'audit' | 'fhir'>('dashboard');
  const [simulatedTampering, setSimulatedTampering] = useState(false);

  function handleQuickLogin(email: string) {
    const matched = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    const targetUser = matched || {
      id: Math.floor(Math.random() * 1000) + 10,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      role: email.includes('admin') ? 'ADMIN' : email.includes('pi') ? 'PI' : email.includes('pv') ? 'PV_OFFICER' : 'STUDY_COORDINATOR',
      title: 'TrialSphere Member',
    };
    login(targetUser, 'demo_token_' + btoa(email + '_' + Date.now()));
    navigate('/dashboard');
  }

  return (
    <div className="landing-page" style={{ minHeight: '100vh', background: '#070d18', color: '#f0f6ff', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Dynamic Background Effects */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '15%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '35%', right: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(90px)' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '25%', width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(85px)' }} />
      </div>

      {/* Top Header / Navigation */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(7, 13, 24, 0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 28px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #10b981 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', fontWeight: 'bold', boxShadow: '0 0 15px rgba(99,102,241,0.4)'
            }}>⚗</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.3px', background: 'linear-gradient(90deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AIIA TrialSphere
              </div>
              <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                SIH 2026 • Ministry of Ayush
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>Features</a>
            <a href="#demo" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>Live Modules</a>
            <a href="#blockchain" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>Audit Blockchain</a>
            <a href="#roles" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>Role Portals</a>
          </nav>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-primary"
                style={{
                  padding: '9px 18px', borderRadius: '8px', fontWeight: 600, fontSize: '13px',
                  background: 'linear-gradient(135deg, #6366f1, #3b82f6)', border: 'none',
                  display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(99,102,241,0.35)'
                }}
              >
                Go to Dashboard <ArrowRight size={15} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '8px 16px', borderRadius: '8px', fontWeight: 500, fontSize: '13px',
                    color: '#e2e8f0', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleQuickLogin('admin@aiia.gov.in')}
                  style={{
                    padding: '9px 18px', borderRadius: '8px', fontWeight: 600, fontSize: '13px',
                    background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: '#fff',
                    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(16,185,129,0.35)'
                  }}
                >
                  Instant Demo <Zap size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px 60px', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>

        {/* Top Announcement Pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '30px',
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
          marginBottom: '28px', backdropFilter: 'blur(10px)'
        }}>
          <Sparkles size={14} color="#818cf8" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#c7d2fe', letterSpacing: '0.3px' }}>
             AIIA Clinical Trials & Pharmacovigilance Ecosystem
          </span>
          <ChevronRight size={14} color="#818cf8" />
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 900, lineHeight: 1.1,
          letterSpacing: '-1.5px', marginBottom: '24px', maxWidth: '1000px', margin: '0 auto 24px'
        }}>
          Unified Clinical Trial Management & <br />
          <span style={{
            background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #34d399 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Pharmacovigilance Platform for Ayurveda
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '17px', color: '#94a3b8', maxWidth: '780px', margin: '0 auto 36px',
          lineHeight: 1.6, fontWeight: 400
        }}>
          End-to-end multi-site trial operations for the All India Institute of Ayurveda (AIIA).
          Integrating 12-stage study lifecycle tracking, WHO-UMC pharmacovigilance causality,
          IEC/CTRI compliance, SHA-256 tamper-proof audit ledgers, and FHIR R4 interoperability.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <button
            onClick={() => handleQuickLogin('admin@aiia.gov.in')}
            style={{
              padding: '14px 32px', borderRadius: '12px', fontSize: '15px', fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)', color: '#fff', border: 'none',
              display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(99,102,241,0.4)', transition: 'transform 0.2s, boxShadow 0.2s'
            }}
          >
            Launch Live Demo Platform <ArrowRight size={18} />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('demo');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 600,
              background: 'rgba(255,255,255,0.06)', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', backdropFilter: 'blur(10px)'
            }}
          >
            <Eye size={18} color="#38bdf8" /> Explore Live Modules
          </button>
        </div>

        {/* Key Real-time Metrics Banner */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px',
          maxWidth: '1100px', margin: '0 auto', background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px',
          backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          {[
            { label: 'Active Clinical Studies', value: '50', icon: <FlaskConical size={20} color="#38bdf8" />, sub: 'Ayurvedic Formulations' },
            { label: 'Participating Research Sites', value: '20', icon: <MapPin size={20} color="#34d399" />, sub: 'Across India' },
            { label: 'De-Identified Participants', value: '1,174', icon: <Users size={20} color="#a855f7" />, sub: 'Real-time EDC Registry' },
            { label: 'Audit Chain Integrity', value: '100%', icon: <Lock size={20} color="#f59e0b" />, sub: 'SHA-256 Hash Ledger' }
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center', padding: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
                {stat.icon}
                <span style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>{stat.value}</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#cbd5e1' }}>{stat.label}</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE INTERACTIVE MODULE DEMO SHOWCASE */}
      <section id="demo" style={{ position: 'relative', zIndex: 1, padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Interactive Preview
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
            Experience the Integrated TrialSphere Suite
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', maxWidth: '600px', margin: '10px auto 0' }}>
            Click on any module tab below to preview real-time dashboards, pharmacovigilance safety flows, and regulatory audit features.
          </p>
        </div>

        {/* Module Switcher Tabs */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap',
          marginBottom: '28px'
        }}>
          {[
            { id: 'dashboard', label: 'Executive Dashboard', icon: <Activity size={16} /> },
            { id: 'safety', label: 'Pharmacovigilance (AE/SAE)', icon: <ShieldAlert size={16} /> },
            { id: 'compliance', label: 'IEC & CTRI Compliance', icon: <FileCheck size={16} /> },
            { id: 'audit', label: 'SHA-256 Audit Ledger', icon: <ClipboardList size={16} /> },
            { id: 'fhir', label: 'FHIR R4 Interoperability', icon: <Link2 size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px',
                fontSize: '13px', fontWeight: 600, border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
                background: activeTab === tab.id ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                borderColor: activeTab === tab.id ? '#6366f1' : 'rgba(255,255,255,0.08)',
                color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                boxShadow: activeTab === tab.id ? '0 0 15px rgba(99,102,241,0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Mockup Container */}
        <div style={{
          background: '#0b1322', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
          overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)'
        }}>
          {/* Mock Browser Header */}
          <div style={{
            background: '#080e1a', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '12px', fontFamily: 'monospace' }}>
                https://aiia-trialsphere.gov.in/app/{activeTab}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(16,185,129,0.3)' }}>
                ● Live Environment
              </span>
            </div>
          </div>

          {/* Tab Content Display */}
          <div style={{ padding: '32px' }}>

            {activeTab === 'dashboard' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>Executive Portfolio Overview</h3>
                    <p style={{ fontSize: '13px', color: '#94a3b8' }}>Real-time recruitment tracking & site performance</p>
                  </div>
                  <button onClick={() => handleQuickLogin('admin@aiia.gov.in')} className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px' }}>
                    Open Live Dashboard →
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  {[
                    { title: 'Total Studies', val: '50 Active', change: '+4 this month', color: '#38bdf8' },
                    { title: 'Recruitment Rate', val: '92.4%', change: 'Target 90%', color: '#34d399' },
                    { title: 'Pending SAE Reviews', val: '3 Critical', change: '< 24h deadline', color: '#ef4444' },
                    { title: 'IEC Renewal Due', val: '2 Approvals', change: 'Action required', color: '#f59e0b' }
                  ].map((card, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{card.title}</div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: card.color, margin: '6px 0 2px' }}>{card.val}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{card.change}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0', marginBottom: '16px' }}>Sample Study Progress: Ashwagandha Neuro-protection Trial (AIIA-CT-2026-01)</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>
                        <span>Target Enrollment: 150 Participants</span>
                        <span>Enrolled: 138 (92%)</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.3)', fontWeight: 600 }}>
                      On Schedule
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>Pharmacovigilance & SAE Reporting</h3>
                    <p style={{ fontSize: '13px', color: '#94a3b8' }}>WHO-UMC Causality assessment & regulatory escalation</p>
                  </div>
                  <button onClick={() => handleQuickLogin('pv@aiia.gov.in')} className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px', background: '#f59e0b', border: 'none' }}>
                    Login as PV Officer →
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { id: 'SAE-2026-089', study: 'AIIA-CT-2026-01', term: 'Mild Gastric Irritation (Amla Extract)', severity: 'SERIOUS (SAE)', status: 'UNDER_REVIEW', causality: 'PROBABLE (WHO-UMC)', deadline: 'Expires in 4 Hours' },
                    { id: 'AE-2026-104', study: 'AIIA-CT-2026-04', term: 'Transient Headache (Brahmi Vati)', severity: 'NON-SERIOUS', status: 'CLOSED', causality: 'POSSIBLE', deadline: 'Reported' }
                  ].map((ae, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: ae.severity.includes('SERIOUS') ? 'rgba(239,68,68,0.15)' : 'rgba(56,189,248,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ShieldAlert size={20} color={ae.severity.includes('SERIOUS') ? '#ef4444' : '#38bdf8'} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>{ae.term}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>{ae.id} • {ae.study} • Causality: <span style={{ color: '#fbbf24', fontWeight: 600 }}>{ae.causality}</span></div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '11px', background: ae.severity.includes('SERIOUS') ? 'rgba(239,68,68,0.15)' : 'rgba(56,189,248,0.15)', color: ae.severity.includes('SERIOUS') ? '#fca5a5' : '#7dd3fc', padding: '4px 10px', borderRadius: '6px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)' }}>
                          {ae.severity}
                        </span>
                        <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '6px', fontWeight: 600 }}>{ae.deadline}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>Ethics Committee & CTRI Registry Tracker</h3>
                    <p style={{ fontSize: '13px', color: '#94a3b8' }}>Institutional Ethics Approval & CTRI renewal lifecycle</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileCheck size={16} /> Institutional Ethics Committee (IEC)
                    </div>
                    <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px' }}>AIIA Central Ethics Committee Approval #IEC/2026/AIIA/042</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Status: <span style={{ color: '#34d399', fontWeight: 600 }}>Approved (Valid till Dec 2026)</span></div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#a855f7', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Globe size={16} /> Clinical Trials Registry - India (CTRI)
                    </div>
                    <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px' }}>Registration Ref: CTRI/2026/09/058291</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Status: <span style={{ color: '#34d399', fontWeight: 600 }}>Active & Verified</span></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>SHA-256 Cryptographic Hash Chain Audit Ledger</h3>
                    <p style={{ fontSize: '13px', color: '#94a3b8' }}>Immutable audit log for 21 CFR Part 11 electronic records</p>
                  </div>
                  <button
                    onClick={() => setSimulatedTampering(!simulatedTampering)}
                    style={{
                      padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                      background: simulatedTampering ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)',
                      border: `1px solid ${simulatedTampering ? '#ef4444' : '#10b981'}`,
                      color: simulatedTampering ? '#fca5a5' : '#6ee7b7', cursor: 'pointer'
                    }}
                  >
                    {simulatedTampering ? 'Reset Chain State' : 'Simulate Hash Tampering'}
                  </button>
                </div>

                {simulatedTampering && (
                  <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: '#fca5a5', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertTriangle size={18} color="#ef4444" />
                    <span><strong>INTEGRITY VIOLATION DETECTED:</strong> Block #104 hash mismatch! SHA-256 verification failed at record level.</span>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
                  {[
                    { block: '#105', action: 'AE_STATUS_UPDATE', user: 'pv@aiia.gov.in', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
                    { block: '#104', action: 'PARTICIPANT_ENROLLED', user: 'coord1@aiia.gov.in', hash: simulatedTampering ? 'TAMPERED_INVALID_HASH_9999' : '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92' },
                    { block: '#103', action: 'PROTOCOL_CREATED', user: 'admin@aiia.gov.in', hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a' }
                  ].map((log, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${simulatedTampering && log.block === '#104' ? '#ef4444' : 'rgba(255,255,255,0.06)'}`, borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#38bdf8', fontWeight: 700 }}>{log.block}</span>
                        <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{log.action}</span>
                        <span style={{ color: '#64748b' }}>by {log.user}</span>
                      </div>
                      <div style={{ color: simulatedTampering && log.block === '#104' ? '#ef4444' : '#34d399', fontSize: '11px' }}>
                        SHA-256: {log.hash.slice(0, 24)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'fhir' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>FHIR R4 & CDISC SDTM Data Interoperability</h3>
                    <p style={{ fontSize: '13px', color: '#94a3b8' }}>HL7 FHIR R4 Bundle export for global research integration</p>
                  </div>
                  <button onClick={() => navigate('/fhir')} className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '12px' }}>
                    Open Interoperability Studio →
                  </button>
                </div>

                <div style={{ background: '#050a14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '16px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#38bdf8', overflowX: 'auto' }}>
                  <pre style={{ margin: 0 }}>
                    {`{
  "resourceType": "Bundle",
  "type": "collection",
  "entry": [
    {
      "resource": {
        "resourceType": "ResearchStudy",
        "id": "aiia-rs-2026-01",
        "title": "Clinical Evaluation of Ashwagandha in Chronic Fatigue",
        "status": "active",
        "sponsor": { "display": "All India Institute of Ayurveda (AIIA)" }
      }
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section id="features" style={{ position: 'relative', zIndex: 1, padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Built for Ayush & Clinical Governance
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
            Comprehensive Clinical Trial & Safety Capabilities
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {[
            {
              icon: <FlaskConical size={24} color="#38bdf8" />,
              title: '12-Stage Study Lifecycle Engine',
              desc: 'From protocol creation to IEC submission, site activation, participant enrollment, database lock, and study closeout.'
            },
            {
              icon: <MapPin size={24} color="#34d399" />,
              title: 'Multi-Site Recruitment Telemetry',
              desc: 'Real-time site lag detection algorithm identifying recruitment bottlenecks across 20+ participating centers.'
            },
            {
              icon: <ShieldAlert size={24} color="#ef4444" />,
              title: 'Pharmacovigilance & WHO-UMC Algorithm',
              desc: 'Automated AE/SAE classification, causality determination, and regulatory escalation timers for Indian pharmacovigilance.'
            },
            {
              icon: <FileCheck size={24} color="#a855f7" />,
              title: 'Ethics & CTRI Compliance Hub',
              desc: 'Tracking Institutional Ethics Committee approvals, protocol amendment histories, and CTRI registry updates.'
            },
            {
              icon: <Lock size={24} color="#f59e0b" />,
              title: 'Cryptographic SHA-256 Audit Chain',
              desc: 'Tamper-proof hash chain logging every single data update with 21 CFR Part 11 compliant electronic signatures.'
            },
            {
              icon: <Link2 size={24} color="#6366f1" />,
              title: 'FHIR R4 & CDISC Interoperability',
              desc: 'Export research studies, adverse events, and de-identified patient data directly into global FHIR R4 & CDISC SDTM standards.'
            }
          ].map((feat, idx) => (
            <div key={idx} style={{
              background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', padding: '28px', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)'
            }} onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'} onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{feat.title}</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 1-CLICK ROLE ACCESS PORTALS */}
      <section id="roles" style={{ position: 'relative', zIndex: 1, padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(16,185,129,0.05))',
          border: '1px solid rgba(99,102,241,0.25)', borderRadius: '24px', padding: '48px 32px', textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            Test Role-Based Access Instantly
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', maxWidth: '640px', margin: '0 auto 36px' }}>
            Experience the system through different operational perspectives. Select any role to jump directly into the live application without password prompts.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              { label: 'Director / Admin', email: 'admin@aiia.gov.in', role: 'System Admin', color: '#6366f1' },
              { label: 'Principal Investigator', email: 'pi1@aiia.gov.in', role: 'Lead Researcher', color: '#10b981' },
              { label: 'Study Coordinator', email: 'coord1@aiia.gov.in', role: 'Site Manager', color: '#38bdf8' },
              { label: 'PV / Safety Officer', email: 'pv@aiia.gov.in', role: 'Safety Evaluator', color: '#f59e0b' }
            ].map((role, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickLogin(role.email)}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)', border: `1px solid ${role.color}40`,
                  borderRadius: '16px', padding: '20px', textAlign: 'left', cursor: 'pointer',
                  transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = role.color;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = `${role.color}40`;
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{role.label}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>{role.email}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: `${role.color}20`, color: role.color }}>
                    {role.role}
                  </span>
                  <ArrowRight size={14} color={role.color} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.08)',
        background: '#050912', padding: '40px 28px', textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366f1, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>⚗</div>
            <span style={{ fontWeight: 800, fontSize: '16px', color: '#fff' }}>AIIA TrialSphere</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '600px', margin: 0 }}>
            All India Institute of Ayurveda (AIIA) • Smart India Hackathon (SIH) 2026 Submission.
            Designed for GCP, ICMR guidelines, US FDA 21 CFR Part 11, and CTRI regulatory standards.
          </p>
          <div style={{ fontSize: '12px', color: '#475569', marginTop: '12px' }}>
            © 2026 AIIA TrialSphere. Synthetic demonstration environment.
          </div>
        </div>
      </footer>

    </div>
  );
}
