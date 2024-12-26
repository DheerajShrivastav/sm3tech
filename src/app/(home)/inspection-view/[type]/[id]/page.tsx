'use client'

import React, { useEffect, useState } from 'react'
import { getAgency, getFactoryLicense } from '@/lib/queries'
import { IAgency } from '@/models/agency.model'
import { IFactoryLicenseDetails } from '@/models/factoryLicenseDetails.model'
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, FileText, Image, Fingerprint, UserSquare2, Factory } from "lucide-react"
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
  const [data, setData] = useState<IAgency | IFactoryLicenseDetails | null>(null)
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
              {type === 'agency' ? 'Agency Documents' : 'Factory License Details'}
            </h3>
          </div>
          <button
            onClick={() => toggleAllSections(!Object.values(sectionsOpen).some(v => v))}
            className="px-2 lg:px-4 py-1 md:py-2 text-xs md:text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {Object.values(sectionsOpen).some(v => v) ? 'Close All' : 'Show All'}
          </button>
        </div>

         {/*  NAME*/}

         <div className='text-black text-lg p-2'>
           {(data as IAgency).occupierDocuments?.name}
        
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
      </div>
    </div>
  )
}

export default InspectionView