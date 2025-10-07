# File Upload Configuration Update - Summary

## Client Requirement
> "All places image upload is there except photo and sign all other must be with pdf upload option, please check and do the needful"

## Changes Implemented

### Frontend Changes

#### 1. Factory License Details Form (`factorylicense-details.tsx`)
- **BEFORE**: All document uploads used `imageUploader`
- **AFTER**: All document uploads now use `pdfUploader`
- **Reason**: All fields in this form are for documents/certificates, not actual photos

#### 2. Stability Certificate Details Form (`stability-certificate-details.tsx`)
- **BEFORE**: All document uploads used `imageUploader`
- **AFTER**: 
  - `photographs` field uses `imageUploader` (for actual structural photos)
  - All other document fields use `pdfUploader`
- **Implementation**: Added conditional logic to determine endpoint based on field name

#### 3. Agency Details Form (`agency-details.tsx`)
- **UNCHANGED**: Already correctly configured
  - `photo` field uses `imageUploader` ✅
  - `signature` field uses `imageUploader` ✅
  - All other document fields use `pdfUploader` ✅

#### 4. Other Forms (Already Correct)
- **Consent to Establish**: Uses `pdfUploader` ✅
- **Consent to Operate**: Uses `pdfUploader` ✅
- **Testing Calibration**: Uses `pdfUploader` ✅
- **Safety Audit Report**: Uses `pdfUploader` ✅

### Backend Configuration
- **Image Uploader**: 4MB max file size (for photos/signatures) ✅
- **PDF Uploader**: 16MB max file size (for documents) ✅
- Both endpoints properly authenticated ✅

### File Upload Component (`file-upload.tsx`)
- Already supports both image and PDF display ✅
- Shows image preview for non-PDF files
- Shows "View PDF" link for PDF files
- Properly handles both endpoint types

## Final State

### Fields Using `imageUploader` (Photos/Signatures Only):
1. **Agency Details Form**:
   - Occupier Photo
   - Occupier Signature
2. **Stability Certificate Form**:
   - Recent Color Photographs of Structural Elements

### Fields Using `pdfUploader` (All Documents):
1. **Factory License Details Form**: All 15+ document fields
2. **Stability Certificate Form**: 9 out of 10 fields (except photographs)
3. **Agency Details Form**: All document fields (except photo/signature)
4. **Consent to Establish Form**: All document fields
5. **Consent to Operate Form**: All document fields
6. **Testing Calibration Form**: All document fields
7. **Safety Audit Report Form**: All document fields

## Verification
- ✅ Project builds successfully without errors
- ✅ TypeScript compilation passes
- ✅ All forms maintain their existing functionality
- ✅ Proper separation between image uploads (photos/signatures) and document uploads (PDFs)

## Client Requirement Status: ✅ COMPLETED
The requirement has been fully implemented:
- Photo and signature fields continue to use image upload
- All other document upload fields now use PDF upload
- Both frontend and backend are properly configured