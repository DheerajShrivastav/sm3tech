import React from 'react'
import Link from 'next/link';

const page = () => {
  return (
    <div>page</div>
  )
}

// Dummy data for services (replace with real data fetching if needed)
const services = [
    { id: 1, name: 'Web Development', slug: 'web-development' },
    { id: 2, name: 'App Development', slug: 'app-development' },
    { id: 3, name: 'SEO Optimization', slug: 'seo-optimization' },
];

// Example styling (replace with your actual home page styles)
const serviceCardStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem',
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'box-shadow 0.2s',
};

const serviceListStyle = {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
};

export default function Page() {
    return (
        <div style={serviceListStyle}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Our Services</h1>
            {services.map(service => (
                <Link key={service.id} href={`/services/${service.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={serviceCardStyle}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{service.name}</h2>
                    </div>
                </Link>
            ))}
        </div>
    );
}