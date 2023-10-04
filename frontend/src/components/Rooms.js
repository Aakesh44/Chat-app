import React from 'react'
import ChatRoom from './ChatRoom'
import PostRoom from './PostRoom'
import Profile from './Profile'
import { Route, Routes } from 'react-router-dom'

const Rooms = () => {
  return (
    <main style={{maxHeight:'100vh',height:'100vh',minWidth:'450px',backgroundColor:'#F6F1F1'}} className=' w-full py-1 mr-1 flex overflow-y-scroll  scrollbarhidden'>
        
        <Routes>
          <Route path='/' element={<PostRoom/>}/>
          <Route path='/posts/:id' element={<PostRoom/>}/>
          <Route path='/chat/:id' element={<ChatRoom/>} />
          <Route path='/group-chat/:id' element={<ChatRoom/>} />
        </Routes>

        {/* <aside style={{maxHeight:'99vh',height:'99vh',minWidth:'350px',}} className=' bg-white sticky top-0 w-80  px-1 mx-1 ml-auto'>
          <Profile/>  
        </aside> */}
        
        
    </main>
  )
}

export default Rooms