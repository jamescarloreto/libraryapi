
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const userLogin = async (user) => {
    const response = await axios.post(`${API_URL}/userlogin`, user);
    console.log("axios response.data: ", response.data);
    return response.data;
};

export const userUpdate = async (id, user) => {
    const response = await axios.put(`${API_URL}/userupdate/${id}`, user);
    console.log("response.data: ", response.data);
    return response.data;
};

export const fetchBooks = async () => {
    const response = await axios.get(`${API_URL}/books`);
    return response.data.books;
};

export const searchBook = async (query) => {
    const response = await axios.get(`${API_URL}/books/search?query=${encodeURIComponent(query)}`);
    return response.data.books;
};

export const addBook = async (book) => {
    const response = await axios.post(`${API_URL}/books`, book);
    return response.data.books;
};

export const updateBook = async (id, book) => {
    const response = await axios.put(`${API_URL}/books/${id}`, book);
    return response.data.updatedBook;
};

export const deleteBook = async (id) => {
    const response = await axios.delete(`${API_URL}/books/${id}`);
    return response.data.deletedBook;
};
