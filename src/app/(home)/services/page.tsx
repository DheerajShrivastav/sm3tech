import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

const services = [
    // Factory Act
    { name: "Agency Information", slug: "factory-act/agency-information" },
    { name: "Factory License", slug: "factory-act/factory-license" },
    { name: "Plan Approval", slug: "factory-act/plan-approval" },
    { name: "Safety Audit Report", slug: "factory-act/safety-audit-report" },
    { name: "Stability Certificate", slug: "factory-act/stability-certificate" },
    { name: "Testing & Calibration", slug: "factory-act/testing-calibration" },
    // MPCB
    { name: "MPCB Compliance Report", slug: "mpcb/compliance-report" },
    { name: "MPCB Consent to Establish", slug: "mpcb/consent-to-establish" },
    { name: "MPCB Consent to Operate", slug: "mpcb/consent-to-operate" },
    // Add more services here as you add folders/routes
];

export default function AllServicesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="font-sora text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                    All Services
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, idx) => (
                        <Link key={idx} href={`/services/${service.slug}`} className="group">
                            <div
                                className="bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 cursor-pointer border border-blue-100 rounded-xl p-6 flex items-center gap-4 hover:scale-105"
                                tabIndex={0}
                                role="link"
                                aria-label={service.name}
                            >
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg shadow-md">
                                    <FileText className="h-6 w-6 text-white group-hover:animate-pulse" />
                                </div>
                                <div>
                                    <h2 className="font-sora text-lg font-semibold text-gray-900 mb-1">
                                        {service.name}
                                    </h2>
                                    <p className="text-gray-500 text-sm">View details</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
