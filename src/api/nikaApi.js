import axios from "axios";
import { config } from "./Constants";
// import { parseJwt } from './Helpers'

export const nikaApi = {
  authenticate,
  signup,
  getAllUsers,
  verifyOtp,
  getProductsByCategory,
  newGetProductsByCategory,
  getAllProduct,
  getAllUsers,
  updateUser,
  deleteUser,
  createCustomer,
  getUserMe
}

function authenticate(user) {
  return instance.post("/api/v1/auth/authenticate", user);
}

function signup(user) {
  return instance.post("/api/v1/auth/register", user, {
    headers: { "Content-type": "application/json" },
  });
}

function verifyOtp(optRequest) {
  return instance.post("/api/v1/auth/verifyOtp", optRequest, {
    headers: { "Content-type": "application/json" },
  });
}

function getAllUsers() {
  return instance.get("/api/v1/users", {
    headers: {
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

function getUserMe(email) {
  const accessToken = localStorage.getItem("accessToken");
  return instance.get("/api/v1/users/me", {
    params: {
      email: email,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function getProductsByCategory(category, page, size) {
  return instance.get("/api/v1/products/getProductsByCategory", {
    params: {
      category: category,
      page: page,
      size: size,
      // size: 10000,
    },
  });
}

function newGetProductsByCategory(title, type, category, subcategory, official, page, size, sortBy, direction ) {
  return instance.get("/api/v1/products/getProductsByTypeAndCategoryAndSubcategoryAndOfficial", {
    params: {
      title: title,
      type: type,
      category: category,
      subcategory: subcategory,
      official: official,
      page: page,
      size: size,
      sortBy: sortBy,
      direction: direction
    },
  }); 
}

function getAllProduct() {
  return instance.get("/api/v1/products/getAll");
}

function createCustomer(data) {
  return instance.post("/api/v1/auth/register", data, {
    headers: { "Content-type": "application/json" },
  });
}

function updateUser(id, user) {
  return instance.patch(`/api/v1/users/updateUser/${id}`, user, {
    headers: {
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

function deleteUser(id) {
  return instance.delete(`/api/v1/users/deleteUser/${id}`,{
    headers: {
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

// instance.interceptors.request.use(function (config) {
//   // If token is expired, redirect user to login
//   if (config.headers.Authorization) {
//     const token = config.headers.Authorization.split(' ')[1]
//     const data = parseJwt(token)
//     if (Date.now() > data.exp * 1000) {
//       window.location.href = "/login"
//     }
//   }
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

// -- Helper functions

function bearerAuth(user) {
  return `Bearer ${user}`;
}
