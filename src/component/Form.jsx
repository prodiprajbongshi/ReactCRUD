import React, {  useState } from "react";
import { addPost } from "../Api/PostAPi";
 

const Form = ({ posts, setPosts }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: ""
  });

const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAddData((prevData) => ({ ...prevData, [name]: value }));
  };
 

  const addNewPost = async () => {
    const res = await addPost()
    setPosts([res.data, ...posts]);
    setAddData({
      title: "",
      body: ""
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    addNewPost()
  }
  

  return (
    <div className="container mx-auto flex items-center justify-center pt-8 pb-4">
      <form onSubmit={handleFormSubmit} className="bg-[#21303a] px-4 py-3">
        <input
          value={addData.title}
         onChange={handleFormChange}
          placeholder="Enter Title"
          className="border bg-white px-2 py-2"
          type="text"
          name="title"
        />

        <input
          value={addData.body}
           onChange={handleFormChange}
          placeholder="Enter Content"
          className="border bg-white px-2 py-2 mx-4"
          type="text"
          name="body"
        />

        <input
          className="bg-green-500 cursor-pointer py-1 px-4 rounded-md text-xl"
          type="submit"
          value="Add"
        />
      </form>
    </div>
  );
};

export default Form;




 



 
