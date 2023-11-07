/* eslint-disable space-unary-ops */
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

console.log(NODE_ENV)

const connectionString = NODE_ENV !== 'production' ? MONGO_DB_URI_TEST : MONGO_DB_URI

const connectDB = async () => {
  try {
    mongoose.connect(connectionString)
  } catch (error) {
    console.log('hubo un error al conectarse a la DB')
  }
}

export default connectDB
