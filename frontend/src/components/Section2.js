import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {BsThreeDotsVertical,BsCheckCircle} from 'react-icons/bs'
import { fetchChats } from '../redux/features/chatSlice'
import axios from 'axios'
const Section2 = ({chat}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ curChat,setCurChat] = useState(chat)

    const token = JSON.parse(localStorage.getItem('chatUser') ?? '')?.token

    const [memberAdmin,setmemberAdmin] = useState('mem')
    const mainUser= useSelector(state=> state.mainUser.mainUser)

    const Allusers = useSelector(state=>state.usersList.users)
    const [avbleUsers,setAvbleusers] =useState(Allusers?.filter(user=> curChat?.users.every(n=> n._id !== user._id)).filter(n=>n._id !== mainUser?._id).map(n=>({...n,check:false})))

    const meAdmin = curChat?.Admin?.some(admin => admin._id === mainUser?._id)

    const [editOpen,setEditOpen] = useState(false)

    const [addRem,setAddRem] = useState('add')

    const [addUser,setadddUsers] = useState([])

    function addToAdd(userId) {
      setAvbleusers(prev=>prev.map(n=> {

        if(n._id === userId && n.check === false){
          setadddUsers(prev=>!prev.includes(userId) ? [...prev,userId] : prev)
          return {...n,check:true}
        }else if(n._id === userId && n.check === true){
          setadddUsers(prev=>prev.filter(n=> n !== userId))
          return {...n,check:false}
        }
        return n
      }))
      // console.log(addUser)
    }

    const [kickUser,setKickUser] = useState([])

    const [remUsers,setRemUser] = useState(chat?.users.map(n=>({...n, check:false})))
    const [remErr,setRemErr] = useState("")
    function addToRem(userId) {
      setRemUser(prev=>prev.map(n=> {

        if(n._id === userId && n.check === false){
          setKickUser(prev=>!prev.includes(userId) ? [...prev,userId] : prev)
          return {...n,check:true}
        }else if(n._id === userId && n.check === true){
          setKickUser(prev=>prev.filter(n=> n !== userId))
          return {...n,check:false}
        }
        return n
      }))
      // console.log(addUser)
    }

  async function groupAdd() {

    if(!addUser.length) return
    
    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(
        "http://localhost:5000/chat/group-add",
        {
        
          userIds:[...addUser],
          chatId:curChat?._id
          
        },
        config)
      
        console.log(response.data);

        setCurChat(response?.data)

    } catch (error) {
      console.log(error);
    }
  }
  async function groupRem() {

    if(!kickUser.length){ setRemErr("no member is selected") ;return }
    if((curChat?.users.length - kickUser.length) <= 2) {  setRemErr("the group must remain with 2 users" );return} ;
    setRemErr("")
    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(
        "http://localhost:5000/chat/group-remove",
        {
        
          userIds:[...kickUser],
          chatId:curChat?._id
          
        },
        config)
      
        console.log(response.data);

        setCurChat(response?.data)

    } catch (error) {
      console.log(error);
    }
  }
  const [chatNewName,setchatNewName] = useState(null)
  async function groupRename() {

    if(!chatNewName.length){return }
    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(
        "http://localhost:5000/chat/rename",
        {
        
          chatName:chatNewName,
          chatId:curChat?._id
          
        },
        config)
      
        console.log(response.data);

       setCurChat(response?.data)

    } catch (error) {
      console.log(error);
    }
  }

  const [newAdmin,setNewAdmin] = useState()
  const [avblNewAdmin,setAvbleNewAdmin] = useState(curChat.users?.filter(user=> user._id !== mainUser?._id).map(n=>({...n,check:false})))

  function adminFun(User) {
    if(newAdmin?._id === User._id){
      setNewAdmin(null)
      setAvbleNewAdmin(prev=>prev.map((user)=> ({
        ...user, check:false
      }) ))
    }
    else{
      setNewAdmin(User)
      setAvbleNewAdmin(prev=>prev.map((user)=> ({
        ...user, check:user._id === User._id
      }) ))
    }
  }


  async function changeAdmin(params) {

    if(!newAdmin) return
    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(
        "http://localhost:5000/chat/change-admin",
        {
          
          chatId:curChat?._id,
          newAdmin: newAdmin?._id,
          oldAdmin: mainUser?._id

        },
        config)
      
        console.log(response.data);

       setCurChat(response?.data)
        dispatch(fetchChats(mainUser?._id))

        navigate(`/`)

    } catch (error) {
      console.log(error);
    }

  }

  async function deleteGroup() {
    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.delete(
        `http://localhost:5000/chat/delete-group/${curChat._id}`,
        config)
      
        console.log(response.data);

        dispatch(fetchChats(mainUser?._id))

        navigate(`/`)

        setCurChat([])
    } catch (error) {
      console.log(error);
    }
  }

  async function leaveGroup() {

    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(
        "http://localhost:5000/chat/group-remove",
        {
        
          userIds:[mainUser?._id],
          chatId:curChat?._id
          
        },
        config)
      
        console.log(response.data);

        setCurChat([])

        dispatch(fetchChats(mainUser?._id))

        navigate('/')

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    setAvbleusers(Allusers?.filter(user=> curChat?.users.every(n=> n._id !== user._id)).filter(n=>n._id !== mainUser?._id).map(n=>({...n,check:false})))
    setRemUser(curChat?.users.map(n=>({...n, check:false})))
    setchatNewName("")
    console.log('reload');
  },[curChat])

  return (

    <main style={{maxHeight:'99vh',height:'99vh',minWidth:'350px',backgroundColor:'#F6F1F1'}} className=' w-80 ml-auto flex flex-col overflow-hidden select-none'>
        
        {(curChat.isGroupChat) &&
        <aside style={{minHeight:'120px'}} className="relative w-full my-1 mx-auto mr-5 mb-2 flex items-center justify-center bg-cyan-400 rounded-t-md">
          {curChat.users?.slice(0,5).map(user=>(
              <div key={user?._id} className=" relative -mr-2 shadow-md h-fit w-fit rounded-full overflow-hidden">
                  <img src={user?.pimg} alt="img1" className="h-14 w-14 object-cover object-center"/>
              </div>
          ))}

          {meAdmin && <BsThreeDotsVertical onClick={()=>setEditOpen(!editOpen)} className=' absolute top-3 right-3 h-5 w-5 cursor-pointer'/>}
        </aside>}

        <h1 className='text-3xl font-semibold mb-2 text-center'>{curChat.title || "chat"}</h1>

        <h1 className='text-base font-semibold mb-2 text-center text-gray-600'>{(curChat.isGroupChat) && curChat.users?.length} members</h1>

        
      {editOpen ? 
        <section>
          <div className='flex flex-wrap gap-2 justify-around items-center text-xs font-semibold py-5 h-fit w-full bg-cyan-400'>
            
          <button onClick={()=>setAddRem('add')}    className='w-1/4 py-2 shadow-md transition active:scale-95 bg-white -500 rounded-md' style={{backgroundColor:addRem === "add" ?'#146C94':'#F6F1F1',color:addRem === "add" && '#F6F1F1'}}>Add member</button>
          <button onClick={()=>setAddRem('rem')}     className='w-1/4 py-2 shadow-md transition active:scale-95 bg-white -500 rounded-md'style={{backgroundColor:addRem === "rem" ?'#146C94':'#F6F1F1',color:addRem === "rem" && '#F6F1F1'}}>Kick member</button>  
          <button onClick={()=>setAddRem('rename')}  className='w-1/4 py-2 shadow-md transition active:scale-95 bg-white -500 rounded-md'style={{backgroundColor:addRem === "rename" ?'#146C94':'#F6F1F1',color:addRem === "rename" && '#F6F1F1'}}>Rename</button>
          <button onClick={()=>setAddRem('leave')}  className='w-2/5 mt-1 py-2 shadow-md transition active:scale-95 bg-white rounded-md' style={{backgroundColor:addRem === "leave" ?'#146C94':'#F6F1F1',color:addRem === "leave" && '#F6F1F1'}}>Leave</button>
          <button onClick={()=>setAddRem('del')}  className='w-2/5 mt-1 py-2 shadow-md transition active:scale-95 bg-white rounded-md'   style={{backgroundColor:addRem === "del" ?'#146C94':'#F6F1F1',color:addRem === "del" && '#F6F1F1'}}>Delete</button>

          </div>

          <section style={{maxHeight:"410px"}}  className=' w-full py-1 max-h-96 h-fit overflow-y-scroll scrollbarhidden'>
            {addRem === 'add' ? 
            <section className='flex flex-col'>
              <button onClick={groupAdd} className=' bg-green-500 w-10/12 mx-auto my-2 text-white text-sm font-semibold  py-3 rounded active:scale-95'>Add selected friends to the group</button>

              {avbleUsers?.map(user =>(
                <div key={user?._id} onClick={()=>addToAdd(user?._id)}  className='w-10/12 px-2 shadow-sm rounded-lg overflow-hidden mx-auto bg-white flex justify-between items-center cursor-pointer mb-2'>
                    <aside className='w-10/12 p-1 flex items-center'>
                        <img src={user?.pimg} alt="" className=' w-14 aspect-square rounded-full bg-fuchsia-500'/>
                        <article className='mr-auto pl-1'>
                            <h1 className=' text-base font-semibold'>{user?.name}</h1>
                            <h2 className=' text-sm font-semibold'>{user?.title}</h2>
                        </article>
                    </aside>
                    <aside  className=' w-2/12 bg-cyan-4090 flex items-center justify-center'>
                       {user?.check && <BsCheckCircle className=' h-5 w-5 text-green-600'/>}
                    </aside>
                </div>
              ))}
            </section>:
            addRem === 'rem' ? 
            <section className='flex flex-col'>
              <button onClick={groupRem} className=' bg-red-500 w-10/12 mx-auto my-2 text-white text-sm font-semibold  py-3 rounded active:scale-95'>Remove members from the group</button>
              <h1 className='text-red-500 text-sm text-center my-2 font-semibold'>-- {remErr} --</h1>
              {remUsers?.filter(n=>n._id !== mainUser?._id).map(user =>(
              <div key={user?._id} onClick={()=>addToRem(user?._id)}  className='w-10/12 px-2 shadow-sm rounded-lg overflow-hidden mx-auto bg-white flex justify-between items-center cursor-pointer mb-2'>
                  <aside className='w-10/12 p-1 flex items-center'>
                      <img src={user?.pimg} alt="" className=' w-14 aspect-square rounded-full bg-fuchsia-500'/>
                      <article className='mr-auto pl-1'>
                          <h1 className=' text-base font-semibold'>{user?.name}</h1>
                          <h2 className=' text-sm font-semibold'>{user?.title}</h2>
                      </article>
                  </aside>
                  <aside  className=' w-2/12 bg-cyan-4090 flex items-center justify-center'>
                    {user?.check && <BsCheckCircle className=' h-5 w-5 text-red-600'/>}
                  </aside>
              </div>
              ))}
            </section>:
            addRem === 'rename' ?

            <div className='w-full h-64 flex flex-col gap-5 items-center justify-center'>
                
                <label htmlFor="" className='font-semibold text-sm'>New Name</label>
                <input value={chatNewName} onChange={(e)=>setchatNewName(e.target.value.trim())} type="text" className='border-2 border-cyan-500 outline-none h-10 w-10/12 mx-3' placeholder={`${curChat?.title}`}/>

                <button onClick={groupRename} className=' bg-cyan-500 text-white text-sm font-semibold px-14 py-3 rounded active:scale-95' >Rename</button>
            </div>:
            
            addRem === 'leave' ? 
              <div className='w-full h- font-semibold flex flex-col items-center justify-center gap-6'>
                  <h1>You cant leave this group</h1>
                  <h1 className='text-sm text-center'>make someone else to the admin of <span className=' whitespace-nowrap'>{curChat.title}</span></h1>
                  <aside className='flex flex-wrap items-center w-full'>
                  {avblNewAdmin.map(user=>(
                    <div key={user?._id} onClick={()=>adminFun(user)} className={`flex flex-wrap items-center justify-start mx-auto w-fit m-2 rounded-2xl bg-${user?.check ? 'red' : 'cyan'}-400 px-2 py-1`}>
                      <img src={user?.pimg} alt="" className={` h-7 w-7 rounded-full bg-red-600 mx-1`}/>
                      <h1 className='w-20 font-medium my-auto truncate'>{user?.name}</h1>
                    </div>
                  ))}
                  </aside>

                  <button onClick={changeAdmin} className=' bg-red-500 text-white text-sm font-semibold px-10 py-3 rounded active:scale-95'>Make {newAdmin?.name || 'him'} admin and Leave</button>
              </div>:
            
            addRem === 'del' && 
              <div className='w-full h-60 font-semibold flex flex-col items-center justify-center gap-6'>
                  <h1 className=' text-center'>Do you realy want to Delete <span className=' whitespace-nowrap'>{curChat.title}</span> ?</h1>

                  <button onClick={deleteGroup} className=' bg-red-500 text-white text-sm font-semibold px-10 py-3 rounded active:scale-95'>Leave</button>
              </div>

          }
          </section>
        </section>:
        <> 
            <div className='flex justify-around items-center text-sm font-semibold px- h-20 w-full bg-cyan-400'>
                
                <button onClick={()=>setmemberAdmin('mem')}  style={{backgroundColor:memberAdmin === "mem" ?'#146C94':'#F6F1F1',color:memberAdmin === "mem" && '#F6F1F1'}}     className='px-4 py-2 transition bg-white rounded-md'>Members</button>
                <button onClick={()=>setmemberAdmin('ad')}   style={{backgroundColor:memberAdmin === "ad" ?'#146C94':'#F6F1F1',color:memberAdmin === "ad" && '#F6F1F1'}}       className='px-4 py-2 transition bg-white rounded-md'>Admin</button>  

                {!meAdmin && <button onClick={()=>setmemberAdmin('leave')}style={{backgroundColor:memberAdmin === "leave" ?'#146C94':'#F6F1F1',color:memberAdmin === "leave" && '#F6F1F1'}} className='px-4 py-2 transition bg-white rounded-md'>Leave</button>}

            </div>

            <p style={{height:'2px'}} className=' my-2 w-full bg-black'></p>

            <section className='scrollbarhidden w-full h-full  overflow-y-scroll'>
            
                {memberAdmin === 'mem' ? 
                  <>
                    {curChat.users?.map(user=>(
                            <Link to={ user._id !== mainUser?._id && `/chat/${user?._id}`} key={user?._id} style={{height:'70px'}} className='w-10/12 rounded-lg overflow-hidden mx-auto bg-white flex justify-between items-center cursor-pointer mb-2'>
                                <aside className='w-11/12 p-1 flex items-center'>
                                    <img src={user?.pimg} alt="" className=' w-14 aspect-square rounded-full bg-cyan-500'/>
                                    <article className='mr-auto pl-1'>
                                        <h1 className=' text-base font-semibold'>{user?.name}</h1>
                                        <h2 className=' text-sm font-semibold'>{user?.title || 'user'}</h2>
                                    </article>
                                </aside>
                            </Link>
                    ))}
                  </>:
                memberAdmin === "ad" ?
                    <>
                    {chat?.Admin?.map(admin => (
                          <Link to={ admin._id !== mainUser?._id && `/chat/${admin?._id}`} key={admin?._id} style={{height:'70px'}} className='w-10/12 rounded-lg overflow-hidden mx-auto bg-white flex justify-between items-center cursor-pointer mb-2'>
                              <aside className='w-11/12 p-1 flex items-center'>
                                  <img src={admin?.pimg} alt="" className=' w-14 aspect-square rounded-full bg-cyan-500'/>
                                  <article className='mr-auto pl-1'>
                                      <h1 className=' text-base font-semibold'>{admin?.name}</h1>
                                      <h2 className=' text-sm font-semibold'>{admin?.title || 'user'}</h2>
                                  </article>
                              </aside>
                          </Link>
                    ))} 
                    </>:
                (memberAdmin === 'leave' && !meAdmin ) &&
                    <div className='w-full h-60 font-semibold flex flex-col items-center justify-center gap-6'>
                      <h1>Do you realy want to leave {chat?.title} ?</h1>

                      <button onClick={leaveGroup} className=' bg-red-500 text-white text-sm font-semibold px-10 py-3 rounded active:scale-95'>Leave</button>
                    </div>}
            </section>
        </>}
    </main>
  )
}

export default Section2