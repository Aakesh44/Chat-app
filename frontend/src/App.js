import Home from "./components/Home";
import LogInPage from "./components/LogInPage";
import './App.css'

import { useDispatch,useSelector } from "react-redux";

import { getMainUser } from "./redux/features/mainUserSlice";
import { fetchUsers } from "./redux/features/userSlice";
import { fetchChats } from "./redux/features/chatSlice";
import {fetchPosts} from "./redux/features/postSlice"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {

  const USER = JSON.parse(localStorage.getItem('chatUser'))

  const dispatch = useDispatch()

  const userData = useSelector(state=>state.userData)
  const mainUser = useSelector(state=> state.mainUser.mainUser)
  const users = useSelector(state=>state.usersList.users)
  const chatList = useSelector(state=>state.chatsList.chats)
  const Posts = useSelector(state=>state.postsList.posts)

  const [open,SetOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(()=>{
// console.log(USER);
    if(USER?._id){
      // console.log("token :", userToken);
      console.log('openingg');
      navigate('/')
       dispatch(getMainUser(USER?._id))

      dispatch(fetchUsers())

      dispatch(fetchChats(USER?._id))

      dispatch(fetchPosts())

      SetOpen(true)
    }

  },[USER?._id,userData.userData])

  return (
    <main className="App">
      {((userData?.loading) || (mainUser?.loading) || (users?.loading) || (chatList?.loading) || (Posts?.loading) ) ? 

      <div  className="h-full w-full bg-no-repeat bg-left bg-blend-multiply" style={{backgroundColor:'#F6F1F1',backgroundImage:`url("https://img.freepik.com/free-vector/stay-home-abstract-concept-vector-illustration-forced-isolation-covid19-outbreak-prevention-measures-social-distance-governmental-support-self-protection-wear-mask-abstract-metaphor_335657-6164.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais")`}}>
          <AiOutlineLoading3Quarters className=" absolute animate-spin top-1/2 right-1/3 h-14 w-14"/>
      </div>:

      <>{open ? <Home/> : <LogInPage/>} </>
      
      }
      
    </main>
  );
}

export default App;
