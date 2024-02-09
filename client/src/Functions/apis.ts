import { getUsersType } from "../Types/types";

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