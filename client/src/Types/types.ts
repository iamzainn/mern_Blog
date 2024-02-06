export type postType = {
    _id:string,
    title:string,
    Category:string,
    Content:string,
    img:string
    createdAt:string,
    updatedAt:string
}
export type getCommentsPerPost = {
    _id:string,
    content:string,
    postId:string,
    userId:string,
    likes:any[],
    numberofLikes:number,
    createdAt:string,
    updatedAt:string
}

export type getCommentCompProps= {
    commentData:getCommentsPerPost
}

export type UserType = {
    _id:string,
    username:string,
    profilePicture:string,
    email:string
}