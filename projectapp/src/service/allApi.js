import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// register
export const registerApi=async(body)=>{
    return await commonApi('POST',`${BASE_URL}/user/register`,body,"")
}
// login
export const loginApi=async(body)=>{
    return await commonApi('POST',`${BASE_URL}/user/login`,body,"")
}
// update
export const updateProfile = async (body, headers, id) => {
    return await commonApi('PUT', `${BASE_URL}/user/update-profile/${id}`, body, headers);
}
// add new project
export const addProjectApi = async (body, headers) => {
    return await commonApi('POST', `${BASE_URL}/user/add-project`, body, headers);
}


