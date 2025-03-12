export const baseURL =
    window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://binkey-it-backend.vercel.app";
const SummaryApi = {
    register: {
        url: `${baseURL}/api/user/register`,
        method: 'post'
    },
    login: {
        url: `${baseURL}/api/user/login`,
        method: 'post'
    },
    forgot_password: {
        url: `${baseURL}/api/user/forgot-password`,
        method: 'put'
    },
    forgot_password_otp_verification: {
        url: `${baseURL}/api/user/verify-forgot-password-otp`,
        method: 'put'
    },
    resetPassword: {
        url: `${baseURL}/api/user/reset-password`,
        method: 'put'
    },
    refreshToken: {
        url: `${baseURL}/api/user/refresh-token`,
        method: 'post'
    },
    userDetails: {
        url: `${baseURL}/api/user/user-details`,
        method: 'get'
    },
    logout: {
        url: `${baseURL}/api/user/logout`,
        method: 'get'
    },
    uploadAvatar: {
        url: `${baseURL}/api/user/upload-avatar`,
        method: 'put'
    },
    updateUserDetails: {
        url: `${baseURL}/api/user/update-user`,
        method: 'put'
    },
    addCategory: {
        url: `${baseURL}/api/category/add-category`,
        method: 'post'
    },
    uploadImage: {
        url: `${baseURL}/api/file/upload`,
        method: 'post'
    },
    getCategory: {
        url: `${baseURL}/api/category/get`,
        method: 'get'
    },
    updateCategory: {
        url: `${baseURL}/api/category/update`,
        method: 'put'
    },
    deleteCategory: {
        url: `${baseURL}/api/category/delete`,
        method: 'delete'
    },
    createSubCategory: {
        url: `${baseURL}/api/subcategory/create`,
        method: 'post'
    },
    getSubCategory: {
        url: `${baseURL}/api/subcategory/get`,
        method: 'post'
    },
    updateSubCategory: {
        url: `${baseURL}/api/subcategory/update`,
        method: 'put'
    },
    deleteSubCategory: {
        url: `${baseURL}/api/subcategory/delete`,
        method: 'delete'
    },
    createProduct: {
        url: `${baseURL}/api/product/create`,
        method: 'post'
    },
    getProduct: {
        url: `${baseURL}/api/product/get`,
        method: 'post'
    },
    getProductByCategory: {
        url: `${baseURL}/api/product/get-product-by-category`,
        method: 'post'
    },
    getProductByCategoryAndSubCategory: {
        url: `${baseURL}/api/product/get-pruduct-by-category-and-subcategory`,
        method: 'post'
    },
    getProductDetails: {
        url: `${baseURL}/api/product/get-product-details`,
        method: 'post'
    },
    updateProductDetails: {
        url: `${baseURL}/api/product/update-product-details`,
        method: 'put'
    },
    deleteProduct: {
        url: `${baseURL}/api/product/delete-product`,
        method: 'delete'
    },
    searchProduct: {
        url: `${baseURL}/api/product/search-product`,
        method: 'post'
    },
    addTocart: {
        url: `${baseURL}/api/cart/create`,
        method: 'post'
    },
    getCartItem: {
        url: `${baseURL}/api/cart/get`,
        method: 'get'
    },
    updateCartItemQty: {
        url: `${baseURL}/api/cart/update-qty`,
        method: 'put'
    },
    deleteCartItem: {
        url: `${baseURL}/api/cart/delete-cart-item`,
        method: 'delete'
    },
    createAddress: {
        url: `${baseURL}/api/address/create`,
        method: 'post'
    },
    getAddress: {
        url: `${baseURL}/api/address/get`,
        method: 'get'
    },
    updateAddress: {
        url: `${baseURL}/api/address/update`,
        method: 'put'
    },
    disableAddress: {
        url: `${baseURL}/api/address/disable`,
        method: 'delete'
    },
    CashOnDeliveryOrder: {
        url: `${baseURL}/api/order/cash-on-delivery`,
        method: 'post'
    },
    payment_url: {
        url: `${baseURL}/api/order/checkout`,
        method: 'post'
    },
    getOrderItems: {
        url: `${baseURL}/api/order/order-list`,
        method: 'get'
    }
};

export default SummaryApi;
