import React, { useEffect, useState } from "react";
import { addPost, updateDataApi } from "../Api/PostAPi";

const Form = ({ posts, setPosts, setUpdateData, updateData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });


    let isEmpty = Object.keys(updateData).length === 0;


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAddData((prevData) => ({ ...prevData, [name]: value }));
  };
const addNewPost = async () => {
  const res = await addPost(addData);

  const newPost = {
    ...res.data,
    id: Date.now(),  
  };

  setPosts((prev) => [newPost, ...prev]);  

  setAddData({
    title: "",
    body: "",
  });
};


 //   updatePostData
 const updatePostData = async () => {
  try {
    await updateDataApi(updateData.id, addData);

    setPosts((prev) =>
      prev.map((item) =>
        item.id === updateData.id
          ? { ...item, ...addData }
          : item
      )
    );

    setAddData({ title: "", body: "" });
    setUpdateData({});
  } catch (error) {
    console.log(error);
  }
};




  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addNewPost();
    } else if (action === "Edit") {
      updatePostData();
    }
 
  };


  // add data in form 
useEffect(() => {
  if (Object.keys(updateData).length > 0) {
    setAddData({
      title: updateData.title,
      body: updateData.body,
    });
  }
}, [updateData]);






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
          required
        />

        <input
          value={addData.body}
          onChange={handleFormChange}
          placeholder="Enter Content"
          className="border bg-white px-2 py-2 mx-4"
          type="text"
          name="body"
          required
        />

        <input
          className="bg-green-500 cursor-pointer py-1 px-4 rounded-md text-xl"
          type="submit"
          value={isEmpty ? "Add" : "Edit"}
        />
      </form>
    </div>
  );
};

export default Form;
