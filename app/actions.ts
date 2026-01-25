'use server'

import { ObjectId } from 'mongodb'
import { revalidatePath } from 'next/cache'

import { getHashedPassword } from '@/app/lib/hash'
import { getDb } from '@/app/lib/mongodb'

export async function updateOrganisation(orgId: string, data: any) {
  try {
    const db = await getDb()
    await db.collection('organisations').updateOne(
      { _id: new ObjectId(orgId) },
      {
        $set: {
          female_capacity: parseInt(data.female_capacity),
          female_pending: parseInt(data.female_pending),
          female_available: parseInt(data.female_available),
          male_capacity: parseInt(data.male_capacity),
          male_pending: parseInt(data.male_pending),
          male_available: parseInt(data.male_available),
          special_prog_female_capacity: data.special_prog_female_capacity
            ? parseInt(data.special_prog_female_capacity)
            : null,
          special_prog_female_pending: data.special_prog_female_pending
            ? parseInt(data.special_prog_female_pending)
            : null,
          special_prog_female_available: data.special_prog_female_available
            ? parseInt(data.special_prog_female_available)
            : null,
          special_prog_male_capacity: data.special_prog_male_capacity
            ? parseInt(data.special_prog_male_capacity)
            : null,
          special_prog_male_pending: data.special_prog_male_pending
            ? parseInt(data.special_prog_male_pending)
            : null,
          special_prog_male_available: data.special_prog_male_available
            ? parseInt(data.special_prog_male_available)
            : null,
          special_remarks: data.special_remarks,
          last_updated: new Date(),
        },
      },
    )
    revalidatePath('/')
    return { success: true }
  } catch (e) {
    console.error(e)
    return { success: false, error: 'Failed to update' }
  }
}

export async function adminUpdateOrganisations(updates: any[]) {
  try {
    const db = await getDb()
    const bulkOps = updates.map((update) => ({
      updateOne: {
        filter: { _id: new ObjectId(update._id) },
        update: {
          $set: {
            female_capacity: parseInt(update.female_capacity),
            female_pending: parseInt(update.female_pending),
            female_available: parseInt(update.female_available),
            male_capacity: parseInt(update.male_capacity),
            male_pending: parseInt(update.male_pending),
            male_available: parseInt(update.male_available),
            special_prog_female_capacity: update.special_prog_female_capacity
              ? parseInt(update.special_prog_female_capacity)
              : null,
            special_prog_female_pending: update.special_prog_female_pending
              ? parseInt(update.special_prog_female_pending)
              : null,
            special_prog_female_available: update.special_prog_female_available
              ? parseInt(update.special_prog_female_available)
              : null,
            special_prog_male_capacity: update.special_prog_male_capacity
              ? parseInt(update.special_prog_male_capacity)
              : null,
            special_prog_male_pending: update.special_prog_male_pending
              ? parseInt(update.special_prog_male_pending)
              : null,
            special_prog_male_available: update.special_prog_male_available
              ? parseInt(update.special_prog_male_available)
              : null,
            special_remarks: update.special_remarks,
            last_updated: new Date(),
          },
        },
      },
    }))

    if (bulkOps.length > 0) {
      await db.collection('organisations').bulkWrite(bulkOps)
    }

    revalidatePath('/')
    return { success: true }
  } catch (e) {
    console.error(e)
    return { success: false, error: 'Failed to update' }
  }
}

export async function changeUserPassword(email: string, newPassword: string) {
  try {
    const db = await getDb()
    const hash = getHashedPassword(newPassword)
    await db
      .collection('users')
      .updateOne({ email }, { $set: { password: hash } })
    return { success: true }
  } catch (_e) {
    return { success: false, error: 'Failed to change password' }
  }
}
