import axios from 'axios'
import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchPosts } from '../redux/features/postSlice'

import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const CreatePost = () => {
    const mainUser= useSelector(state=> state.mainUser.mainUser)
    const token = JSON.parse(localStorage.getItem('chatUser') ?? '')?.token
    const dispatch = useDispatch()

    const [loading,setLoading] = useState(false) 
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")

    const createPost = async (e) =>{

        e.preventDefault()

        if( !title.trim() || !content.trim() ) return 
        setLoading(true)

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            };

            const response = await axios.post(
                "https://chatly-server.vercel.app/post/create",
                {
                    userId:mainUser?._id,
                    title:title.trim(),
                    content:content.trim()
                },
                config
            )
            
            setTitle("")
            setContent("")
            dispatch(fetchPosts())

            console.log(response.data);
        }
         catch (error) {
            console.log(error);
        }

        setLoading(false)
    }
  return (
    <section style={{height:"62%",backgroundColor:'#F6F1F1'}} className=' w-full h-full pb- bg-red-300 rounded-lg overflow-hidden'>

        <header className='h-14 bg-white text-lg font-semibold flex items-center px-5'>
            <h1>New Post</h1>
        </header>

        <form onSubmit={createPost} action="PUT" className=' w-full h-full flex flex-col items-center'>

            <div className='w-10/12 shadow-sm flex flex-col gap-2 my-4'>
                <label htmlFor="" className=' text-sm font-semibold'>Title</label>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className='border outline-none h-10 rounded-sm'/>
            </div>

            <div className='w-10/12 shadow-sm max-h-48 flex flex-col gap-2 my-4'>
                <label htmlFor="" className=' text-sm font-semibold'>Content</label>
                <textarea value={content} onChange={(e)=>setContent(e.target.value)} type="text" className='border outline-none rounded-sm scrollbarhidden' style={{minHeight:'170px'}}/>
            </div>

            {!loading ?
                <button type='submit' className=' bg-cyan-400 w-8/12 h-12 rounded-md active:scale-95 text-base font-semibold'>Post</button>:
                <div className=' bg-cyan-400 w-8/12 h-12 flex justify-center items-center rounded-md active:scale-95 text-base font-semibold'><AiOutlineLoading3Quarters className=' animate-spin h-5 w-5 text-gray-700'/></div>
            }

        </form>
    </section>
  )
}

export default CreatePost
