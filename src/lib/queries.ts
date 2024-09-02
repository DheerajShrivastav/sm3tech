'use server'
import { useUser } from '@clerk/nextjs'
import { connectDB, db } from './db'
import { User, IUser } from '@/models/user.model'
import { currentUser } from '@clerk/nextjs/server'
import { Agency, IAgency } from '@/models/agency.model'
import { get } from 'http'
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
export const getUser = async () => {
  
  try {
    const user = await currentUser()
    if (!user) return
    await connectDB()
    const userData = await User.findOne({
      email: user.emailAddresses[0].emailAddress,
    })
      .lean()
      .exec()
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
    return agencies
  } catch (error) {
    console.error('Error getting agencies:', error)
    throw new Error('Error getting agencies')
  }
}
