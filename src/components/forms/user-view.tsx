import React from 'react';
import { getAgency } from '@/lib/queries';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, FileText, Image, Fingerprint, UserSquare2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface IAgency {
  registrationDocuments: {
    certificate?: string;
    license?: string;
  };
  occupierDocuments: {
    name?: string;
    photo?: string;
    signature?: string;
  };
  applicantIdProof: {
    aadharCard?: string;
    drivingLicense?: string;
    passport?: string;
    panCard?: string;
    electionId?: string;
  };
}

type Props = {
  id: string;
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

const UserView = ({ id }: Props) => {
  const [agency, setAgency] = React.useState<IAgency | null>(null);
  const [sectionsOpen, setSectionsOpen] = React.useState({
    registration: false,
    occupier: false,
    idProof: false
  });

  const toggleAllSections = (open: boolean) => {
    setSectionsOpen({
      registration: open,
      occupier: open,
      idProof: open
    });
  };

  React.useEffect(() => {
    const fetchAgency = async () => {
      const response = await getAgency(id);
      setAgency(response);
    };
    fetchAgency();
  }, [id]);

  return (
    <div className="flex flex-col font-sora rounded-xl bg-white/90 p-3 md:p-6 w-full max-w-3xl mx-auto shadow-xl relative backdrop-blur-sm">
      <DecorativeBg />
      
      <div className="relative z-10 space-y-3 md:space-y-4">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
              <UserSquare2 className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-md md:text-2xl font-semibold text-blue-900">Agency Documents</h3>
          </div>
          <button
            onClick={() => toggleAllSections(!Object.values(sectionsOpen).some(v => v))}
            className="px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {Object.values(sectionsOpen).some(v => v) ? 'Close All' : 'Show All'}
          </button>
        </div>
        
        {/* Agency Registration Section */}
        <DocumentSection 
          title="Agency Registration" 
          icon={FileText}
          isOpen={sectionsOpen.registration}
          onToggle={(open) => setSectionsOpen(prev => ({ ...prev, registration: open }))}
          documents={
            <>
              <DocumentLink 
                label="Registration Certificate" 
                href={agency?.registrationDocuments?.certificate} 
              />
              <DocumentLink 
                label="Business License" 
                href={agency?.registrationDocuments?.license} 
              />
            </>
          }
        />

        {/* Occupier Documents Section */}
        <DocumentSection 
          title="Occupier Documents" 
          icon={Image}
          isOpen={sectionsOpen.occupier}
          onToggle={(open) => setSectionsOpen(prev => ({ ...prev, occupier: open }))}
          documents={
            <>
              <DocumentLink 
                label="Photo Document"
                href={agency?.occupierDocuments?.photo} 
              />
              <DocumentLink 
                label="Signature Document" 
                href={agency?.occupierDocuments?.signature} 
              />
            </>
          }
        />

        {/* Applicant ID Proof Section */}
        <DocumentSection 
          title="Applicant ID Proof" 
          icon={Fingerprint}
          isOpen={sectionsOpen.idProof}
          onToggle={(open) => setSectionsOpen(prev => ({ ...prev, idProof: open }))}
          documents={
            <>
              <DocumentLink 
                label="Aadhar Card" 
                href={agency?.applicantIdProof?.aadharCard} 
              />
              <DocumentLink 
                label="Driving License" 
                href={agency?.applicantIdProof?.drivingLicense} 
              />
              <DocumentLink 
                label="Passport" 
                href={agency?.applicantIdProof?.passport} 
              />
              <DocumentLink 
                label="PAN Card" 
                href={agency?.applicantIdProof?.panCard} 
              />
              <DocumentLink 
                label="Election ID" 
                href={agency?.applicantIdProof?.electionId} 
              />
            </>
          }
        />
      </div>
    </div>
  );
};

export default UserView;