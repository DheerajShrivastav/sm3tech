import React from 'react';
import { LiaDownloadSolid } from "react-icons/lia";

export const DownloadNotesBar = ({ subject, link }) => {
  const getDownloadLink = (link) => {
    // Handle file link
    const driveFileIdMatch = link.match(/(?:https:\/\/drive\.google\.com\/file\/d\/|\/open\?id=)([\w-]+)/);
    if (driveFileIdMatch) {
      const fileId = driveFileIdMatch[1];
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    
    // Handle folder link
    const driveFolderIdMatch = link.match(/(?:https:\/\/drive\.google\.com\/drive\/folders\/|\/folders\/)([\w-]+)/);
    if (driveFolderIdMatch) {
      const folderId = driveFolderIdMatch[1];
      return `https://drive.google.com/drive/folders/${folderId}`;
    }

    return link;
  };

  const downloadLink = getDownloadLink(link);

  return (
    <div className='flex justify-between items-center w-full text-white p-4 m-0 shadow shadow-indigo-700 bg-slate-600'>
      <div className="font-medium flex-1 mr-4">
        {subject}
      </div>

      {/* Show download link on desktop (hidden on mobile) */}
      <a href={downloadLink} target="_blank" rel="noopener noreferrer" className='hidden sm:block font-thin text-white break-all'>
        Download
      </a>

      {/* Show download icon on mobile (below sm) */}
      <a href={downloadLink} target="_blank" rel="noopener noreferrer" className='block sm:hidden text-white'>
        <LiaDownloadSolid className='text-xl' />
      </a>
    </div>
  );
};
