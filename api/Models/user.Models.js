import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})
userSchema.pre('save', async function (next) {
    // Only hash the password if it's new or has been modified
    if (this.isNew || this.isModified('password')) {
        try {
            // Generate a salt
            const salt = await bcrypt.genSalt(10);

            // Hash the password using the generated salt
            const hashedPassword = await bcrypt.hash(this.password, salt);

            // Set the hashed password back to the model
            this.password = hashedPassword;
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        // If the password hasn't changed, continue to the next middleware
        next();
    }
});
userSchema.methods.checkPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

const userModel = mongoose.model("User",userSchema);
export default userModel;