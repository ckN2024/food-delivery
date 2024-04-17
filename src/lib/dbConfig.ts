import mongoose from "mongoose";

type ConnectionObject = {
    isConnected? : number
}

const connection: ConnectionObject = {}

async function connectDB(): Promise<void> {
    console.log("First entry : isConnected: ", connection.isConnected)
    if(connection.isConnected) {
        console.log("Already connected to database")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI!, {})

        // console.log("db")
        // console.log(db.connections[0])
        connection.isConnected = db.connections[0].readyState
        console.log("isConnected : ", connection.isConnected)

        console.log("DB connected successfully")
    } catch (error) {
        console.log("Database connection failed", error);
        
        process.exit(1)
    }
}

export default connectDB;

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI!)
//         const connection = mongoose.connection;

//         connection.on("connecting", () => {
//             console.log("connecting to MongoDB...");
//         })

//         connection.on("connected", () => {
//             console.log("Connected to MongoDB.")
//         })

//         connection.on("error", (err) => {
//             console.log("MongoDB connection error.");
//             console.log(err);
//             process.exit(); 
//         })
//     } catch (err) {
//         console.log("Something went wrong in MongoDB connection.");
//         console.log(err);
//     }
// }

// export default connectDB;