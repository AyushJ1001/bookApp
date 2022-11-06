import axios from "axios";

const API_URL = "/books/";

const userToken = localStorage.getItem("user") || "";

export type bookData = {
  name: string;
  author: string;
};

// Get all books
const getAll = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data;
};

// get book by name
const getBookByName = async (name: string) => {
  const response = await axios.get(API_URL + "name/" + name, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data;
};

// add a book
const addBook = async (bookData: bookData) => {
  const response = await axios.post(API_URL + "new", bookData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data;
};

// remove a book
const removeBook = async (id: string) => {
  const response = await axios.delete(API_URL + id, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data;
};

const bookService = {
  getAll,
  getBookByName,
  addBook,
  removeBook,
};

export default bookService;
