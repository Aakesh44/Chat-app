import React, { useState } from 'react'
import {AiOutlineSearch,AiOutlinePlus} from 'react-icons/ai'
import {GrNext} from 'react-icons/gr'
import {FaUserFriends} from 'react-icons/fa'
import { Link } from 'react-router-dom'

import {useSelector } from 'react-redux'

const UserList = () => {

    const mainUser= useSelector(state=> state.mainUser.mainUser)
    console.log(mainUser);
    const users = useSelector(state=>state.usersList.users)

    const [searchQuery,setSearchQuery] = useState("")

    let SortedUsers = users?.filter(user=>(user.name.toLowerCase().trim().split(" ").join("").includes(searchQuery.toLowerCase().trim().split(" ").join("")) || user.title.toLowerCase().trim().split(" ").join("").includes(searchQuery.toLowerCase().trim().split(" ").join(""))) && user._id !== mainUser._id)

  return (
    <main style={{backgroundColor:'#F6F1F1'}} className=' w-full h-full pb-5 bg-red-300 rounded-lg overflow-hidden'>
        
        <header style={{backgroundColor:'#146C94'}} className=' p-2 px-3 text-lg font-bold text-white'>{ "Peoples"}</header>

        <div className=' my-2 mx-1 px-1 h-10 bg-white border rounded-full flex justify-center items-center'>
            <AiOutlineSearch className='h-5 w-5 '/>
            <input onChange={(e)=>setSearchQuery(e.target.value)} type="text" className=' w-11/12 h-4/5 pl-1 outline-none placeholder:text-sm font-semibold'  placeholder='search by username '/>
        </div>

        <p style={{height:'2px'}} className=' my-2 w-full bg-black'></p>

        <section className='scrollbarhidden w-full h-full pb-24 overflow-y-scroll'>

        {users?.length ?
            SortedUsers.map(user=>(
                <Link to={`/chat/${user._id}`} key={user._id} style={{height:'70px'}} className='w-10/12 rounded-lg overflow-hidden mx-auto bg-white flex justify-between items-center cursor-pointer mb-2'>
                    <aside className='w-10/12 p-1 flex items-center'>
                        <img src={user.pimg} alt="" className=' w-14 aspect-square rounded-full bg-cyan-500'/>
                        <article className='mr-auto pl-1'>
                            <h1 className=' text-base font-semibold'>{user.name}</h1>
                            <h2 className=' text-xs font-semibold'>{user.title || 'user'}</h2>
                        </article>
                    </aside>
                    <aside className={` w-2/12  ${mainUser?.friends.some(n=>n._id === user?._id) ? 'bg-white' : 'bg-white'}   h-full flex items-center justify-center`}>
                        {mainUser?.friends.some(n=>n._id === user?._id) ? <FaUserFriends className=' text-black h-5 w-5'/> : <AiOutlinePlus className=' text-black h-5 w-5'/>}
                        
                    </aside>
                </Link>
            )):<></>

        }


            {/* <ul>
                {users.users.length && users.users.map(user=> (<li key={user._id}>{user.name}</li>))}
            </ul> */}

        </section>
    </main>
  )
}

export default UserList