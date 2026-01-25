import { ObjectId } from 'mongodb'

export interface User {
  _id: ObjectId
  name: string
  email: string
  password: string
  org_id: string
  role_id: string
}

export interface Organisation {
  _id: ObjectId
  org_name: string | null
  contact: string | null
  order: number | null
  female_capacity: number | null
  female_pending: number | null
  female_available: number | null
  male_capacity: number | null
  male_pending: number | null
  male_available: number | null
  special_prog_name: string | null
  special_prog_female_capacity: number | null
  special_prog_female_pending: number | null
  special_prog_female_available: number | null
  special_prog_male_capacity: number | null
  special_prog_male_pending: number | null
  special_prog_male_available: number | null
  special_remarks: string | null
  last_updated: Date | null
}

export interface SerializedOrganisation
  extends Omit<Organisation, '_id' | 'last_updated'> {
  _id: string
  last_updated: string | null
}
