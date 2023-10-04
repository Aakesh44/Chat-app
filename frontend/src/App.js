import Home from "./components/Home";
import LogInPage from "./components/LogInPage";
import './App.css'

import { useDispatch,useSelector } from "react-redux";

import { getMainUser } from "./redux/features/mainUserSlice";
import { fetchUsers } from "./redux/features/userSlice";
import { fetchChats } from "./redux/features/chatSlice";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {

  const USER = JSON.parse(localStorage.getItem('chatUser'))

  const dispatch = useDispatch()

  const userData = useSelector(state=>state.userData)

  const [open,SetOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(()=>{
// console.log(USER);
    if(USER?.token){
      // console.log("token :", userToken);
      console.log('openingg');
      navigate('/')
       dispatch(getMainUser(USER?._id))

      dispatch(fetchUsers())

      dispatch(fetchChats(USER?._id))

      SetOpen(true)
    }

  },[USER?.token,userData.userData])

  return (
    <main className="App">

      {open ? <Home/> : <LogInPage/>}
      
    </main>
  );
}

export default App;
