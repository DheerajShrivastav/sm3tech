'use server'
import { useUser } from '@clerk/nextjs'
import { connectDB, db } from './db'
import { User, IUser } from '@/models/user.model'
import { currentUser } from '@clerk/nextjs/server'
import { Agency, IAgency } from '@/models/agency.model'
import { get } from 'http'
import { QueryCache } from 'react-query'
import { UTApi } from 'uploadthing/server'
import { utapi } from '@/server/uploadthing'
import { promises } from 'dns'
import { IFactoryLicenseDetails } from '@/models/factoryLicenseDetails.model'
import { PlanApproval, IPlanApproval } from '@/models/planApproval.model'
import { StabilityCertificate, IStabilityCertificate } from '@/models/stabilityCertificate.model'
import { SafetyAuditReport, ISafetyAuditReport } from '@/models/safetyAuditReport.model'
import { ConsentToEstablish, IConsentToEstablish } from '@/models/consentToEstablish.model'
// Write a query to save the current user's profile from Clerk provider in MongoDB
export const initUser = async (newUser: Partial<IUser>) => {
  const user = await currentUser()
  if (!user) return

  // Find and update or create the user
  try {
    await connectDB()
    const userData = await User.updateOne(
      { email: user.emailAddresses[0].emailAddress }, // Query condition
      {
        ...newUser,
        id: user.id,
        avatar: user.imageUrl,
        name: `${user.firstName} ${user.lastName}`,
      }, // Update data
      { upsert: true } // Create the document if it doesn't exist
    )
    return userData
  } catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Error updating user')
  }
}

let userData: any

export const getUser = async () => {
  if (userData) return userData

  try {
    const user = await currentUser()
    if (!user) return
    await connectDB()
    let userData = await User.findOne({
      email: user.emailAddresses[0].emailAddress,
    })
      .lean()
      .exec()
    // const plainUser = JSON.parse(JSON.stringify(userData))
    // userData = plainUser
    return userData
  } catch (error) {
    console.error('Error getting user:', error)
    throw new Error('Error getting user')
  }
}
export const upsertAgency = async (agencyData: Partial<IAgency>) => {
  try {
    console.log('inside the upsertdata', agencyData)
    let agency = await Agency.findOne({ _id: agencyData._id })
    if (agency) {
      agency = await Agency.findByIdAndUpdate(
        agency._id,
        {
          $set: {
            ...agencyData,
            occupierDocuments: {
              name: agencyData.occupierDocuments?.name,
              photo: agencyData.occupierDocuments?.photo,
              signature: agencyData.occupierDocuments?.signature,
            },
            applicantIdProof: {
              electionId: agencyData.applicantIdProof?.electionId,
              drivingLicense: agencyData.applicantIdProof?.drivingLicense,
              aadharCard: agencyData.applicantIdProof?.aadharCard,
              passport: agencyData.applicantIdProof?.passport,
              panCard: agencyData.applicantIdProof?.panCard,
            },
            previousFactoryLicense: {
              previousFactoryLicense:
                agencyData.previousFactoryLicense?.previousFactoryLicense,
              planApprovalLetter:
                agencyData.previousFactoryLicense?.planApprovalLetter,
            },
            privateLimitedCompany: {
              listOfDirectors:
                agencyData.privateLimitedCompany?.listOfDirectors,
              moa: agencyData.privateLimitedCompany?.moa,
              boardResolution:
                agencyData.privateLimitedCompany?.boardResolution,
              form32: agencyData.privateLimitedCompany?.form32,
            },
            listOfRawMaterials: {
              listOfRawMaterials:
                agencyData.listOfRawMaterials?.listOfRawMaterials,
            },
            ownershipDocuments: {
              leaveAndLicenseAgreement:
                agencyData.ownershipDocuments?.leaveAndLicenseAgreement,
              midcAllotmentLetter:
                agencyData.ownershipDocuments?.midcAllotmentLetter,
              sevenTwelveExtract:
                agencyData.ownershipDocuments?.sevenTwelveExtract,
              taxReceipt: agencyData.ownershipDocuments?.taxReceipt,
            },
            localAuthorityNoC: {
              localAuthorityNoC:
                agencyData.localAuthorityNoC?.localAuthorityNoC,
              corporationNoC: agencyData.localAuthorityNoC?.corporationNoC,
              grampanchayatNoC: agencyData.localAuthorityNoC?.grampanchayatNoC,
              midcNoC: agencyData.localAuthorityNoC?.midcNoC,
            },
            mpcbConsent: {
              mpcbConsent: agencyData.mpcbConsent?.mpcbConsent,
            },
            sketchFactory: {
              sketch: agencyData.sketchFactory?.sketch,
            },
            electricityBill: {
              electricityBill: agencyData.electricityBill?.electricityBill,
              loadSanctionletter:
                agencyData.electricityBill?.loadSanctionletter,
            },
            acceptanceLetter: {
              acceptanceLetter: agencyData.acceptanceLetter?.acceptanceLetter,
            },
            flowChart: {
              flowChart: agencyData.flowChart?.flowChart,
            },
          },
        },
        { new: true }
      )
    } else {
      agency = new Agency({
        ...agencyData,
        occupierDocuments: {
          name: agencyData.occupierDocuments?.name,
          photo: agencyData.occupierDocuments?.photo,
          signature: agencyData.occupierDocuments?.signature,
        },
        applicantIdProof: {
          electionId: agencyData.applicantIdProof?.electionId,
          drivingLicense: agencyData.applicantIdProof?.drivingLicense,
          aadharCard: agencyData.applicantIdProof?.aadharCard,
          passport: agencyData.applicantIdProof?.passport,
          panCard: agencyData.applicantIdProof?.panCard,
        },
        previousFactoryLicense: {
          previousFactoryLicense:
            agencyData.previousFactoryLicense?.previousFactoryLicense,
          planApprovalLetter:
            agencyData.previousFactoryLicense?.planApprovalLetter,
        },
        privateLimitedCompany: {
          listOfDirectors: agencyData.privateLimitedCompany?.listOfDirectors,
          moa: agencyData.privateLimitedCompany?.moa,
          boardResolution: agencyData.privateLimitedCompany?.boardResolution,
          form32: agencyData.privateLimitedCompany?.form32,
        },
        listOfRawMaterials: {
          listOfRawMaterials: agencyData.listOfRawMaterials?.listOfRawMaterials,
        },
        ownershipDocuments: {
          leaveAndLicenseAgreement:
            agencyData.ownershipDocuments?.leaveAndLicenseAgreement,
          midcAllotmentLetter:
            agencyData.ownershipDocuments?.midcAllotmentLetter,
          sevenTwelveExtract: agencyData.ownershipDocuments?.sevenTwelveExtract,
          taxReceipt: agencyData.ownershipDocuments?.taxReceipt,
        },
        localAuthorityNoC: {
          localAuthorityNoC: agencyData.localAuthorityNoC?.localAuthorityNoC,
          corporationNoC: agencyData.localAuthorityNoC?.corporationNoC,
          grampanchayatNoC: agencyData.localAuthorityNoC?.grampanchayatNoC,
          midcNoC: agencyData.localAuthorityNoC?.midcNoC,
        },
        mpcbConsent: {
          mpcbConsent: agencyData.mpcbConsent?.mpcbConsent,
        },
        sketchFactory: {
          sketch: agencyData.sketchFactory?.sketch,
        },
        electricityBill: {
          electricityBill: agencyData.electricityBill?.electricityBill,
          loadSanctionletter: agencyData.electricityBill?.loadSanctionletter,
        },
        acceptanceLetter: {
          acceptanceLetter: agencyData.acceptanceLetter?.acceptanceLetter,
        },
        flowChart: {
          flowChart: agencyData.flowChart?.flowChart,
        },
        user: agencyData.user,
      })
      await agency.save()
    }
    return JSON.stringify(agency)
  } catch (error) {
    console.log(error)
  }
}
// get all agencies
export const getAgencies = async () => {
  try {
    await connectDB()
    const agencies = await Agency.find({}).populate('user').lean().exec()
    const plainAgencies = JSON.parse(JSON.stringify(agencies))
    return plainAgencies
  } catch (error) {
    console.error('Error getting agencies:', error)
    throw new Error('Error getting agencies')
  }
}
export const getAgency = async (id: string): Promise<IAgency | null> => {
  try {
    await connectDB()
    const agency = await Agency.findOne({ _id: id })
      .populate('user')
      .lean()
      .exec()
    // const plainAgency = JSON.parse(JSON.stringify(agency))
    return agency as IAgency | null;;
  } catch (error) {
    console.error('Error getting agency:', error)
    throw new Error('Error getting agency')
  }
}
export const deleteAgency = async (id: string) => {
  try {
    await connectDB()
    const agency = await Agency.findById({ id })
    if (!agency) return 'Agency not found'
    agency?.occupierDocuments?.photo &&
      deleteFile({ fileKey: agency?.occupierDocuments?.photo })
    agency?.occupierDocuments?.signature &&
      deleteFile({ fileKey: agency?.occupierDocuments?.signature })
    agency?.applicantIdProof?.electionId &&
      deleteFile({ fileKey: agency?.applicantIdProof?.electionId })
    agency?.applicantIdProof?.drivingLicense &&
      deleteFile({ fileKey: agency?.applicantIdProof?.drivingLicense })
    agency?.applicantIdProof?.aadharCard &&
      deleteFile({ fileKey: agency?.applicantIdProof?.aadharCard })
    agency?.applicantIdProof?.passport &&
      deleteFile({ fileKey: agency?.applicantIdProof?.passport })
    agency?.previousFactoryLicense?.previousFactoryLicense &&
      deleteFile({
        fileKey: agency?.previousFactoryLicense?.previousFactoryLicense,
      })
    agency?.previousFactoryLicense?.planApprovalLetter &&
      deleteFile({
        fileKey: agency?.previousFactoryLicense?.planApprovalLetter,
      })
    agency?.privateLimitedCompany?.moa &&
      deleteFile({ fileKey: agency?.privateLimitedCompany?.moa })
    agency?.privateLimitedCompany?.boardResolution &&
      deleteFile({ fileKey: agency?.privateLimitedCompany?.boardResolution })
    agency?.privateLimitedCompany?.form32 &&
      deleteFile({ fileKey: agency?.privateLimitedCompany?.form32 })
    agency?.listOfRawMaterials?.listOfRawMaterials &&
      deleteFile({ fileKey: agency?.listOfRawMaterials?.listOfRawMaterials })
    agency?.ownershipDocuments?.leaveAndLicenseAgreement &&
      deleteFile({
        fileKey: agency?.ownershipDocuments?.leaveAndLicenseAgreement,
      })
    agency?.ownershipDocuments?.midcAllotmentLetter &&
      deleteFile({ fileKey: agency?.ownershipDocuments?.midcAllotmentLetter })
    agency?.ownershipDocuments?.sevenTwelveExtract &&
      deleteFile({ fileKey: agency?.ownershipDocuments?.sevenTwelveExtract })
    agency?.ownershipDocuments?.taxReceipt &&
      deleteFile({ fileKey: agency?.ownershipDocuments?.taxReceipt })
    agency?.localAuthorityNoC?.localAuthorityNoC &&
      deleteFile({ fileKey: agency?.localAuthorityNoC?.localAuthorityNoC })
    agency?.localAuthorityNoC?.corporationNoC &&
      deleteFile({ fileKey: agency?.localAuthorityNoC?.corporationNoC })
    agency?.localAuthorityNoC?.grampanchayatNoC &&
      deleteFile({ fileKey: agency?.localAuthorityNoC?.grampanchayatNoC })
    agency?.localAuthorityNoC?.midcNoC &&
      deleteFile({ fileKey: agency?.localAuthorityNoC?.midcNoC })
    agency?.mpcbConsent?.mpcbConsent &&
      deleteFile({ fileKey: agency?.mpcbConsent?.mpcbConsent })
    agency?.sketchFactory?.sketch &&
      deleteFile({ fileKey: agency?.sketchFactory?.sketch })
    agency?.electricityBill?.electricityBill &&
      deleteFile({ fileKey: agency?.electricityBill?.electricityBill })
    agency?.electricityBill?.loadSanctionletter &&
      deleteFile({ fileKey: agency?.electricityBill?.loadSanctionletter })
    agency?.acceptanceLetter?.acceptanceLetter &&
      deleteFile({ fileKey: agency?.acceptanceLetter?.acceptanceLetter })
    agency?.flowChart?.flowChart &&
      deleteFile({ fileKey: agency?.flowChart?.flowChart })
    await Agency.findByIdAndDelete({
      _id: id,
    })

    return agency
  } catch (error) {
    console.error('Error deleting agency:', error)
    throw new Error('Error deleting agency')
  }
}
export const updateDocument = async (
  id: string,
  documentPath: string,
  newDocument: string
) => {
  try {
    await connectDB()
    const agency = await Agency.findOne({ id })
    let doc = agency?.[documentPath]
    await deleteFile(doc)
    doc = newDocument
    await Agency.findByIdAndUpdate(
      agency?._id,
      {
        $set: {
          [documentPath]: doc,
        },
      },
      { new: true }
    )
  } catch (error) {
    console.error('Error updating document:', error)
    throw new Error('Error updating document')
  }
}

const deleteFile = async ({ fileKey }: { fileKey: string | string[] }) => {
  try {
    const result = await utapi.deleteFiles(
      fileKey
    )
    console.log(result, 'result')
    return result
  } catch (error) {
    console.error('Error deleting file:', error)
    throw new Error('Error deleting file')
  }
}

// to do
export const getFactoryLicense = async (id: string): Promise<IFactoryLicenseDetails | null> => {
  try {
    await connectDB()
    const factoryLicense = await Agency.findOne({ _id: id })
      .populate('user')
      .lean()
      .exec()
    return factoryLicense as IFactoryLicenseDetails | null
  } catch (error) {
    console.error('Error getting factory license:', error)
    throw new Error('Error getting factory license')
  }
}

export const getAgenciesByUser = async (userId: string) => {
  try {
    await connectDB()
    const agencies = await Agency.find({ user: userId })
      .populate('user')
      .lean()
      .exec()
    return JSON.parse(JSON.stringify(agencies))
  } catch (error) {
    console.error('Error getting agencies:', error)
    throw new Error('Error getting agencies')
  }
}

// ============================================
// PLAN APPROVAL CRUD OPERATIONS
// ============================================

export const upsertPlanApproval = async (planApprovalData: Partial<IPlanApproval>) => {
  try {
    console.log('inside the upsertPlanApproval', planApprovalData)
    let planApproval = await PlanApproval.findOne({ _id: planApprovalData._id })
    if (planApproval) {
      // Update existing plan approval
      planApproval = await PlanApproval.findByIdAndUpdate(
        planApproval._id,
        {
          $set: {
            ...planApprovalData,
            applicationForm: planApprovalData.applicationForm,
            siteLayout: planApprovalData.siteLayout,
            buildingPlan: planApprovalData.buildingPlan,
            machineryLayout: planApprovalData.machineryLayout,
            structuralDrawings: planApprovalData.structuralDrawings,
            ventilationPlan: planApprovalData.ventilationPlan,
            safetyMeasures: planApprovalData.safetyMeasures,
            landOwnership: planApprovalData.landOwnership,
            soilTest: planApprovalData.soilTest,
            environmentClearance: planApprovalData.environmentClearance,
            nabh1approval: planApprovalData.nabh1approval,
            otherDocuments: planApprovalData.otherDocuments,
          },
        },
        { new: true }
      )
    } else {
      // Create new plan approval
      planApproval = new PlanApproval({
        ...planApprovalData,
        applicationForm: planApprovalData.applicationForm,
        siteLayout: planApprovalData.siteLayout,
        buildingPlan: planApprovalData.buildingPlan,
        machineryLayout: planApprovalData.machineryLayout,
        structuralDrawings: planApprovalData.structuralDrawings,
        ventilationPlan: planApprovalData.ventilationPlan,
        safetyMeasures: planApprovalData.safetyMeasures,
        landOwnership: planApprovalData.landOwnership,
        soilTest: planApprovalData.soilTest,
        environmentClearance: planApprovalData.environmentClearance,
        nabh1approval: planApprovalData.nabh1approval,
        otherDocuments: planApprovalData.otherDocuments,
        user: planApprovalData.user,
      })
      await planApproval.save()
    }
    return JSON.stringify(planApproval)
  } catch (error) {
    console.log(error)
  }
}

// Get all plan approvals
export const getPlanApprovals = async () => {
  try {
    await connectDB()
    const planApprovals = await PlanApproval.find({})
      .populate('user')
      .lean()
      .exec()
    const plainPlanApprovals = JSON.parse(JSON.stringify(planApprovals))
    return plainPlanApprovals
  } catch (error) {
    console.error('Error getting plan approvals:', error)
    throw new Error('Error getting plan approvals')
  }
}

// Get single plan approval by ID
export const getPlanApproval = async (id: string): Promise<IPlanApproval | null> => {
  try {
    await connectDB()
    const planApproval = await PlanApproval.findOne({ _id: id })
      .populate('user')
      .lean()
      .exec()
    return planApproval as IPlanApproval | null
  } catch (error) {
    console.error('Error getting plan approval:', error)
    throw new Error('Error getting plan approval')
  }
}

// Delete plan approval and all associated files
export const deletePlanApproval = async (id: string) => {
  try {
    await connectDB()
    const planApproval = await PlanApproval.findById({ id })
    if (!planApproval) return 'Plan approval not found'

    // Delete all uploaded files from UploadThing
    planApproval?.applicationForm &&
      deleteFile({ fileKey: planApproval.applicationForm })
    planApproval?.siteLayout &&
      deleteFile({ fileKey: planApproval.siteLayout })
    planApproval?.buildingPlan &&
      deleteFile({ fileKey: planApproval.buildingPlan })
    planApproval?.machineryLayout &&
      deleteFile({ fileKey: planApproval.machineryLayout })
    planApproval?.structuralDrawings &&
      deleteFile({ fileKey: planApproval.structuralDrawings })
    planApproval?.ventilationPlan &&
      deleteFile({ fileKey: planApproval.ventilationPlan })
    planApproval?.safetyMeasures &&
      deleteFile({ fileKey: planApproval.safetyMeasures })
    planApproval?.landOwnership &&
      deleteFile({ fileKey: planApproval.landOwnership })
    planApproval?.soilTest &&
      deleteFile({ fileKey: planApproval.soilTest })
    planApproval?.environmentClearance &&
      deleteFile({ fileKey: planApproval.environmentClearance })
    planApproval?.nabh1approval &&
      deleteFile({ fileKey: planApproval.nabh1approval })
    planApproval?.otherDocuments &&
      deleteFile({ fileKey: planApproval.otherDocuments })

    // Delete the plan approval document from database
    await PlanApproval.findByIdAndDelete({ _id: id })

    return planApproval
  } catch (error) {
    console.error('Error deleting plan approval:', error)
    throw new Error('Error deleting plan approval')
  }
}

// Update a specific document in plan approval
export const updatePlanApprovalDocument = async (
  id: string,
  documentPath: string,
  newDocument: string
) => {
  try {
    await connectDB()
    const planApproval = await PlanApproval.findOne({ id })
    let doc = planApproval?.[documentPath]
    await deleteFile(doc)
    doc = newDocument
    await PlanApproval.findByIdAndUpdate(
      planApproval?._id,
      {
        $set: {
          [documentPath]: doc,
        },
      },
      { new: true }
    )
  } catch (error) {
    console.error('Error updating plan approval document:', error)
    throw new Error('Error updating plan approval document')
  }
}

// Get plan approvals by user
export const getPlanApprovalsByUser = async (userId: string) => {
  try {
    await connectDB()
    const planApprovals = await PlanApproval.find({ user: userId })
      .populate('user')
      .lean()
      .exec()
    return JSON.parse(JSON.stringify(planApprovals))
  } catch (error) {
    console.error('Error getting plan approvals by user:', error)
    throw new Error('Error getting plan approvals by user')
  }
}

// ============================================
// STABILITY CERTIFICATE CRUD OPERATIONS
// ============================================

export const upsertStabilityCertificate = async (data: Partial<IStabilityCertificate>) => {
  try {
    console.log('inside upsertStabilityCertificate', data)
    await connectDB()

    let stabilityCertificate;

    // Only try to find existing if _id is provided
    if (data._id) {
      stabilityCertificate = await StabilityCertificate.findOne({ _id: data._id })
    }

    if (stabilityCertificate) {
      // Update existing
      stabilityCertificate = await StabilityCertificate.findByIdAndUpdate(
        stabilityCertificate._id,
        {
          $set: {
            stabilityCertificate: data.stabilityCertificate,
            structuralDesign: data.structuralDesign,
            approvedDrawings: data.approvedDrawings,
            materialCertificates: data.materialCertificates,
            inspectionReport: data.inspectionReport,
            selfDeclaration: data.selfDeclaration,
            photographs: data.photographs,
            factoryLicenseProof: data.factoryLicenseProof,
            directorsList: data.directorsList,
            ownershipProof: data.ownershipProof,
            user: data.user,
          },
        },
        { new: true }
      )
    } else {
      // Create new
      stabilityCertificate = new StabilityCertificate({
        stabilityCertificate: data.stabilityCertificate,
        structuralDesign: data.structuralDesign,
        approvedDrawings: data.approvedDrawings,
        materialCertificates: data.materialCertificates,
        inspectionReport: data.inspectionReport,
        selfDeclaration: data.selfDeclaration,
        photographs: data.photographs,
        factoryLicenseProof: data.factoryLicenseProof,
        directorsList: data.directorsList,
        ownershipProof: data.ownershipProof,
        user: data.user,
      })
      await stabilityCertificate.save()
      console.log('New stability certificate created:', stabilityCertificate._id)
    }

    return JSON.stringify(stabilityCertificate)
  } catch (error) {
    console.error('Error in upsertStabilityCertificate:', error)
    throw error
  }
}

// Get all stability certificates
export const getStabilityCertificates = async () => {
  try {
    await connectDB()
    const stabilityCertificates = await StabilityCertificate.find({})
      .populate('user')
      .lean()
      .exec()
    const plainStabilityCertificates = JSON.parse(JSON.stringify(stabilityCertificates))
    return plainStabilityCertificates
  } catch (error) {
    console.error('Error getting stability certificates:', error)
    throw new Error('Error getting stability certificates')
  }
}

// Get single stability certificate by ID
export const getStabilityCertificate = async (id: string): Promise<IStabilityCertificate | null> => {
  try {
    await connectDB()
    const stabilityCertificate = await StabilityCertificate.findOne({ _id: id })
      .populate('user')
      .lean()
      .exec()
    return stabilityCertificate as IStabilityCertificate | null
  } catch (error) {
    console.error('Error getting stability certificate:', error)
    throw new Error('Error getting stability certificate')
  }
}

// Delete stability certificate and all associated files
export const deleteStabilityCertificate = async (id: string) => {
  try {
    await connectDB()
    const stabilityCertificate = await StabilityCertificate.findById({ id })
    if (!stabilityCertificate) return 'Stability certificate not found'

    // Delete all uploaded files from UploadThing
    stabilityCertificate?.stabilityCertificate &&
      deleteFile({ fileKey: stabilityCertificate.stabilityCertificate })
    stabilityCertificate?.structuralDesign &&
      deleteFile({ fileKey: stabilityCertificate.structuralDesign })
    stabilityCertificate?.approvedDrawings &&
      deleteFile({ fileKey: stabilityCertificate.approvedDrawings })
    stabilityCertificate?.materialCertificates &&
      deleteFile({ fileKey: stabilityCertificate.materialCertificates })
    stabilityCertificate?.inspectionReport &&
      deleteFile({ fileKey: stabilityCertificate.inspectionReport })
    stabilityCertificate?.selfDeclaration &&
      deleteFile({ fileKey: stabilityCertificate.selfDeclaration })
    stabilityCertificate?.photographs &&
      deleteFile({ fileKey: stabilityCertificate.photographs })
    stabilityCertificate?.factoryLicenseProof &&
      deleteFile({ fileKey: stabilityCertificate.factoryLicenseProof })
    stabilityCertificate?.directorsList &&
      deleteFile({ fileKey: stabilityCertificate.directorsList })
    stabilityCertificate?.ownershipProof &&
      deleteFile({ fileKey: stabilityCertificate.ownershipProof })

    // Delete the stability certificate document from database
    await StabilityCertificate.findByIdAndDelete({ _id: id })

    return stabilityCertificate
  } catch (error) {
    console.error('Error deleting stability certificate:', error)
    throw new Error('Error deleting stability certificate')
  }
}

// Update a specific document in stability certificate
export const updateStabilityCertificateDocument = async (
  id: string,
  documentPath: string,
  newDocument: string
) => {
  try {
    await connectDB()
    const stabilityCertificate = await StabilityCertificate.findOne({ id })
    let doc = stabilityCertificate?.[documentPath]
    await deleteFile(doc)
    doc = newDocument
    await StabilityCertificate.findByIdAndUpdate(
      stabilityCertificate?._id,
      {
        $set: {
          [documentPath]: doc,
        },
      },
      { new: true }
    )
  } catch (error) {
    console.error('Error updating stability certificate document:', error)
    throw new Error('Error updating stability certificate document')
  }
}

// Get stability certificates by user
export const getStabilityCertificatesByUser = async (userId: string) => {
  try {
    await connectDB()
    const stabilityCertificates = await StabilityCertificate.find({ user: userId })
      .populate('user')
      .lean()
      .exec()
    return JSON.parse(JSON.stringify(stabilityCertificates))
  } catch (error) {
    console.error('Error getting stability certificates by user:', error)
    throw new Error('Error getting stability certificates by user')
  }
}

// ============================================
// SAFETY AUDIT REPORT CRUD OPERATIONS
// ============================================

export const upsertSafetyAuditReport = async (data: Partial<ISafetyAuditReport>) => {
  try {
    console.log('inside upsertSafetyAuditReport', data)
    await connectDB()

    let safetyAuditReport;

    // Only try to find existing if _id is provided
    if (data._id) {
      safetyAuditReport = await SafetyAuditReport.findOne({ _id: data._id })
    }

    if (safetyAuditReport) {
      // Update existing
      safetyAuditReport = await SafetyAuditReport.findByIdAndUpdate(
        safetyAuditReport._id,
        {
          $set: {
            auditReport: data.auditReport,
            user: data.user,
          },
        },
        { new: true }
      )
    } else {
      // Create new
      safetyAuditReport = new SafetyAuditReport({
        auditReport: data.auditReport,
        user: data.user,
      })
      await safetyAuditReport.save()
      console.log('New safety audit report created:', safetyAuditReport._id)
    }

    return JSON.stringify(safetyAuditReport)
  } catch (error) {
    console.error('Error in upsertSafetyAuditReport:', error)
    throw error
  }
}

// Get all safety audit reports
export const getSafetyAuditReports = async () => {
  try {
    await connectDB()
    const safetyAuditReports = await SafetyAuditReport.find({})
      .populate('user')
      .lean()
      .exec()
    const plainSafetyAuditReports = JSON.parse(JSON.stringify(safetyAuditReports))
    return plainSafetyAuditReports
  } catch (error) {
    console.error('Error getting safety audit reports:', error)
    throw new Error('Error getting safety audit reports')
  }
}

// Get single safety audit report by ID
export const getSafetyAuditReport = async (id: string): Promise<ISafetyAuditReport | null> => {
  try {
    await connectDB()
    const safetyAuditReport = await SafetyAuditReport.findOne({ _id: id })
      .populate('user')
      .lean()
      .exec()
    return safetyAuditReport as ISafetyAuditReport | null
  } catch (error) {
    console.error('Error getting safety audit report:', error)
    throw new Error('Error getting safety audit report')
  }
}

// Delete safety audit report and associated file
export const deleteSafetyAuditReport = async (id: string) => {
  try {
    await connectDB()
    const safetyAuditReport = await SafetyAuditReport.findById({ id })
    if (!safetyAuditReport) return 'Safety audit report not found'

    // Delete uploaded file from UploadThing
    safetyAuditReport?.auditReport &&
      deleteFile({ fileKey: safetyAuditReport.auditReport })

    // Delete the safety audit report document from database
    await SafetyAuditReport.findByIdAndDelete({ _id: id })

    return safetyAuditReport
  } catch (error) {
    console.error('Error deleting safety audit report:', error)
    throw new Error('Error deleting safety audit report')
  }
}

// Update the audit report document
export const updateSafetyAuditReportDocument = async (
  id: string,
  newDocument: string
) => {
  try {
    await connectDB()
    const safetyAuditReport = await SafetyAuditReport.findOne({ id })
    let doc = safetyAuditReport?.auditReport
    await deleteFile(doc)
    doc = newDocument
    await SafetyAuditReport.findByIdAndUpdate(
      safetyAuditReport?._id,
      {
        $set: {
          auditReport: doc,
        },
      },
      { new: true }
    )
  } catch (error) {
    console.error('Error updating safety audit report document:', error)
    throw new Error('Error updating safety audit report document')
  }
}

// Get safety audit reports by user
export const getSafetyAuditReportsByUser = async (userId: string) => {
  try {
    await connectDB()
    const safetyAuditReports = await SafetyAuditReport.find({ user: userId })
      .populate('user')
      .lean()
      .exec()
    return JSON.parse(JSON.stringify(safetyAuditReports))
  } catch (error) {
    console.error('Error getting safety audit reports by user:', error)
    throw new Error('Error getting safety audit reports by user')
  }
}

// ============================================
// CONSENT TO ESTABLISH CRUD OPERATIONS
// ============================================

export const upsertConsentToEstablish = async (data: Partial<IConsentToEstablish>) => {
  try {
    console.log('inside upsertConsentToEstablish', data)
    await connectDB()

    let consentToEstablish;

    // Only try to find existing if _id is provided
    if (data._id) {
      consentToEstablish = await ConsentToEstablish.findOne({ _id: data._id })
    }

    if (consentToEstablish) {
      // Update existing
      consentToEstablish = await ConsentToEstablish.findByIdAndUpdate(
        consentToEstablish._id,
        {
          $set: {
            applicationForm: data.applicationForm,
            dpr: data.dpr,
            sitePlan: data.sitePlan,
            geoMap: data.geoMap,
            processDescription: data.processDescription,
            landOwnership: data.landOwnership,
            localApproval: data.localApproval,
            capitalInvestmentProof: data.capitalInvestmentProof,
            nocFromAuthority: data.nocFromAuthority,
            industryRegistration: data.industryRegistration,
            pollutionControl: data.pollutionControl,
            emp: data.emp,
            powerWaterSanction: data.powerWaterSanction,
            boardResolution: data.boardResolution,
            affidavit: data.affidavit,
            user: data.user,
          },
        },
        { new: true }
      )
    } else {
      // Create new
      consentToEstablish = new ConsentToEstablish({
        applicationForm: data.applicationForm,
        dpr: data.dpr,
        sitePlan: data.sitePlan,
        geoMap: data.geoMap,
        processDescription: data.processDescription,
        landOwnership: data.landOwnership,
        localApproval: data.localApproval,
        capitalInvestmentProof: data.capitalInvestmentProof,
        nocFromAuthority: data.nocFromAuthority,
        industryRegistration: data.industryRegistration,
        pollutionControl: data.pollutionControl,
        emp: data.emp,
        powerWaterSanction: data.powerWaterSanction,
        boardResolution: data.boardResolution,
        affidavit: data.affidavit,
        user: data.user,
      })
      await consentToEstablish.save()
      console.log('New consent to establish created:', consentToEstablish._id)
    }

    return JSON.stringify(consentToEstablish)
  } catch (error) {
    console.error('Error in upsertConsentToEstablish:', error)
    throw error
  }
}

// Get all consent to establish documents
export const getConsentToEstablishDocuments = async () => {
  try {
    await connectDB()
    const documents = await ConsentToEstablish.find({})
      .populate('user')
      .lean()
      .exec()
    const plainDocuments = JSON.parse(JSON.stringify(documents))
    return plainDocuments
  } catch (error) {
    console.error('Error getting consent to establish documents:', error)
    throw new Error('Error getting consent to establish documents')
  }
}

// Get single consent to establish document by ID
export const getConsentToEstablish = async (id: string): Promise<IConsentToEstablish | null> => {
  try {
    await connectDB()
    const document = await ConsentToEstablish.findOne({ _id: id })
      .populate('user')
      .lean()
      .exec()
    return document as IConsentToEstablish | null
  } catch (error) {
    console.error('Error getting consent to establish:', error)
    throw new Error('Error getting consent to establish')
  }
}

// Delete consent to establish and all associated files
export const deleteConsentToEstablish = async (id: string) => {
  try {
    await connectDB()
    const consentToEstablish = await ConsentToEstablish.findById({ id })
    if (!consentToEstablish) return 'Consent to establish not found'

    // Delete all uploaded files from UploadThing
    consentToEstablish?.applicationForm &&
      deleteFile({ fileKey: consentToEstablish.applicationForm })
    consentToEstablish?.dpr &&
      deleteFile({ fileKey: consentToEstablish.dpr })
    consentToEstablish?.sitePlan &&
      deleteFile({ fileKey: consentToEstablish.sitePlan })
    consentToEstablish?.geoMap &&
      deleteFile({ fileKey: consentToEstablish.geoMap })
    consentToEstablish?.processDescription &&
      deleteFile({ fileKey: consentToEstablish.processDescription })
    consentToEstablish?.landOwnership &&
      deleteFile({ fileKey: consentToEstablish.landOwnership })
    consentToEstablish?.localApproval &&
      deleteFile({ fileKey: consentToEstablish.localApproval })
    consentToEstablish?.capitalInvestmentProof &&
      deleteFile({ fileKey: consentToEstablish.capitalInvestmentProof })
    consentToEstablish?.nocFromAuthority &&
      deleteFile({ fileKey: consentToEstablish.nocFromAuthority })
    consentToEstablish?.industryRegistration &&
      deleteFile({ fileKey: consentToEstablish.industryRegistration })
    consentToEstablish?.pollutionControl &&
      deleteFile({ fileKey: consentToEstablish.pollutionControl })
    consentToEstablish?.emp &&
      deleteFile({ fileKey: consentToEstablish.emp })
    consentToEstablish?.powerWaterSanction &&
      deleteFile({ fileKey: consentToEstablish.powerWaterSanction })
    consentToEstablish?.boardResolution &&
      deleteFile({ fileKey: consentToEstablish.boardResolution })
    consentToEstablish?.affidavit &&
      deleteFile({ fileKey: consentToEstablish.affidavit })

    // Delete the consent to establish document from database
    await ConsentToEstablish.findByIdAndDelete({ _id: id })

    return consentToEstablish
  } catch (error) {
    console.error('Error deleting consent to establish:', error)
    throw new Error('Error deleting consent to establish')
  }
}

// Update a specific document in consent to establish
export const updateConsentToEstablishDocument = async (
  id: string,
  documentPath: string,
  newDocument: string
) => {
  try {
    await connectDB()
    const consentToEstablish = await ConsentToEstablish.findOne({ id })
    let doc = consentToEstablish?.[documentPath]
    await deleteFile(doc)
    doc = newDocument
    await ConsentToEstablish.findByIdAndUpdate(
      consentToEstablish?._id,
      {
        $set: {
          [documentPath]: doc,
        },
      },
      { new: true }
    )
  } catch (error) {
    console.error('Error updating consent to establish document:', error)
    throw new Error('Error updating consent to establish document')
  }
}

// Get consent to establish documents by user
export const getConsentToEstablishByUser = async (userId: string) => {
  try {
    await connectDB()
    const documents = await ConsentToEstablish.find({ user: userId })
      .populate('user')
      .lean()
      .exec()
    return JSON.parse(JSON.stringify(documents))
  } catch (error) {
    console.error('Error getting consent to establish by user:', error)
    throw new Error('Error getting consent to establish by user')
  }
}