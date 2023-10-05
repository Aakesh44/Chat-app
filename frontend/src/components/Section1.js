import React from 'react'
import Profile from './Profile'
import UserList from './UserList'
import ChatList from './ChatList'
import CreateGroup from './CreateGroup'

import {useSelector} from 'react-redux'
import NotiList from './NotiList'

const Section1 = ({option}) => {

  const popUp = useSelector(state=>state.CGroupPop.popUp)

  return (
    <main style={{maxHeight:'100vh',height:'100vh',minWidth:'350px',}} className=' w-80 py-1 mx-1'>

        {
          option === 'profile' ? <Profile />:

          option === 'chatlist' ? <ChatList/>:

          option === 'userlist' ? <UserList/>:<></>

          // option === 'notilist' && <NotiList/>
        }
        
        {popUp===true && <CreateGroup/>}
        {/*  */}
          
    </main>
  )
}

export default Section1 