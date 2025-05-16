import { connect } from "mongoose";
import { config } from "dotenv";

config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    await connect(mongoUri);
  } catch (error) {
    console.error("Error connection to DB", error);
    process.exit(1);
  }
};

export default connectDB;
