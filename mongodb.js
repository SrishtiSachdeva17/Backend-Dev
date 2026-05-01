import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const url = process.env.URL || process.env.MONGO_URL || process.env.MONGODB_URI;

if (url) {
    mongoose.connect(url)
        .then(() => {
            console.log("db connected");
        })
        .catch((err) => {
            console.log("connection ", err.message);
        });
} else {
    console.log("MongoDB URL missing. Add URL, MONGO_URL, or MONGODB_URI in .env");
}
    
export default mongoose; 



