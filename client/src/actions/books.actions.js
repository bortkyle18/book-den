import axios from "axios";

export const getBooks = (query) => {
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
