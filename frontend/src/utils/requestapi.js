
import apiClient from "./apiclient";




export const logIn=async (payload)=>{
    try {
        const response = await apiClient.post("/api/auth/login", payload );
        // console.log(response)
        return response; 
    } catch (error) {
        throw error
    }
}


export const registerUser=async (payload)=>{
    try {
        const response = await apiClient.post("/api/auth/register", payload );
        
        return response; 
    } catch (error) {
        throw error
    }
}
export const registerCampaign=async (payload)=>{
    try {
        const response = await apiClient.post("/api/auth/addcampaign", payload );
        
        return response; 
    } catch (error) {
        throw error
    }
}
export const getCampaigns=async (payload)=>{
    try {
        const response = await apiClient.get(`/api/auth/getcampaign/${payload}`);
        // console.log(response)
        return response; 
    } catch (error) {
        throw error
    }
}
export const updateCampaign=async (id,payload)=>{
    try {
        const response = await apiClient.post(`/api/auth/updatecampaign/${id}`,payload);
        // console.log(response)
        return response; 
    } catch (error) {
        throw error
    }
}
export const uploadFile=async (id,payload)=>{
    try {
        const response = await apiClient.post(`/upload/${id}`,payload);
        // console.log(response)
        return response; 
    } catch (error) {
        throw error
    }
}

