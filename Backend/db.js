import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}
