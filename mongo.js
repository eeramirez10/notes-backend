/* eslint-disable space-unary-ops */
import mongoose from 'mongoose'
import 'dotenv/config'

const connectionString = process.env.MONGO_DB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString)
    console.log('connected to databse')
  } catch (error) {
    console.log('hubo un error al conectarse a la DB')
  }
}

export default connectDB
