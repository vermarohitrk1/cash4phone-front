// Local 

import dotenv from "dotenv";
dotenv.config();

export const sales               = process.env.REACT_APP_API_URL+"admin/sales";
export const sales_update        = process.env.REACT_APP_API_URL+"admin/sales_update";
export const purchase            = process.env.REACT_APP_API_URL+"admin/purchase2";
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
export const GET_customers       = process.env.REACT_APP_API_URL+"admin/sales/customers";
export const dashboard           = process.env.REACT_APP_API_URL+"admin/dashboard";
export const customers           = process.env.REACT_APP_API_URL+"admin/customers";
export const customer_update     = process.env.REACT_APP_API_URL+"admin/customer_update";
export const payouts             = process.env.REACT_APP_API_URL+"admin/payouts";
export const priceInput          = process.env.REACT_APP_API_URL+"admin/stockPriceInput";
export const quote               = process.env.REACT_APP_API_URL+"admin/create-vendor-quote";
export const getQuotes           = process.env.REACT_APP_API_URL+"admin/get-quotes";
export const quoteItems          = process.env.REACT_APP_API_URL+"admin/get-quote-items";
export const updateQuoteItems    = process.env.REACT_APP_API_URL+"admin/update-quote-items";

// keep last api in comment while in local also. it will keep sending msgs whenever you delete stock entries.

// Prod