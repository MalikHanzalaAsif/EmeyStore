import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

// Regular expression for validating email format
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Full Name Is Required"]
    },
    email: {
        type: String,
        required: [true, "Email Is Required"],
        unique: [true, "Email Already Exists!"],
        trim: true,
        match: [emailRegex, "Invalid Email Format!"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;