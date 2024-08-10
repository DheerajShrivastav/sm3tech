import { Agency, IAgency } from '@/models/agency.model'
export const createAgency = async (newAgency: Partial<IAgency>) => {
  try {
    const agency = await Agency.create(newAgency)
    if (!agency) return 'Error in creating agency'
    return agency
  } catch (error) {
    return ('Error in creating agency')
  }
}
export const editAgency = async (agencyId: string, updatedAgency: Partial<IAgency>) => {
    try {
        const agency = await Agency.findByIdAndUpdate(agencyId, updatedAgency, { new: true })
        if (!agency) return 'Agency not found'
        return agency
    } catch (error) {
        return ("Agency not found or error in updating")
    }
    }
export const deleteAgency = async (agencyId: string) =>{
    try {
        if (!agencyId) return 'Agency ID is required'
        const agency = await Agency.findByIdAndDelete(agencyId)
        return agency
    } catch (error) {
        return ("Agency not found or error in deletion while deleting")
    }
}
