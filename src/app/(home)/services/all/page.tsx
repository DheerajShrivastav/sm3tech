import React from 'react'
import Link from 'next/link'

// List all services based on your folder structure
const services = [
  // Factory Act
  { name: 'Agency Information', slug: 'factory-act/agency-information' },
  { name: 'Factory License', slug: 'factory-act/factory-license' },
  { name: 'Plan Approval', slug: 'factory-act/plan-approval' },
  { name: 'Safety Audit Report', slug: 'factory-act/safety-audit-report' },
  { name: 'Stability Certificate', slug: 'factory-act/stability-certificate' },
  { name: 'Testing & Calibration', slug: 'factory-act/testing-calibration' },
  // MPCB
  { name: 'MPCB Compliance Report', slug: 'mpcb/compliance-report' },
  { name: 'MPCB Consent to Establish', slug: 'mpcb/consent-to-establish' },
  { name: 'MPCB Consent to Operate', slug: 'mpcb/consent-to-operate' },
  // Add more services here as you add folders/routes
]

// Styling (copied from home page)
const serviceCardStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '1.5rem',
  marginBottom: '1rem',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  transition: 'box-shadow 0.2s',
}

const serviceListStyle = {
  maxWidth: '600px',
  margin: '2rem auto',
  padding: '1rem',
}

export default function AllServicesPage() {
  return (
    <div style={serviceListStyle}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>All Services</h1>
      {services.map((service, idx) => (
        <Link
          key={idx}
          href={`/services/${service.slug}`}
          passHref
        >
          <a style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={serviceCardStyle}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{service.name}</h2>
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}