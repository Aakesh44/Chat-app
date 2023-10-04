import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaPlus} from 'react-icons/fa'
import { Link } from 'react-router-dom'

import  {useSelector,useDispatch} from 'react-redux'

const NotiList = () => {

  const mainUser = useSelector(state=> state.mainUser.mainUser)
  const notifications = useSelector(state=>state.notifications.notifications)

  const dispatch = useDispatch()
  
  console.log(notifications);

  function genRoute(chat) {

    if(chat.isGroupChat){
      return `/group-chat/${chat._id}`
    }
    else{
      const userId = !(chat?.isGroupChat) && chat?.users?.find(n=> n._id !== mainUser?._id)?._id
      return `/chat/${userId}`
    }

  }
     function formatTime(timeString) {
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure two-digit minutes
        
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }
  return (
    <main style={{backgroundColor:'#F6F1F1'}} className=' w-full h-full pb-5 bg-red-300 rounded-lg overflow-hidden'>
        
      <header style={{backgroundColor:'#146C94'}} className=' p-2 px-3 flex  items-center justify-between text-lg font-bold text-white'>
        Chats
        
      </header>


      <p style={{height:'2px'}} className=' my-2 w-full bg-black'></p>

      <section className='scrollbarhidden h-full pb-20  overflow-scroll w-full'>

          {notifications?.map(noti=>(
            
            <Link to={genRoute(noti)} key={noti._id} style={{height:'70px'}} className='w-10/12 shadow-sm rounded-lg overflow-hidden mx-auto bg-white flex justify-between items-center cursor-pointer mb-2'>
                <aside className='w-10/12 p-1 flex items-center'>
                    <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais" alt="" className=' w-14 aspect-square rounded-full bg-fuchsia-500'/>
                    <article className='mr-auto pl-1 overflow-hidden'>
                        <h1 className=' text-base font-semibold truncate'>{(noti?.chat?.isGroupChat) ? noti?.chat.title : noti?.chat?.users?.find(n=> n._id !== mainUser?._id)?.name}</h1>
                        <h2 style={{fontSize:'10px'}} className=' text-xs font-semibold truncate'> 
                          <span style={{fontSize:'11px'}} className=' font-bold'>
                            {(noti?.chat?.isGroupChat) && ( noti?.sender?._id === mainUser?._id ? 'you'+ " : " : noti?.sender?.name + " : " )}
                          </span>
                          
                          {noti?.content}
                        </h2>
                    </article>
                </aside>
                <h1 style={{fontSize:'10px'}} className=' w-2/12 h-full whitespace-nowrap font-semibold flex items-center justify-center'>
                    {formatTime(noti?.createdAt)}
                </h1>
            </Link>
          ))}



      </section>
    </main>
  )
}

export default NotiList