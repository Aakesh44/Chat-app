import React, {useState } from 'react'
import {GrNext} from 'react-icons/gr'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import UserLoading from './UserLoading'

const Profile = ({chatUser}) => {
    console.log(chatUser);
    const mainUser= useSelector(state=> state.mainUser.mainUser)

    const [option,setOption] = useState("friends")

    const [frndSearchQuery,setfrndSearchQuery] = useState("")

    let getMe = chatUser?.friends?.find(user=>user._id === mainUser?._id)

    if (getMe ) {
        chatUser.friends = chatUser?.friends.filter(user => user._id !== getMe._id)
        chatUser.friends.unshift(getMe)
    }  
    
    let SortedUsers = chatUser?.friends?.filter(user=>user.name.toLowerCase().trim().split(" ").join("").includes(frndSearchQuery.toLowerCase().trim().split(" ").join("")))

// console.log(SortedChats);

  return (
<>
      {chatUser ? 
      <section className='  w-full h-full rounded-lg overflow-hidden'> 

        <main style={{height:'30%',backgroundColor:"#000000",color:'#F6F1F1'}} className=' h-1 /3 w-full bg--400 select-none'>
          <section style={{backgroundImage:`url(${chatUser?.cimg})`}} className='relative bg-cover bg-center bg--400 h-1/2 w-full '>

            {/* <img src={chatUser?.cimg} alt="" className='  h-full w-full'/> */}

            <div className=' absolute w-1/4 top-2/3 left-2 border-2 border-white aspect-square rounded-full flex items-center justify-center overflow-hidden bg-white'>
              <img src={chatUser?.pimg} alt="" />
            </div>

          </section>

          <article className=' h-1/4 w-3/4 px-4 ml-auto flex flex-col'>
            <h1 className=' text-xl font-bold'>{chatUser?.name}</h1>
            <h2 className=' text-sm font-semibold text-gray-400'>{chatUser?.title}</h2>
          </article>
          <article className='h-1/4 w-full px-2 py-1 bg-f uchsia-400 overflow-hidden'>
            <h3 className=' text-xs font-medium '>{chatUser?.bio}</h3>
          </article>
        </main>


        <section style={{height:"8%",backgroundColor:'#000000'}} className=' w-full h-1 6 bg-cya n-400 flex items-center justify-evenly'>

          <div className=' w-1/2 h-full p-1'>

            <button onClick={()=>setOption("friends")} style={{color: '#F6F1F1'}} className='w-full h-full transition rounded-md bg-green-500 shadow-md'>
              <h2 className=' text-xs font-semibold'>Friends</h2>
            </button>
          </div>

          <div className=' w-1/2 h-full p-1'>
            <button onClick={()=>setOption("friends")} style={{backgroundColor:option === "friends" ?'#146C94':'#F6F1F1',color:option === "friends" && '#F6F1F1'}} className='w-full h-full transition rounded-md bg-cyan-300 shadow-md'>
              <h1 className=' text-base font-bold'>{chatUser?.friends?.length}</h1>
              <h2 className=' text-xs font-semibold'>Friends</h2>
            </button>
          </div>
          
        </section>

        {option === "friends" &&
        <section style={{height:"62%",backgroundColor:'#F6F1F1'}} className=' w-full h-2 /3 pb-5 bg-red-300 rounded-lg overflow-hidden'>
        

          <div className=' my-2 mx-1 px-1 h-10 bg-white border rounded-full flex justify-center items-center'>
              <input onChange={(e)=>setfrndSearchQuery(e.target.value)} type="text" className=' w-11/12 h-4/5 outline-none placeholder:text-sm font-semibold'  placeholder='search friends '/>
          </div>

          <p style={{height:'2px'}} className=' my-2 w-full bg-black'></p>

          <section style={{height:'90%'}} className='scrollbarhidden w-full overflow-y-scroll'>
              {(SortedUsers?.length ) ?

              SortedUsers?.map(friend=>(
              <Link to={friend._id !== mainUser?._id && `/chat/${friend._id}`} style={{height:'70px'}} key={friend._id} className='w-10/12 shadow-sm rounded-lg overflow-hidden mx-auto bg-white flex justify-between items-center cursor-pointer mb-2'>
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

        </section>
}
      </section>:

      <UserLoading/>}

</>
  )

}

export default Profile