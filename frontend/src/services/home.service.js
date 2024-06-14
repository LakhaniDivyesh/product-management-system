import { fetchWrapper } from "../utils/fetch.wrapper";


export function getCategories() {
    return fetchWrapper.post(`http://localhost:3046/api/v1/home/listing-category`,{});
}

export function getSubCategories(category_id) {
    return fetchWrapper.post(`http://localhost:3046/api/v1/home/listing-sub-category/${category_id}`,{});
}

export function getProducts(sub_cats_id) {
    return fetchWrapper.post(`http://localhost:3046/api/v1/home/listing-product/${sub_cats_id}`,{});
}

export function getProductsDetails(product_id) {
    return fetchWrapper.post(`http://localhost:3046/api/v1/home/listing-product-details/${product_id}`,{});
}

export function getMultiCate(category_id) {
    return fetchWrapper.post(`http://localhost:3046/api/v1/home/multi-sub-category`,{"category_id" : category_id});
}

export function getProductFilter(category_id,sub_id) {
    return fetchWrapper.post(`http://localhost:3046/api/v1/home/filter`,{"category_id" : category_id,"sub_id" : sub_id});
}

export function userLogin(loginData) {
    return fetchWrapper.post(`http://localhost:3046/api/v1/auth/login`,loginData);
}

export function userSignup(signupData) {
    return fetchWrapper.post(`http://localhost:3046/api/v1/auth/signup`,signupData);
}


export function verifyToken(token) {
    return fetchWrapper.post(`http://localhost:3046/api/v1/auth/verify-token`,{"token":token});
}


// export function getSubCategories(body) {
//     return fetchWrapper.post(`http://localhost:8200/sub-categories`, body);
// }