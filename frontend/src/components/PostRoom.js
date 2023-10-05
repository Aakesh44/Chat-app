import React, { useEffect, useRef, useState } from 'react'
import {BiLike,BiSolidLike,BiDotsVerticalRounded,BiCommentDetail} from 'react-icons/bi'
import {RiBookmarkFill,RiBookmarkLine} from 'react-icons/ri'
import {IoIosShareAlt} from 'react-icons/io'
import { useSelector,useDispatch } from "react-redux"
import { Link } from 'react-router-dom'

const PostRoom = () => {
  const mainUser= useSelector(state=> state.mainUser.mainUser)
  const Posts = useSelector(state=>state.postsList.posts)

  let postRoomWidth = null
  const roomRef = useRef(null)
  
  useEffect(()=>{

     function update(){
      if(roomRef.current){
        const width = roomRef.current.offsetWidth 
        postRoomWidth = width
        // console.log(width);
      }
    }
    
    update()

    window.addEventListener('resize',update)
    return() =>{window.removeEventListener('resize',update)}
  },[roomRef.current?.offsetWidth])

  function formatTime(timeString) {
        const date = new Date(timeString);
        const datee = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure two-digit minutes
        
        return `${formattedHours}:${formattedMinutes} ${ampm} ${datee}/${month}/${year}` ;
  }
  return (
    <main 
    ref={roomRef}
    style={{columnGap:'10px',backgroundColor:'#F6F1F1'}}
    className={` h-fit flex flex-wrap justify-evenly gap-5 overflow-y-scroll scrollbarhidden w-full rounded-lg bg-teal-300 p-2  gap-29`}>
      
      {Posts?.map(post => (


        <div key={post._id} style={{height:'350px',minWidth:"220px",maxWidth:'300px'}} className="bg-white shadow-md  w-full flex flex-col rounded-lg overflow-hidden">
          <header style={{height:'50px'}} className=' bg-white h-12  flex items-center  p-1'>

            <Link to={ mainUser?._id !== post?.owner?._id && `/chat/${post?.owner?._id}`}  className=' flex items-center w-2/3 rounded-md hover:bg-gray-100'>
              <img src={post?.owner?.pimg} alt="" 
              style={{minHeight:'32px',minWidth:'32px'}} className=' h-8 w-8 mx-2 rounded-full bg-blue-800' />

              <article className=' text-sm font-semibold overflow-hidden text-ellipsis pr-'>
                <h1 className='truncate'>{post?.owner?.name}</h1>
                <h2 style={{fontSize:'10px',lineHeight:'1rem'}} className=' text-gray-600'>{formatTime(post?.createdAt)}</h2>
              </article>
            </Link>

            <span className=' ml-auto hover:bg-gray-100 p-2 rounded-3xl flex  justify-center items-center  cursor-pointer '>
              <BiDotsVerticalRounded className=' h-5 w-5'/>
            </span>
          </header>

          <section style={{height:'250px'}} className='pb-1 px-2 text-xs font-medium overflow-y-scroll scrollbarhidden'>
            <h1 className=' bg-white shadow-sm text-lg my-1 font-semibold sticky top-0'>{post?.title}</h1>
            <p style={{}} className=' text-gray-800'>{post?.content} </p>
          </section>

          <footer style={{height:'45px'}} className=' border-t-2 text-gray-500 border-dashed flex items-center justify-around w-full h-14 mt-auto'>

            <span className='  px-2 py-1 hover:bg-gray-100 rounded-3xl flex gap-1 items-center  cursor-pointer '>
              <BiLike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>1</h1>
            </span>

            
            <span className='  p-2 hover:bg-gray-100 rounded-3xl flex gap-1 items-center  cursor-pointer '>
              <BiCommentDetail className=' h-5 w-5'/>
            </span>

            
            <span className='   p-2 hover:bg-gray-100  rounded-3xl flex gap-1 items-center  cursor-pointer '>
              <IoIosShareAlt className=' h-5 w-5'/>
            </span>

            <span className='    p-2 hover:bg-gray-100  rounded-3xl flex gap-1 items-center cursor-pointer'>
              <RiBookmarkLine className=' h-5 w-5'/>
            </span>

          </footer>
        </div>

      ))}



    </main>
  )
}

export default PostRoom