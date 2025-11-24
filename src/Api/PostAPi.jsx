import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});


// get method 
export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
}


// Delete method
export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
 
  return response.data;
}

// post method
export const addPost = async (post) => {
 return api.post("/posts", post);

};
