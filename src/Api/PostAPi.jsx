import axios from "axios";

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});


// get method 
export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
}