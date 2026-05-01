import mongoose from 'mongoose'
mongoose.set("bufferCommands", false);
const dbConnection = mongoose.connect("mongodb://127.0.0.1:27017/activityDB", {
    serverSelectionTimeoutMS: 3000
});
const userSchema = new mongoose.Schema({
    username: String,
    loginTime: Date,
    logoutTime: Date,
    lastActive: Date
});
userSchema.pre("save", function() {
    this.lastActive = new Date();
});

const User = mongoose.model("User", userSchema);
const loginUser = async () => {
    await dbConnection;
    const user = new User({
        username: "Sarthak",
        loginTime: new Date()
    });

    await user.save();
    console.log("User logged in");
};

const logoutUser = async (id) => {
    await User.findByIdAndUpdate(
        id,
        {
            logoutTime: new Date(),
            lastActive: new Date()
        }
    );
    console.log("User logged out");
};
loginUser()
    .catch((error) => {
        console.log("Login failed:", error.message);
    })
    .finally(async () => {
        await mongoose.connection.close();
    });
