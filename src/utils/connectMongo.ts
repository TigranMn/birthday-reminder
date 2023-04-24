import mongoose from 'mongoose'
import process from 'process'

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI!)

export default connectMongo
