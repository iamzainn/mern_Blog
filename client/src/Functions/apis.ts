import {  getCommentsTotal, getPostsType, getUsersType } from "../Types/types";

export const getUsers = async (startIndex=0,limit=9) => {
    try {
      const response = await fetch(`api/user/getUsers/?startIndex=${startIndex}&limit=${limit}`, {
        method: "GET",
      });
  
      if (response.ok) {
        const data: getUsersType = await response.json();
        return data;
      }
  
      throw new Error("Failed to fetch data");
    } catch (error) {
      throw error;
    }
  };

  export const getComments = async (startIndex=0,limit=9):Promise<getCommentsTotal> => { 
    try {
      const response = await fetch(`/api/comment/getComments/?startIndex=${startIndex}${limit}`, {
        method: "GET",
      });
  
      if (response.ok) {
        const data:getCommentsTotal= await response.json();
        return data;
      }
  
      throw new Error("Failed to fetch data");
    } catch (error) {
       console.log(error);
      throw error;
    }
  };


 export const getPosts = async (userId:string,startIndex=0,limit=9) => {
  
    try {
      const response = await fetch(`api/post/getPosts?userId=${userId}&startIndex=${startIndex}&limit=${limit}`, {
        method: "GET",
      });
  
      if (response.ok) {
        const data: getPostsType = await response.json();
        
        return data;
      }
  
      throw new Error("Failed to fetch data");
    } catch (error) {
      throw error;
    }
  };