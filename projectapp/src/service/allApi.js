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
// get User Projects
export const userProjectApi = async ( headers,id) => {
    return await commonApi('GET', `${BASE_URL}/user/get-user-projects/${id}`, "", headers);
}

// get All Projects
export const allProjectApi = async (searchData) => {
    return await commonApi('GET', `${BASE_URL}/user/get-all-projects?search=${searchData}`, "","");
}

// get Home Projects
export const homeProjectApi = async () => {
    return await commonApi('GET', `${BASE_URL}/user/get-home-projects`, "","");
}
export const updateProjectApi = async (body, headers, id) => {
    return await commonApi('PUT', `${BASE_URL}/user/edit-project/${id}`, body, headers);
}
// delete project
export const deleteProjectApi = async ( headers,id) => {
    return await commonApi('DELETE', `${BASE_URL}/user/delete-project/${id}`, {}, headers);
}



