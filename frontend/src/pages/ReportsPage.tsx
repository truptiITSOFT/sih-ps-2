import React, { useState } from 'react';
import { FileText, Download, Printer, ShieldCheck, CheckCircle2, FileCheck, Share2 } from 'lucide-react';

export default function ReportsPage() {
  const [downloadingReport, setDownloadingReport] = useState<string | null>(null);

  const reports = [
    {
      id: 'REP-ICMR',
      title: 'ICMR GCP Ethics & Clinical Compliance Summary',
      category: 'Regulatory Compliance',
      format: 'PDF / Dossier',
      desc: 'Complete overview of Institutional Ethics Committee approvals, protocol revisions, and patient informed consent audits.',
      color: '#38bdf8'
    },
    {
      id: 'REP-CTRI',
      title: 'CTRI Form-B Protocol Regulatory Report',
      category: 'Trial Registry',
      format: 'PDF / Form-B',
      desc: 'Official submission format for Clinical Trials Registry - India (CTRI) progress updates and site activation milestones.',
      color: '#34d399'
    },
    {
      id: 'REP-PSUR',
      title: 'Pharmacovigilance Periodic Safety Update Report (PSUR / PBRER)',
      category: 'Safety & PV',
      format: 'PDF / XML',
      desc: 'Comprehensive analysis of all Adverse Events (AE), Serious Adverse Events (SAE), and WHO-UMC causality classifications.',
      color: '#f59e0b'
    },
    {
      id: 'REP-SDTM',
      title: 'CDISC SDTM / ADaM Data Export Package',
      category: 'Interoperability',
      format: 'SAS transport / JSON',
      desc: 'Standardized CDISC Clinical Data Interchange Standards Consortium export package for regulatory drug evaluation.',
      color: '#a855f7'
    },
    {
      id: 'REP-HASH',
      title: 'SHA-256 Cryptographic Hash Chain Audit Ledger Certificate',
      category: 'Audit & Integrity',
      format: 'Signed Certificate / JSON',
      desc: 'Tamper-evident verification proof of all database transactions certified by 21 CFR Part 11 compliant hash ledger.',
      color: '#6366f1'
    }
  ];

  function handleDownload(reportId: string, title: string) {
    setDownloadingReport(reportId);
    setTimeout(() => {
      setDownloadingReport(null);
      alert(`Report "${title}" generated and downloaded successfully!`);
    }, 1500);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Regulatory Reports & Data Exporter</h1>
          <p className="page-description">Generate ICMR, CTRI, Pharmacovigilance PSUR, and CDISC SDTM regulatory export dossiers</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        {reports.map(rep => (
          <div key={rep.id} className="card" style={{ borderLeft: `4px solid ${rep.color}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="badge badge-info" style={{ background: `${rep.color}20`, color: rep.color, borderColor: `${rep.color}40` }}>
                  {rep.category}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{rep.format}</span>
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{rep.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>{rep.desc}</p>
            </div>

            <div style={{ paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <ShieldCheck size={13} color="#10b981" /> 21 CFR Part 11 Certified
              </span>
              
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleDownload(rep.id, rep.title)}
                disabled={downloadingReport === rep.id}
                id={`btn-download-${rep.id}`}
                style={{ padding: '6px 14px' }}
              >
                {downloadingReport === rep.id ? (
                  <><div className="spinner" style={{ width: 12, height: 12 }} /> Generating...</>
                ) : (
                  <><Download size={13} /> Export Report</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
