
import dotenv from "dotenv";
dotenv.config();

// export const cityAdmin   = 'http://localhost:5000/cityadmin';
// export const sendOTP     = "http://localhost:5000/cityadmin/sendOTP";
// export const verifyOTP   = "http://localhost:5000/cityadmin/verifyOTP";
// export const refresh     = "http://localhost:5000/cityadmin/refresh";
// export const logoutapp   = "http://localhost:5000/cityadmin/logout";

// Prod
export const cityAdmin   = process.env.REACT_APP_API_URL+'cityadmin';
export const sendOTP     = process.env.REACT_APP_API_URL+"cityadmin/sendOTP";
export const verifyOTP   = process.env.REACT_APP_API_URL+"cityadmin/verifyOTP";
export const refresh     = process.env.REACT_APP_API_URL+"cityadmin/refresh";
export const logoutapp   = process.env.REACT_APP_API_URL+"cityadmin/logout";