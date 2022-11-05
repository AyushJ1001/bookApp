import axios from "axios";

const API_URL = "/users/";

export type userData = {
  name: String;
  email: String;
  password: String;
};

export type userLoginData = {
  email: String;
  password: String;
};

// Register User
const register = async (userData: userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", response.data.token);
  }

  return response.data.token;
};

// Login User
const login = async (userData: userLoginData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", response.data.token);
  }

  return response.data.token;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
