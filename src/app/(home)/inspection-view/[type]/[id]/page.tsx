'use client'

import React, { useEffect, useState } from 'react'
import { getAgency, getFactoryLicense, getPlanApproval, getStabilityCertificate, getSafetyAuditReport, getConsentToEstablish, getConsentToOperate, getComplianceReport } from '@/lib/queries'
import { IAgency } from '@/models/agency.model'
import { IFactoryLicenseDetails } from '@/models/factoryLicenseDetails.model'
import { IPlanApproval } from '@/models/planApproval.model'
import { IStabilityCertificate } from '@/models/stabilityCertificate.model'
import { ISafetyAuditReport } from '@/models/safetyAuditReport.model'
import { IConsentToEstablish } from '@/models/consentToEstablish.model'
import { IConsentToOperate } from '@/models/consentToOperate.model'
import { IComplianceReport } from '@/models/complianceReport.model'
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, FileText, Image, Fingerprint, UserSquare2, Factory, CheckCircle2, Shield, FileCheck2 } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Params {
  type: string
  id: string
}

const DecorativeBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full transform translate-x-16 md:translate-x-32 -translate-y-16 md:-translate-y-32 opacity-50" />
    <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-tr from-sky-200 to-blue-100 rounded-full transform -translate-x-16 md:-translate-x-32 translate-y-16 md:translate-y-32 opacity-50" />
  </div>
);

const DocumentLink = ({ label, href }: { label: string; href?: string }) => (
  <div className="flex justify-between items-center p-2 md:p-3 hover:bg-blue-50/80 rounded-md transition-colors backdrop-blur-sm">
    <span className="text-blue-800 flex items-center gap-2 text-xs md:text-sm">
      <FileText className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
      {label}
    </span>
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        View
      </a>
    ) : (
      <span className="px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm text-gray-500">Not Available</span>
    )}
  </div>
);

const DocumentSection = ({
  title,
  icon: Icon,
  documents,
  isOpen,
  onToggle,
  maxHeight = "280px"
}: {
  title: string;
  icon: React.ElementType;
  documents: React.ReactNode;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  maxHeight?: string;
}) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 md:p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all duration-300 group shadow-md hover:shadow-lg">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-1 md:p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <h3 className="text-sm md:text-lg font-medium text-white">{title}</h3>
        </div>
        <ChevronDown
          className={`w-4 h-4 md:w-5 md:h-5 text-white transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 pb-3">
        <div className="border rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
          <ScrollArea className="w-full rounded-md" style={{ maxHeight }}>
            <div className="p-2 md:p-4 space-y-1 md:space-y-2">
              {documents}
            </div>
          </ScrollArea>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const InspectionView = ({ params }: { params: Params }) => {
  const type = params.type
  const id = params.id
  const [data, setData] = useState<IAgency | IFactoryLicenseDetails | IPlanApproval | IStabilityCertificate | ISafetyAuditReport | IConsentToEstablish | IConsentToOperate | IComplianceReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sectionsOpen, setSectionsOpen] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    if (type && id) {
      const fetchData = async () => {
        try {
          let fetchedData;
          if (type === 'agency') {
            fetchedData = await getAgency(id as string);
          } else if (type === 'factory-license') {
            fetchedData = await getFactoryLicense(id as string);
          } else if (type === 'plan-approval') {
            fetchedData = await getPlanApproval(id as string);
          } else if (type === 'stability-certificate') {
            fetchedData = await getStabilityCertificate(id as string);
          } else if (type === 'safety-audit-report') {
            fetchedData = await getSafetyAuditReport(id as string);
          } else if (type === 'consent-to-establish') {
            fetchedData = await getConsentToEstablish(id as string);
          } else if (type === 'consent-to-operate') {
            fetchedData = await getConsentToOperate(id as string);
          } else if (type === 'compliance-report') {
            fetchedData = await getComplianceReport(id as string);
          }
          if (fetchedData) {
            setData(fetchedData);

            // Initialize all sections as closed based on the type
            let initialSectionsState: { [key: string]: boolean };

            if (type === 'agency') {
              initialSectionsState = {
                registration: false,
                occupier: false,
                idProof: false,
                previousLicense: false,
                ownership: false,
                electricity: false,
                flowChart: false,
              };
            } else if (type === 'factory-license') {
              initialSectionsState = {
                factoryDetails: false,
              };
            } else if (type === 'plan-approval') {
              initialSectionsState = {
                requiredDocs: false,
                optionalDocs: false,
              };
            } else if (type === 'stability-certificate') {
              initialSectionsState = {
                allDocuments: false,
              };
            } else if (type === 'safety-audit-report') {
              initialSectionsState = {
                auditDocument: false,
              };
            } else if (type === 'consent-to-establish') {
              initialSectionsState = {
                requiredDocs: false,
                optionalDocs: false,
              };
            } else if (type === 'consent-to-operate') {
              initialSectionsState = {
                requiredDocs: false,
                optionalDocs: false,
              };
            } else if (type === 'compliance-report') {
              initialSectionsState = {
                requiredDocs: false,
                optionalDocs: false,
              };
            } else {
              initialSectionsState = {}; // Fallback in case 'type' is neither 'agency' nor 'factory-license'
            }

            setSectionsOpen(initialSectionsState);
          } else {
            setError('No data found');
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : String(error));
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [type, id]);


  const toggleAllSections = (open: boolean) => {
    setSectionsOpen(prev => {
      const newState: {[key: string]: boolean} = {}
      Object.keys(prev).forEach(key => {
        newState[key] = open
      })
      return newState
    })
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>
  }

  if (!data) {
    return <div className="flex justify-center items-center h-screen">No data found</div>
  }

  return (
    <div className="flex flex-col font-sora rounded-xl bg-white/90 p-3 md:p-6 w-full max-w-3xl mx-auto shadow-xl relative backdrop-blur-sm mt-6">
      <DecorativeBg />

      <div className="relative z-10 space-y-3 md:space-y-4">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
              {type === 'agency' ? <UserSquare2 className="w-4 h-4 md:w-6 md:h-6 text-white" /> : <Factory className="w-4 h-4 md:w-6 md:h-6 text-white" />}
            </div>
            <h3 className="text-md md:text-2xl font-semibold text-blue-900">
              {type === 'agency' ? 'Agency Documents' : type === 'factory-license' ? 'Factory License Details' : 'Plan Approval Documents'}
            </h3>
          </div>
          <button
            onClick={() => toggleAllSections(!Object.values(sectionsOpen).some(v => v))}
            className="px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {Object.values(sectionsOpen).some(v => v) ? 'Close All' : 'Show All'}
          </button>
        </div>

         {/*  NAME*/}

         <div className='text-black text-lg p-2'>
           {type === 'agency' && (data as IAgency).occupierDocuments?.name}
           {type === 'plan-approval' && <span className="text-gray-700">Plan Approval ID: {String((data as IPlanApproval)._id)}</span>}
         </div>



        {type === 'agency' && (
          <>


            {/* Occupier Documents */}
            <DocumentSection
              title="Occupier Documents"
              icon={Image}
              isOpen={sectionsOpen.occupier}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, occupier: open }))}
              documents={
                <>
                  <DocumentLink
                    label="Photo"
                    href={(data as IAgency).occupierDocuments.photo}
                  />
                  <DocumentLink
                    label="Signature"
                    href={(data as IAgency).occupierDocuments.signature}
                  />
                </>
              }
            />

            {/* Applicant ID Proof */}
            <DocumentSection
              title="Applicant ID Proof"
              icon={Fingerprint}
              isOpen={sectionsOpen.idProof}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, idProof: open }))}
              documents={
                <>
                  <DocumentLink
                    label="Election ID"
                    href={(data as IAgency).applicantIdProof.electionId}
                  />
                  <DocumentLink
                    label="Driving License"
                    href={(data as IAgency).applicantIdProof.drivingLicense}
                  />
                  <DocumentLink
                    label="Aadhar Card"
                    href={(data as IAgency).applicantIdProof.aadharCard}
                  />
                  <DocumentLink
                    label="Passport"
                    href={(data as IAgency).applicantIdProof.passport}
                  />
                  <DocumentLink
                    label="PAN Card"
                    href={(data as IAgency).applicantIdProof.panCard}
                  />
                </>
              }
            />

            {/* Previous Factory License */}
            <DocumentSection
              title="Previous Factory License"
              icon={FileText}
              isOpen={sectionsOpen.previousLicense}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, previousLicense: open }))}
              documents={
                <>
                  <DocumentLink
                    label="Previous Factory License"
                    href={(data as IAgency).previousFactoryLicense.previousFactoryLicense}
                  />
                  <DocumentLink
                    label="Plan Approval Letter"
                    href={(data as IAgency).previousFactoryLicense.planApprovalLetter}
                  />
                </>
              }
            />

            {/* Ownership Documents */}
            <DocumentSection
              title="Ownership Documents"
              icon={FileText}
              isOpen={sectionsOpen.ownership}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, ownership: open }))}
              documents={
                <>
                  <DocumentLink
                    label="Leave and License Agreement"
                    href={(data as IAgency).ownershipDocuments.leaveAndLicenseAgreement}
                  />
                  <DocumentLink
                    label="MIDC Allotment Letter"
                    href={(data as IAgency).ownershipDocuments.midcAllotmentLetter}
                  />
                  <DocumentLink
                    label="7/12 Extract"
                    href={(data as IAgency).ownershipDocuments.sevenTwelveExtract}
                  />
                  <DocumentLink
                    label="Tax Receipt"
                    href={(data as IAgency).ownershipDocuments.taxReceipt}
                  />
                </>
              }
            />

            {/* Electricity Bill */}
            <DocumentSection
              title="Electricity Bill"
              icon={FileText}
              isOpen={sectionsOpen.electricity}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, electricity: open }))}
              documents={
                <>
                  <DocumentLink
                    label="Electricity Bill"
                    href={(data as IAgency).electricityBill.electricityBill}
                  />
                  <DocumentLink
                    label="Load Sanction Letter"
                    href={(data as IAgency).electricityBill.loadSanctionletter}
                  />
                </>
              }
            />

            {/* Flow Chart */}
            <DocumentSection
              title="Flow Chart"
              icon={FileText}
              isOpen={sectionsOpen.flowChart}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, flowChart: open }))}
              documents={
                <>
                  <DocumentLink
                    label="Flow Chart"
                    href={(data as IAgency).flowChart.flowChart}
                  />
                </>
              }
            />
          </>
        )}


        {type === 'factory-license' && (
          <DocumentSection
            title="Factory License Details"
            icon={Factory}
            isOpen={sectionsOpen.factoryDetails}
            onToggle={(open) => setSectionsOpen(prev => ({ ...prev, factoryDetails: open }))}
            documents={
              <>
                <div className="text-sm text-blue-800 p-2 bg-blue-50 rounded-md mb-2">
                  <p className="mb-1"><strong>Industry Registration:</strong> {(data as IFactoryLicenseDetails).industryRegistration}</p>
                  <p><strong>Manufacturing Process:</strong> {(data as IFactoryLicenseDetails).manufacturingProcess}</p>
                </div>
                <DocumentLink
                  label="Land Ownership Certificate"
                  href={(data as IFactoryLicenseDetails).landOwnershipCertificate}
                />
                <DocumentLink
                  label="Pollution Control Proposal"
                  href={(data as IFactoryLicenseDetails).detailedProposalOfPollutionControlSystem}
                />
                <DocumentLink
                  label="Previous Consent Copy"
                  href={(data as IFactoryLicenseDetails).previousConsentCopy}
                />
              </>
            }
          />
        )}

        {type === 'plan-approval' && (
          <>
            {/* Required Documents Section */}
            <DocumentSection
              title="Required Documents"
              icon={CheckCircle2}
              isOpen={sectionsOpen.requiredDocs}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, requiredDocs: open }))}
              maxHeight="400px"
              documents={
                <>
                  <DocumentLink
                    label="Application Form for Plan Approval"
                    href={(data as IPlanApproval).applicationForm}
                  />
                  <DocumentLink
                    label="Site Layout/Plant Layout Plan"
                    href={(data as IPlanApproval).siteLayout}
                  />
                  <DocumentLink
                    label="Building Construction Plan"
                    href={(data as IPlanApproval).buildingPlan}
                  />
                  <DocumentLink
                    label="Machinery Layout Plan"
                    href={(data as IPlanApproval).machineryLayout}
                  />
                  <DocumentLink
                    label="Structural Drawings and Details"
                    href={(data as IPlanApproval).structuralDrawings}
                  />
                  <DocumentLink
                    label="Ventilation and Lighting Plan"
                    href={(data as IPlanApproval).ventilationPlan}
                  />
                  <DocumentLink
                    label="Safety Measures and Fire Protection Plan"
                    href={(data as IPlanApproval).safetyMeasures}
                  />
                  <DocumentLink
                    label="Land Ownership Documents"
                    href={(data as IPlanApproval).landOwnership}
                  />
                </>
              }
            />

            {/* Optional Documents Section */}
            <DocumentSection
              title="Optional Documents"
              icon={FileText}
              isOpen={sectionsOpen.optionalDocs}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, optionalDocs: open }))}
              documents={
                <>
                  <DocumentLink
                    label="Soil Test Report"
                    href={(data as IPlanApproval).soilTest}
                  />
                  <DocumentLink
                    label="Environmental Clearance"
                    href={(data as IPlanApproval).environmentClearance}
                  />
                  <DocumentLink
                    label="NABH-1 Approval"
                    href={(data as IPlanApproval).nabh1approval}
                  />
                  <DocumentLink
                    label="Other Supporting Documents"
                    href={(data as IPlanApproval).otherDocuments}
                  />
                </>
              }
            />
          </>
        )}

        {type === 'stability-certificate' && (
          <>
            {/* All Documents Section */}
            <DocumentSection
              title="Stability Certificate Documents"
              icon={Shield}
              isOpen={sectionsOpen.allDocuments}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, allDocuments: open }))}
              maxHeight="500px"
              documents={
                <>
                  <DocumentLink
                    label="Stability Certificate (Form 1A)"
                    href={(data as IStabilityCertificate).stabilityCertificate}
                  />
                  <DocumentLink
                    label="Structural Design & Load Calculations"
                    href={(data as IStabilityCertificate).structuralDesign}
                  />
                  <DocumentLink
                    label="Approved Building Drawings/Layout Plan"
                    href={(data as IStabilityCertificate).approvedDrawings}
                  />
                  <DocumentLink
                    label="Material Testing/Quality Certificates"
                    href={(data as IStabilityCertificate).materialCertificates}
                  />
                  <DocumentLink
                    label="Engineer's Inspection/Site Assessment Report"
                    href={(data as IStabilityCertificate).inspectionReport}
                  />
                  <DocumentLink
                    label="Owner/Competent Person's Self-Declaration"
                    href={(data as IStabilityCertificate).selfDeclaration}
                  />
                  <DocumentLink
                    label="Recent Color Photographs of Structural Elements"
                    href={(data as IStabilityCertificate).photographs}
                  />
                  <DocumentLink
                    label="Proof of Factory License Application/Renewal"
                    href={(data as IStabilityCertificate).factoryLicenseProof}
                  />
                  <DocumentLink
                    label="List of Directors/Occupiers"
                    href={(data as IStabilityCertificate).directorsList}
                  />
                  <DocumentLink
                    label="Legal Proof of Building Ownership/Tenancy"
                    href={(data as IStabilityCertificate).ownershipProof}
                  />
                </>
              }
            />
          </>
        )}

        {type === 'safety-audit-report' && (
          <>
            {/* Audit Report Document Section */}
            <DocumentSection
              title="Safety Audit Report"
              icon={FileText}
              isOpen={sectionsOpen.auditDocument}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, auditDocument: open }))}
              documents={
                <>
                  <DocumentLink
                    label="Completed Safety Audit Report PDF"
                    href={(data as ISafetyAuditReport).auditReport}
                  />
                </>
              }
            />
          </>
        )}

        {type === 'consent-to-establish' && (
          <>
            {/* Required Documents Section */}
            <DocumentSection
              title="Required Documents"
              icon={FileCheck2}
              isOpen={sectionsOpen.requiredDocs}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, requiredDocs: open }))}
              maxHeight="500px"
              documents={
                <>
                  <DocumentLink
                    label="Application Form (online or prescribed by MPCB)"
                    href={(data as IConsentToEstablish).applicationForm}
                  />
                  <DocumentLink
                    label="Detailed Project Report (DPR)"
                    href={(data as IConsentToEstablish).dpr}
                  />
                  <DocumentLink
                    label="Site Plan/Layout Plan/Plant Layout"
                    href={(data as IConsentToEstablish).sitePlan}
                  />
                  <DocumentLink
                    label="Geographical Map/Location Details"
                    href={(data as IConsentToEstablish).geoMap}
                  />
                  <DocumentLink
                    label="Manufacturing Process Description with Flow Diagram"
                    href={(data as IConsentToEstablish).processDescription}
                  />
                  <DocumentLink
                    label="Land Ownership Certificate or Rent/Lease Agreement"
                    href={(data as IConsentToEstablish).landOwnership}
                  />
                  <DocumentLink
                    label="Capital Investment Proof (CA Certificate or Balance Sheet)"
                    href={(data as IConsentToEstablish).capitalInvestmentProof}
                  />
                  <DocumentLink
                    label="NOC from MIDC/Local Authority"
                    href={(data as IConsentToEstablish).nocFromAuthority}
                  />
                  <DocumentLink
                    label="Industry Registration (e.g. SSI/MSME Certificate)"
                    href={(data as IConsentToEstablish).industryRegistration}
                  />
                  <DocumentLink
                    label="Proposed Pollution Control Measures"
                    href={(data as IConsentToEstablish).pollutionControl}
                  />
                  <DocumentLink
                    label="Environmental Management Plan"
                    href={(data as IConsentToEstablish).emp}
                  />
                  <DocumentLink
                    label="Power and Water Connection Sanction Letters"
                    href={(data as IConsentToEstablish).powerWaterSanction}
                  />
                  <DocumentLink
                    label="Board Resolution or Authority Letter for Authorized Person"
                    href={(data as IConsentToEstablish).boardResolution}
                  />
                  <DocumentLink
                    label="Affidavit/Undertaking as required by MPCB"
                    href={(data as IConsentToEstablish).affidavit}
                  />
                </>
              }
            />

            {/* Optional Documents Section */}
            <DocumentSection
              title="Optional Documents"
              icon={Shield}
              isOpen={sectionsOpen.optionalDocs}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, optionalDocs: open }))}
              documents={
                <>
                  <DocumentLink
                    label="Approval from Local Bodies/Government (if applicable)"
                    href={(data as IConsentToEstablish).localApproval}
                  />
                </>
              }
            />
          </>
        )}

        {type === 'consent-to-operate' && (
          <>
            {/* Required Documents Section */}
            <DocumentSection
              title="Required Documents"
              icon={FileCheck2}
              isOpen={sectionsOpen.requiredDocs}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, requiredDocs: open }))}
              maxHeight="500px"
              documents={
                <>
                  <DocumentLink label="Application Form (for CTO)" href={(data as IConsentToOperate).applicationForm} />
                  <DocumentLink label="Copy of Consent to Establish already granted" href={(data as IConsentToOperate).cteCopy} />
                  <DocumentLink label="Latest Plant Layout as Commissioned" href={(data as IConsentToOperate).plantLayout} />
                  <DocumentLink label="Details of Production Capacity, Products & By-products, and Raw Materials" href={(data as IConsentToOperate).productionDetails} />
                  <DocumentLink label="Environmental Monitoring Reports (air, water, noise analysis)" href={(data as IConsentToOperate).envMonitoringReports} />
                  <DocumentLink label="Compliance Report to CTE Conditions" href={(data as IConsentToOperate).cteComplianceReport} />
                  <DocumentLink label="ETP/STP Operation & Maintenance Records" href={(data as IConsentToOperate).etpStpRecords} />
                  <DocumentLink label="Hazardous and Non-hazardous Waste Disposal Arrangements" href={(data as IConsentToOperate).wasteDisposal} />
                  <DocumentLink label="Water Balance and Wastewater Management Plan" href={(data as IConsentToOperate).waterBalance} />
                  <DocumentLink label="Details of Air Pollution Control Equipment" href={(data as IConsentToOperate).airPollutionControl} />
                  <DocumentLink label="Details of Chemicals, Fuels, and Raw Materials Storage" href={(data as IConsentToOperate).storageDetails} />
                </>
              }
            />

            {/* Optional Documents Section */}
            <DocumentSection
              title="Optional Documents"
              icon={Shield}
              isOpen={sectionsOpen.optionalDocs}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, optionalDocs: open }))}
              documents={
                <>
                  <DocumentLink label="Authorization for Handling Hazardous Waste (if any)" href={(data as IConsentToOperate).hazardousWasteAuth} />
                  <DocumentLink label="Membership Certificates of CETP/CHWTSDF (if applicable)" href={(data as IConsentToOperate).membershipCertificates} />
                  <DocumentLink label="Fire Safety Certificate/Plan (if applicable)" href={(data as IConsentToOperate).fireSafety} />
                  <DocumentLink label="Renewal Documents as per Last Consent (if renewal is sought)" href={(data as IConsentToOperate).renewalDocs} />
                </>
              }
            />
          </>
        )}

        {type === 'compliance-report' && (
          <>
            <DocumentSection
              title="Required Documents"
              icon={FileCheck2}
              isOpen={sectionsOpen.requiredDocs}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, requiredDocs: open }))}
              maxHeight="500px"
              documents={
                <>
                  <DocumentLink label="Copy of Consent to Operate (CTO)" href={(data as IComplianceReport).consentOperatingCopy} />
                  <DocumentLink label="Copy of Consent to Establish (CTE)" href={(data as IComplianceReport).consentEstablishCopy} />
                  <DocumentLink label="Environmental Clearance Certificate" href={(data as IComplianceReport).environmentalClearance} />
                  <DocumentLink label="Latest Plant Layout (As Commissioned)" href={(data as IComplianceReport).plantLayout} />
                  <DocumentLink label="Air Quality Monitoring Reports & Stack Emission Data" href={(data as IComplianceReport).airMonitoring} />
                  <DocumentLink label="Water/Wastewater Quality Monitoring Reports" href={(data as IComplianceReport).waterMonitoring} />
                  <DocumentLink label="ETP/STP Operation & Maintenance Logbooks" href={(data as IComplianceReport).etpStpLogbook} />
                  <DocumentLink label="Hazardous Waste Generation & Disposal Logbook" href={(data as IComplianceReport).hazardousWasteLogbook} />
                  <DocumentLink label="Compliance Report to CTE Conditions" href={(data as IComplianceReport).cteComplianceReport} />
                  <DocumentLink label="Safety Audit Report & Compliance Recommendations" href={(data as IComplianceReport).safetyAuditReport} />
                  <DocumentLink label="Form V - Annual Environmental Audit Report" href={(data as IComplianceReport).environmentalAudit} />
                  <DocumentLink label="Statutory Annual Returns Submission Proof" href={(data as IComplianceReport).annualReturns} />
                </>
              }
            />

            <DocumentSection
              title="Optional Documents"
              icon={Shield}
              isOpen={sectionsOpen.optionalDocs}
              onToggle={(open) => setSectionsOpen(prev => ({ ...prev, optionalDocs: open }))}
              documents={
                <>
                  <DocumentLink label="Authorization for Handling Hazardous Waste" href={(data as IComplianceReport).hazardousWasteAuth} />
                  <DocumentLink label="Fire Safety Certificate & Plan" href={(data as IComplianceReport).fireSafety} />
                  <DocumentLink label="Membership Certificate of CETP/CHWTSDF (if applicable)" href={(data as IComplianceReport).membershipCETP} />
                </>
              }
            />
          </>
        )}
      </div>
    </div>
  )
}

export default InspectionView