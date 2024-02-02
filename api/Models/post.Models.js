import mongoose from "mongoose";


const postSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    Content:{
        type:String,
        required:true,
        
    },
    img:{
        type:String,
        default:"https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png"
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming your User model is named 'User'
        required: true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    }
    
},{timestamps:true})



const postModel = mongoose.model("post",postSchema);
export default postModel;