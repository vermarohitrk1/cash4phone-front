// Local 

import dotenv from "dotenv";
dotenv.config();

export const sales               = process.env.REACT_APP_API_URL+"admin/sales";
export const purchase            = process.env.REACT_APP_API_URL+"admin/purchase";
export const stock               = process.env.REACT_APP_API_URL+"admin/stock";
export const phones              = process.env.REACT_APP_API_URL+"admin/phones";
export const searchPhones        = process.env.REACT_APP_API_URL+"admin/searchPhones";
export const purchaseFile        = process.env.REACT_APP_API_URL+"admin/purchaseFile";
export const logoutapp           = process.env.REACT_APP_API_URL+"admin/logout";
export const sendOTP             = process.env.REACT_APP_API_URL+"admin/sendOTP";
export const verifyOTP           = process.env.REACT_APP_API_URL+"admin/verifyOTP";
export const refresh             = process.env.REACT_APP_API_URL+"admin/refresh";
export const deleteNotification  = process.env.REACT_APP_API_URL+"admin/notification";
export const websiteStock        = process.env.REACT_APP_API_URL+"admin/websiteStock";
export const orders              = process.env.REACT_APP_API_URL+"admin/orders";
export const product             = process.env.REACT_APP_API_URL+"admin/product";
export const buyStockFile        = process.env.REACT_APP_API_URL+"admin/buyStockFile";
export const sellorders          = process.env.REACT_APP_API_URL+"sellorders";
export const login               = process.env.REACT_APP_API_URL+"admin/login";

// keep last api in comment while in local also. it will keep sending msgs whenever you delete stock entries.

// Prod