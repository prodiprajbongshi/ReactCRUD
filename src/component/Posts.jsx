import React, { useEffect, useState } from "react";
import {  deletePost, getPosts } from "../Api/PostAPi";
import Form from "./Form";

const Posts = () => {
  const [post, setPost] = useState([]);
  const [updateData, setUpdateData] = useState({});
 

  const getPostData = async () => {
    try {
      const response = await getPosts();
      if (Array.isArray(response)) setPost(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPost((prevPosts) => prevPosts.filter((item) => item.id !== id));
    } catch (error) {
      console.log("Delete failed:", error.message);
    }
  };


  const handleUpdatePost = (item) => {
    setUpdateData(item);

  }

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="bg-[#171f29]">
      <section>
        <Form posts={post}  setPosts={setPost} setUpdateData={setUpdateData} updateData={updateData}  />
      </section>

      <section>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {post.map((item, index) => (
              <div key={item.id} className="bg-[#21303a] text-white p-4 rounded shadow">
                <span>{index + 1}</span>
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p>{item.body}</p>

                <div className="mt-2">
                  <button onClick={() => handleUpdatePost(item)} className="py-1 px-3 bg-green-500 cursor-pointer rounded-md w-20 hover:bg-green-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(item.id)}
                    className="ms-2 py-1 px-3 cursor-pointer bg-red-500 rounded-md w-20 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Posts;
