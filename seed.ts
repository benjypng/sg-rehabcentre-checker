import { MongoClient } from 'mongodb'
import { createHash } from 'crypto'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const getHashedPassword = (password: string): string => {
  const sha256 = createHash('sha256')
  const hash = sha256.update(password).digest('base64')
  return hash
}

async function main() {
  const uri = process.env.MONGO_URL
  const dbName = process.env.COLLECTION

  if (!uri) {
    throw new Error('Please set MONGO_URL in your .env.local file')
  }
  if (!dbName) {
    throw new Error('Please set COLLECTION in your .env.local file')
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log('Connected to database')

    const db = client.db(dbName)

    console.log('Clearing existing data...')
    await db.collection('users').deleteMany({})
    await db.collection('organisations').deleteMany({})

    console.log('Seeding Organisations...')
    const orgsData = [
      {
        org_name: 'Rehab Centre A',
        contact: '61234567',
        order: 1,
        female_capacity: 50,
        female_pending: 2,
        female_available: 48,
        male_capacity: 100,
        male_pending: 5,
        male_available: 95,
        special_prog_name: 'Youth Recovery',
        special_prog_female_capacity: 20,
        special_prog_female_pending: 1,
        special_prog_female_available: 19,
        special_prog_male_capacity: 30,
        special_prog_male_pending: 0,
        special_prog_male_available: 30,
        special_remarks: 'Open 24/7',
        last_updated: new Date(),
      },
      {
        org_name: 'Rehab Centre B',
        contact: '69876543',
        order: 2,
        female_capacity: 30,
        female_pending: 0,
        female_available: 30,
        male_capacity: 60,
        male_pending: 10,
        male_available: 50,
        special_prog_name: null,
        special_prog_female_capacity: null,
        special_prog_female_pending: null,
        special_prog_female_available: null,
        special_prog_male_capacity: null,
        special_prog_male_pending: null,
        special_prog_male_available: null,
        special_remarks: 'Renovation ongoing',
        last_updated: new Date(),
      },
    ]

    const insertedOrgs = await db
      .collection('organisations')
      .insertMany(orgsData)
    const orgIds = insertedOrgs.insertedIds

    console.log('Seeding Users...')

    const defaultPasswordHash = getHashedPassword('password123')

    const usersData = [
      {
        name: 'Super Admin',
        email: 'admin@example.com',
        password: defaultPasswordHash,
        org_id: '0',
        role_id: '1',
      },
      {
        name: 'Manager A',
        email: 'manager_a@example.com',
        password: defaultPasswordHash,
        org_id: orgIds[0].toString(),
        role_id: '2',
      },
      {
        name: 'Manager B',
        email: 'manager_b@example.com',
        password: defaultPasswordHash,
        org_id: orgIds[1].toString(),
        role_id: '2',
      },
    ]

    await db.collection('users').insertMany(usersData)

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await client.close()
  }
}

main()
