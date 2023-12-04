import axios from "axios";

export const commonApi = async (method, url, reqBody, reqHeader) => {
    try {
        const config = {
            method,
            url,
            data: reqBody,
            headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
        };

        const response = await axios(config);
        return response;
    } catch (error) {
        return error;
    }
};