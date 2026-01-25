import { MongoClient } from 'mongodb'

if (!process.env.MONGO_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URL"')
}

if (!process.env.COLLECTION) {
  throw new Error('Invalid/Missing environment variable: "COLLECTION"')
}

const uri = process.env.MONGO_URL as string
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDb() {
  const client = await clientPromise
  return client.db(process.env.COLLECTION)
}
