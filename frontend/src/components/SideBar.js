import React from 'react'
import {RiChatSmile3Line} from 'react-icons/ri'
import profilelogo from '../images/user.png'
import chatlogo from '../images/comment-alt.png'
import postlogo from '../images/layout-fluid.png'
import userslogo from '../images/users-alt.png'
import belllogo from '../images/bell.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const SideBar = ({setOption,option}) => {

  const notifications = useSelector(state=>state.notifications.notifications)
  return (
    <main style={{height:'100vh',minWidth:'80px',backgroundColor:'#F6F1F1'}} className='h-full w-20 select-none  flex flex-col justify-between items-center py-8  bg-white'>

      <Link to='/'><RiChatSmile3Line className='w-8 h-8 text-cyan-700 cursor-pointer'/></Link>

      <section className='w-full flex flex-col items-center gap-7'>

        <Link  style={{backgroundColor:option === "profile" && "rgb(165 243 252)"}} onClick={()=>setOption('profile')} className=' w-1/2  mx-auto aspect-square  rounded-md flex items-center justify-center cursor-pointer'>
          <img src={profilelogo} alt="" className=' w-1/2 aspect-square '/>
        </Link>

        <span style={{backgroundColor:option === "chatlist" && "rgb(165 243 252)"}} onClick={()=>setOption('chatlist')} className=' w-1/2  aspect-square  rounded-md flex items-center justify-center cursor-pointer'>
          <img src={chatlogo}    alt="" className=' w-1/2 aspect-square '/>
        </span>

        <span style={{backgroundColor:option === "userlist" && "rgb(165 243 252)"}} onClick={()=>setOption('userlist')} className=' w-1/2  aspect-square  rounded-md flex items-center justify-center cursor-pointer'>
          <img src={userslogo}    alt="" className=' w-1/2 aspect-square '/>
        </span>

        {/* <div style={{backgroundColor:option === "notilist" && "rgb(165 243 252)"}} onClick={()=>setOption('notilist')} className=' hidden flexx  w-1/2  aspect-square  rounded-md items-center justify-center cursor-pointer'>
          <span className=' relative flex items-center justify-center h-full w-full'>
            <img src={belllogo}    alt="" className=' w-1/2 aspect-square '/>
            <span className=' absolute -top-1 -right-1 h-4 w-4 text-white flex items-center justify-center bg-red-500 text-xs rounded-full'> {notifications?.length} </span>
          </span>
        </div> */}

        <Link to='/' className=' w-1/2  aspect-square bg-cyan-3 00 rounded-md flex items-center justify-center cursor-pointer'>
          <img src={postlogo}    alt="" className=' w-1/2 aspect-square '/>
        </Link>
        
      </section>

      <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais" alt="" className='w-8 h-8'/>
    </main>
  )
}

export default SideBar