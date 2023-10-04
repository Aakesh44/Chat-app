import React, { useEffect, useState } from 'react'
import {AiFillEdit} from 'react-icons/ai'
import {GrNext} from 'react-icons/gr'
import {FaPlus,FaSortAmountUpAlt,FaSortAmountDownAlt} from 'react-icons/fa'
import {TbArrowsDownUp} from 'react-icons/tb'
import {useSelector,useDispatch} from 'react-redux'
import {change} from '../redux/features/CGroupPop'
import { Link ,useNavigate} from 'react-router-dom'
import ProfileEdit from './ProfileEdit'

const Profile = (chat) => {

  const mainUser= useSelector(state=> state.mainUser.mainUser)
  const chatList = useSelector(state=>state.chatsList.chats) 
  const dispatch = useDispatch()
  const [option,setOption] = useState("chats")
  const [editOpen,setEditOpen] = useState(false)

  const navigate = useNavigate()


  const [frndSearchQuery,setfrndSearchQuery] = useState("")
  let SortedUsers = mainUser?.friends?.filter(user=>user.name.toLowerCase().trim().split(" ").join("").includes(frndSearchQuery.toLowerCase().trim().split(" ").join("")))

  const [chatNew,setChatNew] = useState(true)
  const [chatType,setChatType] = useState("all")
  const [ SortedChats ,setSortedChats] = useState(chatList)
// console.log(SortedChats);

async function chatFilter(type,isNew) {

  let filterdChats = chatList
  
  if(type === "group"){
    filterdChats = chatList.filter((chat) => chat.isGroupChat === true)
  }
  else if(type === "myG"){
    filterdChats = chatList.filter((chat) =>chat.isGroupChat === true && chat.Admin?.includes(mainUser?._id));
  }

  if(!isNew){
    filterdChats = [...filterdChats].reverse()
  }

  setSortedChats(filterdChats)
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

useEffect(()=>{
  if(chatList){
  chatFilter("all",true)
  setChatType('all')
  setChatNew(true)
}
},[chatList])

  function genRoute(chat) {

    if(chat.isGroupChat){
      return `/group-chat/${chat._id}`
    }
    else{
      const userId = !(chat?.isGroupChat) && chat?.users?.find(n=> n._id !== mainUser?._id)?._id
      return `/chat/${userId}`
    }

  }
  return (
      <section className='  w-full h-full rounded-lg overflow-hidden'> 

        <main style={{height:'30%',backgroundColor:"#000000",color:'#F6F1F1'}} className=' h-1 /3 w-full bg-cyan-400 select-none'>
          <section style={{backgroundImage:`url(${mainUser?.cimg})`}} className='relative bg-cover bg-center bg-red-400 h-1/2 w-full'>

            {/* <img src={mainUser?.cimg} alt="" className='  h-full w-full'/> */}

            <div style={{backgroundImage:`url(${mainUser?.pimg})`}} className=' bg-cover bg-center absolute w-1/4 top-2/3 left-2 border-2 border-white aspect-square rounded-full flex items-center justify-center overflow-hidden bg-white'>
              {/* <img src={mainUser?.pimg} alt="" /> */}
            </div>

            <AiFillEdit onClick={()=>setEditOpen(!editOpen)} className=' absolute top-3 right-3 h-6 w-6 text-black bg-gray-400 rounded-full p-1 cursor-pointer'/>
          </section>

          <article className=' h-1/4 w-3/4 px-4 ml-auto flex flex-col'>
            <h1 className=' text-xl font-bold'>{mainUser?.name}</h1>
            <h2 className=' text-sm font-semibold text-gray-400'>{mainUser?.title}</h2>
          </article>
          <article className='h-1/4 w-full px-2 py-1 bg-f uchsia-400 overflow-hidden'>
            <h3 className=' text-xs font-medium '>{mainUser?.bio}</h3>
          </article>
        </main>

        {editOpen &&
        <ProfileEdit setEditOpen={setEditOpen}/>
  }

        <section style={{height:"8%",backgroundColor:'#000000'}} className=' w-full h-1 6 bg-cya n-400 flex items-center justify-evenly'>

          <div className=' w-1/3 h-full p-1'>
            <button onClick={()=>setOption("chats")} style={{backgroundColor:option === "chats" ? '#146C94':'#F6F1F1',color:option === "chats" && '#F6F1F1'}} className='w-full h-full transition rounded-md bg-cyan-300 shadow-md'>
              <h2 className=' text-sm font-semibold'>Chats</h2>
            </button>
          </div>

          <div className=' w-1/3 h-full p-1'>
            <button onClick={()=>setOption("friends")} style={{backgroundColor:option === "friends" ?'#146C94':'#F6F1F1',color:option === "friends" && '#F6F1F1'}} className='w-full h-full transition rounded-md bg-cyan-300 shadow-md'>
              <h1 className=' text-base font-bold'>{mainUser?.friends?.length}</h1>
              <h2 className=' text-xs font-semibold'>Friends</h2>
            </button>
          </div>

          <div className=' w-1/3 h-full p-1'>
            <button style={{backgroundColor:'#F6F1F1'}} className='w-full h-full rounded-md bg-cyan-300 shadow-md'>
              <h1 className=' text-base font-bold'>100</h1>
              <h2 className=' text-xs font-semibold'>Posts</h2>
            </button>
          </div>
          
        </section>

        {option === "friends" ?
        <section style={{height:"62%",backgroundColor:'#F6F1F1'}} className=' w-full h-2 /3 pb-5 bg-red-300 rounded-lg overflow-hidden'>
        

          <div className=' my-2 mx-1 px-1 h-10 bg-white border rounded-full flex justify-center items-center'>
              <input onChange={(e)=>setfrndSearchQuery(e.target.value)} type="text" className=' w-11/12 h-4/5 outline-none placeholder:text-sm font-semibold'  placeholder='search friends '/>
          </div>

          <p style={{height:'2px'}} className=' my-2 w-full bg-black'></p>

          <section style={{height:'90%'}} className='scrollbarhidden w-full overflow-y-scroll'>
              {(SortedUsers?.length ) ?

              SortedUsers?.map(friend=>(
              <Link to={`/chat/${friend._id}`} style={{height:'70px'}} key={friend._id} className='w-10/12 shadow-sm rounded-lg overflow-hidden mx-auto bg-white flex justify-between items-center cursor-pointer mb-2'>
                  <aside className='w-10/12 p-1 flex items-center'>
                      <img src={friend.pimg} alt="" className=' w-14 aspect-square rounded-full bg-fuchsia-500'/>
                      <article className='mr-auto pl-1'>
                          <h1 className=' text-base font-semibold'>{friend.name}</h1>
                          <h2 className=' text-sm font-semibold'>{friend.title}</h2>
                      </article>
                  </aside>
                  <aside  className=' w-2/12 bg-cyan-400 h-full flex items-center justify-center'>
                      <GrNext/>
                  </aside>
              </Link>)):

              <div className='w-full h-72 font-medium flex items-center justify-center'>-- no friends --</div>}

          </section>

        </section>:

        option === "chats" &&
        <section style={{height:"62%",backgroundColor:'#F6F1F1'}} className=' w-full h-full pb- bg-red-300 rounded-lg overflow-hidden'>
        
          <header style={{color:'#'}} className=' p-2 px-3 flex  items-center justify-between text-lg font-bold text-white'>
    
            <span onClick={()=>dispatch(change(true))}
             style={{backgroundColor:"#146C94",color:"#F6F1F1"}} className='flex px-2 py-1 rounded items-center gap-2 ml-auto cursor-pointer ' >
              <p className=' text-xs font-medium  right-6 top-0 whitespace-nowrap'>Create New Group</p>
              <FaPlus className=''/>
            </span>
            
          </header>
    
          <div className=' mx-1 text-xs font-semibold px-1 h-10 bg-black border rounded flex justify-around items-center'>
              <button onClick={()=>{setChatType("all");chatFilter("all",chatNew)}} className='px-3 py-1 transition rounded-2xl text-white bg-cyan-600 ' style={{backgroundColor:chatType === "all" ? "#146C94" :"#F6F1F1",color:chatType === "all"? "#F6F1F1" :"black"}}>all </button>
              <button onClick={()=>{setChatType("group");chatFilter("group",chatNew)}} className='px-3 py-1 transition rounded-2xl text-white bg-cyan-600 ' style={{backgroundColor:chatType === "group" ? "#146C94" :"#F6F1F1",color:chatType === "group"? "#F6F1F1" :"black"}}>groups</button>
              <button onClick={()=>{setChatType("myG");chatFilter("myG",chatNew)}} className='px-3 py-1 transition rounded-2xl text-white bg-cyan-600 ' style={{backgroundColor:chatType === "myG" ? "#146C94" :"#F6F1F1",color:chatType === "myG"? "#F6F1F1" :"black"}}>My groups</button>
              <button onClick={()=>{setChatNew(!chatNew);chatFilter(chatType,!chatNew)}} className='w-1/4 h-full bg-black transition text-whi te' >
                {chatNew ? 
                  <span className='flex items-center justify-center gap-2 text-white'>new <FaSortAmountUpAlt className='h-3 w-3 inline text-green-400'/></span> :
                  <span className='flex items-center justify-center gap-2 text-white'>old <FaSortAmountDownAlt className='h-3 w-3 inline text-red-400'/></span>}
                
              </button>
          </div>
    
          <p style={{height:'2px'}} className=' my-2 w-full bg-black'></p>
  
          <section className='scrollbarhidden h-full pb-20 transition overflow-scroll w-full'>
              
            {(SortedChats?.length) ? SortedChats.map(chat=>(

              <Link to={genRoute(chat)} style={{height:'70px'}} key={chat._id} className='w-10/12 transition shadow-sm rounded-lg overflow-hidden mx-auto bg-white flex justify-between items-center cursor-pointer mb-2'>
                  <aside className='w-10/12 p-1 flex items-center'>
                      <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais" alt="" className=' w-14 aspect-square rounded-full bg-fuchsia-500'/>
                      <article className='mr-auto pl-1'>
                          <h1 className=' text-base font-semibold'>{(chat?.isGroupChat) ? chat.title : chat?.users?.find(n=> n._id !== mainUser?._id)?.name}</h1>
                          <h2 style={{fontSize:"10px"}} className=' text-sm font-semibold'>
                            <span style={{fontSize:'11px'}} className=' font-bold'>
                            {chat?.isGroupChat && chat?.lastMsg?.sender?.name + " : "}
                          </span>
                          
                          {chat?.lastMsg?.content}
                          </h2>
                      </article>
                  </aside>
                  <h1 style={{fontSize:'10px'}} className=' w-2/12 h-full whitespace-nowrap font-semibold flex items-center justify-center'>
                      { chat?.lastMsg && formatTime(chat?.lastMsg?.createdAt)}
                  </h1>
              </Link>
              
            )):<div className='w-full h-56 flex items-center justify-center'> <h1>-- no chats --</h1></div>}

          </section>
        </section>
}
      </section>

  )
}

export default Profile