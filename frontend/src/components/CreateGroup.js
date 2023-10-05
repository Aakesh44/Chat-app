import React, { useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {GrAddCircle} from 'react-icons/gr'
import { useSelector,useDispatch } from 'react-redux'
import { change } from '../redux/features/CGroupPop'
import { fetchChats } from '../redux/features/chatSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateGroup = () => {

  const mainUser= useSelector(state=> state.mainUser.mainUser)
  const popup = useSelector(state=>state.CGroupPop.popUp); // console.log(popup);

  const dispatch = useDispatch()

   const [groupTitle,setGroupTitle] = useState("")

  const [selectedUsers,setSelectedUsers] = useState([])

  function addToSelected(user) {
    setSelectedUsers(prev => !prev.includes(user) ? [...prev,user] : prev)
  }

  function removeFromSelected(user) {
    setSelectedUsers(prev=> prev.filter(select => select !== user))
  }

  const [Cerror,setCerror] = useState("")

  const [frndSearchQuery,setfrndSearchQuery] = useState("")
  let SortedUsers = mainUser?.friends?.filter(user=>user.name.toLowerCase().trim().split(" ").join("").includes(frndSearchQuery.toLowerCase().trim().split(" ").join(""))).slice(0,5)

  const token = JSON.parse(localStorage.getItem('chatUser') ?? '')?.token

  const navigate = useNavigate()
  async function createGroup() {

    if(selectedUsers.length < 2){

      setCerror ("min 2 members needed to create group")
       return 
    }
    if(!groupTitle.length){
      setCerror("please enter group title")
      return
    }
    setCerror("")
    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.post(
        "https://chatly-server.vercel.app/chat/create-groupchat",
        {
          
          mainUser:mainUser?._id,
          users:selectedUsers.map(n=>n._id),
          title:groupTitle
          
        },
        config)
      
        console.log(response.data);
        dispatch(fetchChats(mainUser?._id))
        navigate(`/group-chat/${response.data?._id}`)
        dispatch(change(!popup))


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className='editbg overflow-y-scroll absolute inset-0  z-10 flex justify-center items-center'>
      <AiOutlineClose onClick={()=>dispatch(change(!popup))} className=' absolute h-10 w-10 top-12 right-5 md:right-20 lg:right-20 xl:right-96 text-white bg-black cursor-pointer'/>

      <section className=' w-10/12  lg:w-2/3 xl:w-1/2 h-fit rounded overflow-hidden bg-white text-black flex  flex-col md:flex-row'>
        <aside className=' w-2/3 mx-auto md:w-1/2'>
          <header style={{backgroundColor:"#19A7CE"}} className='w-full py-2 px-3 h-12 font-semibold text-lg bg-green-200 flex justify-between items-center'>
            <h1 className=''>Create New Group <span className='text-sm'>(min two member)</span></h1>
          </header>

          <div className=' w-full flex items-center h-12 px-3 text-sm font-semibold bg-cyan-200'>
            <label htmlFor="title" className='w-1/3'>Group Name</label>
            <input onChange={(e)=>setGroupTitle(e.target.value)} type="text" name="title" id="" className='w-2/3 h-4/6 px-2 outline-none bg-white border-2 border-cyan-500' placeholder='enter group name'/>
          </div>

          <section className='h-fit w-full flex items-center flex-wrap bg-fuchsia-20,0'>

            {selectedUsers?.map(user=>(
              <div key={user?._id} className=' flex items-center justify-start mx-auto w-fit m-2 rounded-2xl bg-cyan-300 px-2 py-1' style={{maxWidth:'160px'}}>
                <img src={user?.pimg} alt="" className=' h-7 w-7 rounded-full bg-red-600 mx-1'/>
                <h1 className='w-20 font-medium my-auto truncate'>{user?.name}</h1>
                <AiOutlineClose className='ml-1 cursor-pointer' onClick={()=>removeFromSelected(user)}/>
              </div>
            ))}

          </section>
        </aside>

        <aside className='w-2/3 mx-auto md:w-1/2 flex flex-col'>
          <div style={{backgroundColor:"#19A7CE",marginLeft:'1px'}} className=' w-full flex items-center h-12 px-3 text-sm font-semibold bg-blue-200'>
            <label htmlFor="" className='w-1/3 whitespace-nowrap'>Add Members</label>
            <input onChange={(e)=>setfrndSearchQuery(e.target.value)} type="text" name="" id="" className='w-2/3 h-4/6 placeholder:text-center outline-none bg-white border-2 border-cyan-500' placeholder='Search your friends'/>
          </div>

          <section  className=' w-full bg-cyan-200 py-1 max-h-96'>
            {SortedUsers?.map(user =>(
              <div key={user?._id} onClick={()=>addToSelected(user)} className='w-10/12 px-2 shadow-sm rounded-lg overflow-hidden mx-auto bg-white flex justify-between items-center cursor-pointer mb-2'>
                  <aside className='w-10/12 p-1 flex items-center'>
                      <img src={user?.pimg} alt="" className=' w-14 aspect-square rounded-full bg-fuchsia-500'/>
                      <article className='mr-auto pl-1'>
                          <h1 className=' text-base font-semibold'>{user?.name}</h1>
                          <h2 className=' text-sm font-semibold'>{user?.title}</h2>
                      </article>
                  </aside>
                  <aside  className=' w-2/12 bg-cyan-4090 flex items-center justify-center'>
                      <GrAddCircle className=' h-5 w-5 text-cyan-400'/>
                  </aside>
              </div>
            ))}
          </section>
          
         { Cerror.length ? <h1 className='text-xs font-semibold bg-red-500 text-white py-1'>{Cerror}</h1> :<></>}
          <button onClick={createGroup} className=' w-3/5 active:scale-95 bg-amber-500 h-14 my-2 rounded-md mx-auto text-lg font-semibold text-white '>Create { groupTitle || 'Group'}</button>   
        </aside>

      </section>
    </main>
  )
}

export default CreateGroup
