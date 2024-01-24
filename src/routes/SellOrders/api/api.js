// export const sellorders = "http://localhost:5000/sellorders";
// export const sendOTP    = "http://localhost:5000/sellorders/sendOTP";
// export const verifyOTP  = "http://localhost:5000/sellorders/verifyOTP";
// export const refresh    = "http://localhost:5000/sellorders/refresh";
// export const logout     = "http://localhost:5000/sellorders/logout";

import dotenv from "dotenv";
dotenv.config();

// Prod
export const sellorders = process.env.REACT_APP_API_URL+"sellorders";
export const sendOTP    = process.env.REACT_APP_API_URL+"sellorders/sendOTP";
export const verifyOTP  = process.env.REACT_APP_API_URL+"sellorders/verifyOTP";
export const refresh    = process.env.REACT_APP_API_URL+"sellorders/refresh";
export const logout     = process.env.REACT_APP_API_URL+"sellorders/logout";