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
    },
    profilePicture:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    
},{timestamps:true})
userSchema.pre('save', async function (next) {
    
    if (this.isNew || this.isModified('password')) {
        try {
            
            const salt = await bcrypt.genSalt(10);

            
            const hashedPassword = await bcrypt.hash(this.password, salt);

            
            this.password = hashedPassword;
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        
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