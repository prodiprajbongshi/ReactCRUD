
import React, { useEffect, useState  } from 'react'
import { deletePost, getPosts } from '../Api/PostAPi'

const Posts = () => {

const [post, setPost] = useState([]);

const getPostData = async () => {
    try {
        const response = await getPosts()
        // console.log(response)
        setPost(response)
    } catch (error) {
        console.log(error.message)
    }
}

const handleDeletePost = (id) => {
   deletePost(id);

    const updatedPosts = post.filter((item) => item.id !== id); 

    setPost(updatedPosts);
}





useEffect(() => {
    getPostData()
  }, [])    

  return (
   <section>
    <div className='container mx-auto p-4'>
        <h1 className='text-3xl font-semibold mb-4 text-center'>All Posts</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {post.map((item) => (
                <div key={item.id} onClick={() => handleDeletePost(item.id)} className='bg-linear-to-r from-blue-500 to-purple-400 p-4 rounded shadow'>
                    <span>{item.id}</span>
                    <h2 className='text-xl font-semibold mb-2'>{item.title}</h2>
                    <p>{item.body}</p>
                    <div className="mt-2">
                        <button className='py-1 px-3 bg-green-500 rounded-md w-20 text-white hover:bg-green-600 transition-colors cursor-pointer duration-300' type="button">Edit</button>
                        <button className='ms-2 py-1 px-3 bg-red-500 rounded-md w-20 text-white hover:bg-red-600 transition-colors cursor-pointer duration-300' type="button">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
   </section>
  )
}

export default Posts
