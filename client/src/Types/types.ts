import { RefetchOptions, RefetchQueryFilters } from "react-query"

export type postType = {
    _id:string,
    title:string,
    Category:string,
    Content:string,
    img:string
    slug:string
    createdAt:string,
    updatedAt:string
}
export type PostCardType=  {
    post :postType
}
export type getCommentsPerPost = {
    _id:string,
    content:string,
    postId:string,
    userId:string,
    likes:any[],
    numberOfLikes:number,
    createdAt:string,
    updatedAt:string
}

export type getCommentCompProps= {
    commentData:getCommentsPerPost,
    refetch : <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<any>
}

export type UserType = {
    _id:string,
    username:string,
    profilePicture:string,
    email:string
    isAdmin:boolean,
    
}
export type getCommentsTotal = {
    comments :getCommentsPerPost[],
    totalComments : number,
    lastMonthComments:number
}