import React from 'react';
import { getAgency } from '@/lib/queries';
import { IAgency } from '@/models/agency.model';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, FileText, Image, Fingerprint, UserSquare2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type Props = {
  id: string;
}

// Decorative background component
const DecorativeBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full transform translate-x-32 -translate-y-32 opacity-50" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-sky-200 to-blue-100 rounded-full transform -translate-x-32 translate-y-32 opacity-50" />
  </div>
);

const DocumentLink = ({ label, href }: { label: string; href?: string }) => (
  <div className="flex justify-between items-center p-3 hover:bg-blue-50/80 rounded-md transition-colors backdrop-blur-sm">
    <span className="text-blue-800 flex items-center gap-2">
      <FileText className="w-4 h-4 text-blue-500" />
      {label}
    </span>
    {href ? (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        View
      </a>
    ) : (
      <span className="px-4 py-2 text-gray-500">Not Available</span>
    )}
  </div>
);

const DocumentSection = ({ 
  title, 
  icon: Icon,
  documents,
  maxHeight = "280px"
}: { 
  title: string;
  icon: React.ElementType;
  documents: React.ReactNode;
  maxHeight?: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all duration-300 group shadow-md hover:shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-white transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 pb-4">
        <div className="border rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
          <ScrollArea className={`w-full rounded-md`} style={{ maxHeight }}>
            <div className="p-4 space-y-2">
              {documents}
            </div>
          </ScrollArea>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const UserView = ({ id }: Props) => {
  const [agency, setAgency] = React.useState<IAgency | null>(null);

  React.useEffect(() => {
    const fetchAgency = async () => {
      const response = await getAgency(id);
      setAgency(response);
    };
    fetchAgency();
  }, [id]);

  return (
    <div className="flex flex-col font-sora rounded-xl bg-white/90 p-6 max-w-3xl mx-auto shadow-xl relative backdrop-blur-sm">
      <DecorativeBg />
      
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
            <UserSquare2 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-blue-900">Agency Documents</h2>
        </div>
        
        {/* Agency Registration Section */}
        <DocumentSection 
          title="Agency Registration" 
          icon={FileText}
          documents={
            <>
              <DocumentLink 
                label={agency?.occupierDocuments.name || 'Photo Document'} 
                href={agency?.occupierDocuments.photo} 
              />
              <DocumentLink 
                label="Signature Document" 
                href={agency?.occupierDocuments.signature} 
              />
            </>
          }
        />

        {/* Occupier Documents Section */}
        <DocumentSection 
          title="Occupier Documents" 
          icon={Image}
          documents={
            <>
              <DocumentLink 
                label={agency?.occupierDocuments.name || 'Photo Document'} 
                href={agency?.occupierDocuments.photo} 
              />
              <DocumentLink 
                label="Signature Document" 
                href={agency?.occupierDocuments.signature} 
              />
            </>
          }
        />

        {/* Applicant ID Proof Section */}
        <DocumentSection 
          title="Applicant ID Proof" 
          icon={Fingerprint}
          documents={
            <>
              {agency?.applicantIdProof.electionId ? (
                <DocumentLink 
                  label="Election ID" 
                  href={agency.applicantIdProof.electionId} 
                />
              ) : (
                <DocumentLink 
                  label="Driving License" 
                  href={agency?.applicantIdProof.drivingLicense} 
                />
              )}
              
              {agency?.applicantIdProof.aadharCard ? (
                <DocumentLink 
                  label="Aadhar Card" 
                  href={agency.applicantIdProof.aadharCard} 
                />
              ) : (
                <DocumentLink 
                  label="Passport" 
                  href={agency?.applicantIdProof.passport || undefined} 
                />
              )}
              
              {agency?.applicantIdProof.panCard && (
                <DocumentLink 
                  label="Pan Card" 
                  href={agency?.applicantIdProof.panCard} 
                />
              )}
            </>
          }
        />
      </div>
    </div>
  );
};

export default UserView;
