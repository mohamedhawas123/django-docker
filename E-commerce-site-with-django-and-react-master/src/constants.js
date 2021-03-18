const localhost = "http://127.0.0.1:8000";

const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

export const productListURL = `${endpoint}/products/`;
export const productDetailURL = id => `${endpoint}/products/${id}/`;
export const addToCartURL = `${endpoint}/add-to-cart/`;
export const orderSummaryURL = `${endpoint}/order-summary/`;
export const checkoutURL = `${endpoint}/checkout/`;
export const addCouponURL = `${endpoint}/add-coupon/`;
export const addressUrl = addressType => `${endpoint}/address/?address_type=${addressType}`;
export const addresscreate = `${endpoint}/createaddress/`;
export const countries = `${endpoint}/country`;
export const UserID = `${endpoint}/userid`;
export const addressupdate = id => `${endpoint}/updateaddress/${id}/`;
export const deleteressupdate = id => `${endpoint}/deleteaddress/${id}/`;
export const deleteItem = id => `${endpoint}/deleteitem/${id}/`;
export const removefromcart = `${endpoint}/removeitem/`;

export const paymenthistory = `${endpoint}/paymenthistory/`;














