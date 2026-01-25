const mongoClient = require('mongodb').MongoClient

async function connect(mongoUrl, dbName) {
  let client = await mongoClient.connect(mongoUrl)

  // use a database;
  let db = client.db(dbName)
  console.log('MongoDB database connected')
  return db
}
module.exports = {
  connect,
}
