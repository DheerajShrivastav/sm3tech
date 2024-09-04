'use server'
import { useUser } from '@clerk/nextjs'
import { connectDB, db } from './db'
import { User, IUser } from '@/models/user.model'
import { currentUser } from '@clerk/nextjs/server'
import { Agency, IAgency } from '@/models/agency.model'
import { get } from 'http'
import { QueryCache } from 'react-query'
import { UTApi } from 'uploadthing/server'
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
    const plainUser = JSON.parse(JSON.stringify(userData))
    userData = plainUser
    return plainUser
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
        user: getUser(),
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
export const getAgency = async (id: string) => {
  try {
    await connectDB()
    const agency = await Agency.findOne({ _id: id })
      .populate('user')
      .lean()
      .exec()
    const plainAgency = JSON.parse(JSON.stringify(agency))
    return plainAgency
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
    const result = await UTApi.deleteFiles(fileKey)
    return result
  } catch (error) {
    console.error('Error deleting file:', error)
    throw new Error('Error deleting file')
  }
}
