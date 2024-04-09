import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on("connecting", () => {
            console.log("connecting to MongoDB...");
        })

        connection.on("connected", () => {
            console.log("Connected to MongoDB.")
        })

        connection.on("error", (err) => {
            console.log("MongoDB connection error.");
            console.log(err);
            process.exit(); 
        })
    } catch (err) {
        console.log("Something went wrong in MongoDB connection.");
        console.log(err);
    }
}

export default connectDB;