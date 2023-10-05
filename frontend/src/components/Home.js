import React, { useState } from 'react'
import SideBar from './SideBar'
import Section1 from './Section1'
import Section2 from './Section2'
import Rooms from './Rooms'
import { useSelector } from 'react-redux'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import {RiChatSmile3Line} from 'react-icons/ri'

import { ScaleLoader } from 'react-spinners'

const Home = () => {

  const mainUser = useSelector(state=> state.mainUser.mainUser)

  const [section1Option,setSection1Option] = useState('profile')

  const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
        position:"absolute",
        top:'50%',
        right:'50%'
    };

  return (
    <main className=' w-full h-full flex items-center'>

        {mainUser ? 
        <>
        <SideBar setOption={setSection1Option} option={section1Option}/>

        <Section1 option={section1Option}/>

        <Rooms/>
       </>:
        <div style={{backgroundColor:'#F6F1F1'}} className="h-full w-full relative" >
            <header className=' w-full h-24  flex justify-center px-10'>
              <h1 style={{color:"#146C94"}} className=' flex gap-2 items-center text-5xl font-extrabold my-auto'>Chatly <RiChatSmile3Line/></h1>
            </header>

            <ScaleLoader 
              color={'rgb(6 182 212)'}
              loading={true}
              cssOverride={override}
              height={50}
              width={5}
              aria-label="Loading Spinner"
              data-testid="loader"/>
        </div>}
    </main>
  )
}

export default Home