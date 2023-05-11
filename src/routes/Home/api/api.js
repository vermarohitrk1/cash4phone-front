// Local API
import dotenv from "dotenv";
dotenv.config();

export const getPhones   = process.env.REACT_APP_API_URL+'phones';
export const send_otp    = process.env.REACT_APP_API_URL+"phones/sendOTP";
export const verify_otp  = process.env.REACT_APP_API_URL+"phones/verifyOTP";
export const refresh     = process.env.REACT_APP_API_URL+"phones/refresh";
export const logout      = process.env.REACT_APP_API_URL+"phones/logout";
export const postOrder   = process.env.REACT_APP_API_URL+"phones/order";
export const user        = process.env.REACT_APP_API_URL+"phones/user"




// Production
// export const getPhones   = 'https://backend.cashforphone.in/phones';
// export const send_otp    = process.env.REACT_APP_API_URL+"/phones/sendOTP";
// export const verify_otp  = process.env.REACT_APP_API_URL+"/phones/verifyOTP";
// export const refresh     = process.env.REACT_APP_API_URL+"/phones/refresh";
// export const logout      = process.env.REACT_APP_API_URL+"/phones/logout";
// export const postOrder   = process.env.REACT_APP_API_URL+"/phones/order";
// export const user        = process.env.REACT_APP_API_URL+"/phones/user"