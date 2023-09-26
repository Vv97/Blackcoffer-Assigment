import mongoose from "mongoose";

const mongodbUrl: string =
  "mongodb+srv://vishal:pikkachu@cluster0.flt4e7t.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUrl);
    console.log(`db connected`);
    return "successfully";
  } catch (error) {
    return Promise.reject("failed");
  }
};

export default connectDB;
