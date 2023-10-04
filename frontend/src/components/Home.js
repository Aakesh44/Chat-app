import React, { useState } from 'react'
import SideBar from './SideBar'
import Section1 from './Section1'
import Section2 from './Section2'
import Rooms from './Rooms'

const Home = () => {

  const [section1Option,setSection1Option] = useState('profile')

  return (
    <main className=' w-full h-full flex items-center'>
        <SideBar setOption={setSection1Option} option={section1Option}/>

        <Section1 option={section1Option}/>

        <Rooms/>
       
        {/* <Section2/> */}
    </main>
  )
}

export default Home