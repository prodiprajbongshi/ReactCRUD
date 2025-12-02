import React, { useEffect, useState } from "react";
import { addPost } from "../Api/PostAPi";

const Form = ({ posts, setPosts, updateData, setUpdateData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: ""
  });



    useEffect(() => {
      if(updateData && updateData.title && updateData.body){
        setAddData({
          title: updateData.title,
          body: updateData.body
        });
      }
  }, [updateData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAddData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addPostData = async () => {
    const response = await addPost(addData);

    if (response.status === 201) {
      // update post list instantly
      setPosts([...posts, response.data]);

      // reset form
      setAddData({ title: "", body: "" });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();  
    addPostData();
  };

  return (
    <div className="container mx-auto flex items-center justify-center pt-8 pb-4">
      <form onSubmit={handleOnSubmit} className="bg-[#21303a] px-4 py-3">
        <input
          value={addData.title}
          onChange={handleInputChange}
          placeholder="Enter Title"
          className="border bg-white px-2 py-2"
          type="text"
          name="title"
        />

        <input
          value={addData.body}
          onChange={handleInputChange}
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




 



 
