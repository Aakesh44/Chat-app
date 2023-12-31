import { useEffect, useState } from "react"
import {BsEmojiSmile} from 'react-icons/bs'
import {AiOutlinePaperClip,AiOutlineUserAdd,AiOutlineLoading3Quarters} from 'react-icons/ai'
import {RiSendPlaneFill} from 'react-icons/ri'
import { fetchChats } from "../redux/features/chatSlice"
import { getMainUser } from "../redux/features/mainUserSlice"
import { setNotifications } from "../redux/features/notificationSlice"
import { useSelector,useDispatch } from "react-redux"

import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import User from "./User"
import Section2 from "./Section2"
import MessageBox from "./MessageBox"

import { BeatLoader } from "react-spinners"

import {io} from "socket.io-client"

const ENDPOINT = "https://chat-server-qvkq.onrender.com"

let socket 
let selectedChatCompare = null

const ChatRoom =() =>{

    const mainUser= useSelector(state=> state.mainUser.mainUser)
    const notifications = useSelector(state=>state.notifications.notifications)
    const dispatch = useDispatch()

    const [socketConnected,setSocketConnected] = useState(false)
    const [curChat,setCurChat] = useState()
    const [curMsgs,setCurMsgs] = useState()
    const [newMsg,setNewMsg] = useState("")

    const [typing,setTyping] = useState(false)
    const [isTyping,setIsTyping] = useState(false)

    const [getChatCalled,setGetChatCalled] = useState(false)

    const emojis = ["😀","😁","😂","😃","🤣","😄","😎","😋","😊","😉","😍","🤩","😆","😘","🤔","😶‍🌫️","😹","🙀","🤗","🤐","🤨","😏","😒","😓","😔","😕","😖","😗","😘","😙","😚","😛","😜","😝","🤑","🤓","🤗","😺","😸","😻"];
    const [emojiPopUp,setEmojiPopUp] = useState(false)

    const [loading,setLoading] = useState(false)
    const [msgLoading,setMsgLoading] = useState(false)
    const location = useLocation()
    const URL = location.pathname.split('/')
    const chatType = URL[1]
    const userId = URL[2]


    const token = JSON.parse(localStorage.getItem('chatUser') ?? '')?.token

    async function addfriend (){
        setLoading(true)
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            };

            const response = await axios.put(
                "https://chat-server-qvkq.onrender.com/user/add-friend",
                {
                    userId:userId,
                    mainId:mainUser?._id
                },
                config
            )

            console.log(response.data);
            // setisFriend(isFriendMemo)

            // console.log(isFriend);

            dispatch(getMainUser(mainUser?._id))

        } catch (error) {
            console.log(error);
        }

        setLoading(false)
    }

    async function getChat (){

        setLoading(true)
        console.log(userId,mainUser._id);
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios.post(
                `https://chat-server-qvkq.onrender.com/chat/get-create-chat`,
                {
                    userId:userId,
                    mainId:mainUser?._id
                },
                config
            )
        
            console.log(response.data);
            setCurChat(response.data)
            dispatch(fetchChats(mainUser?._id))
            fetchMsgs(response.data._id)

        } catch (error) {
            console.log(error);
        }

        setLoading(false)
    }

    async function getGroupChat(){
        setLoading(true)
        // console.log(userId,mainUser?._id);
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios.get(
                `https://chat-server-qvkq.onrender.com/chat/getGroup/${userId}`,
                config
            )
        
            console.log(response.data);
            setCurChat(response.data)
            // dispatch(fetchChats(mainUser?._id))

            fetchMsgs(response.data._id)

        } catch (error) {
            console.log(error);
        }

        setLoading(false)        
    }

    async function sendMsg(e){

        e.preventDefault()
        let typedMsg = newMsg.trim()
        if(!typedMsg) return 
        setMsgLoading(true)
        setNewMsg("")
        socket.emit('stop typing',curChat?._id)
        // console.log(newMsg);
        try {
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios.post(
                `https://chat-server-qvkq.onrender.com/message/send`,
                {
                    message:typedMsg, 
                    chatId:curChat?._id,
                    sender:mainUser?._id
                },
                config
            )
        
            console.log(response.data);
            setCurMsgs(prev=> [...prev, response.data])
            socket.emit('new message', response.data)
            // fetchMsgs(response.data?.chat?._id)
            setMsgLoading(false)


        } catch (error) {
            console.log(error);
        }

    }

    async function fetchMsgs(chatId){
        if(!curChat) return 

        setLoading(true)
        // console.log(newMsg);
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // console.log(curChat?._id);
            const response = await axios.get(
                `https://chat-server-qvkq.onrender.com/message/fetch/${chatId}`,

                config
            )
        
            console.log(response.data);

            setCurMsgs(response.data)
            
            setLoading(false)

            socket.emit('join chat',curChat._id)

        } catch (error) {
            console.log(error);
        }

        
    }

    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit("setup", mainUser)
        socket.on( "connected", () =>{setSocketConnected(true);console.log('socket connect')})

        console.log('leo das');

        socket.on('typing' ,()=>setIsTyping(true))
        socket.on('stop typing',()=>setIsTyping(false))

        return () =>{
            if(socket){
                socket.disconnect()
            }
        }
    },[mainUser])

    useEffect(()=>{
        console.log('aiaiai');
        if(curChat?._id) {
            console.log('kiki');
            fetchMsgs(curChat?._id)
            selectedChatCompare = curChat 
        }
    },[curChat])
    
    useEffect(()=>{

        const messageReceived = (newMessageReceived) =>{
            console.log('bibibi');
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
            console.log('notiiii');
                if(!notifications.includes(newMessageReceived)){
                    dispatch(setNotifications([newMessageReceived,...notifications]))
                    dispatch(fetchChats(mainUser?._id))
                }
            }
            else{
                console.log(newMessageReceived.chat.title || 'noo');
                setCurMsgs(prev=> [...prev , newMessageReceived])
                dispatch(fetchChats(mainUser?._id))
                console.log('jii');
            }
        }

        console.log('njnjnjnjnjjnjnjjjjjjj');

        socket?.on("message received" , messageReceived)

        return () =>{
            socket?.off("message received", messageReceived)
        }

    },[selectedChatCompare])


    useEffect(()=>{
        
        console.log('1st:',getChatCalled);
        // console.log(URL);
        setCurChat(prev=>prev = [])
        setCurMsgs(prev=>prev = [])
        setNewMsg("")

        if(mainUser?.friends.some(n=>n._id === userId) && chatType === 'chat'){
            console.log('chattt');
            getChat()
            setGetChatCalled(true)
        }
        else if( chatType === 'group-chat'){
            getGroupChat()
            setGetChatCalled(true)
        }

        // console.log('2nd:',getChatCalled);
        setGetChatCalled(false)
        // console.log('last:',getChatCalled);
    },[mainUser,userId,chatType,mainUser?._id,notifications])

    const chatUser = !(curChat?.isGroupChat) && curChat?.users?.find(n=> n._id !== mainUser?._id)
    // console.log("chatUser" ,chatUser);

    function msgTyping(e){
        setNewMsg(e.target.value)

        if(!socketConnected) return

        if(!typing) {
            setTyping(true)
            socket.emit('typing' , curChat?._id)
        }

        console.log('typing 1 :',typing);

        let lastTypeTime = new Date().getTime()
        let timingLen = 3000

        setTimeout(()=>{
            console.log('ko');
            let timeNow = new Date().getTime() 
            let timeDiff = timeNow - lastTypeTime 
            console.log(timeDiff);
            console.log('typing 2:',typing);
            if(timeDiff >= timingLen){
                console.log('innn');
                socket.emit('stop typing',curChat?._id)
                setTyping(false)
            }
            console.log('k');
        }, timingLen)
    }

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
        position:"absolute",
        top:'-20px',
        left:'20px'
    };


    return (
        <main style={{backgroundColor:'#F6F1F1'}} className="relative ab h-full w-full rounded-lg flex p-1 pt-0 ">
        
        {curChat ?
        <main className="h-full w-full flex items-center">
        <aside style={{minWidth:'350px'}} className="h-full w-full flex flex-col justify-between overflow-hidden">
            <header style={{backgroundColor:"#19A7CE",height:'80px'}} className=" h-16 mb-auto  flex items-center justify-start px-5 bg-cyan-300 rounded-t-lg">
                
                {!(curChat?.isGroupChat) &&  
                <div style={{backgroundImage:`url(${curChat?.users?.find(n=> n._id !== mainUser?._id)?.pimg})`}} className=" bg-cover bg-center h-10 w-10 rounded-full mr-5 overflow-hidden bg-cyan-600">
                    {/* <img src={ curChat?.users?.find(n=> n._id !== mainUser?._id)?.pimg} alt="" /> */}
                </div>}

                {(curChat?.isGroupChat) &&
                <aside className="flex mr-5 items-center bg-amber-3000">
                    {curChat?.users?.slice(0,5).map(user=>(
                        <div key={user?._id} className=" relative -mr-2 shadow-md h-10 w-10 rounded-full overflow-hidden">
                            <img src={user?.pimg} alt="img1" className="h-10 w-10 object-cover object-center"/>
                        </div>
                    ))}

                </aside>}

                <h1 className=" text-2xl font-bold">
                    {(curChat?.isGroupChat) ? curChat.title : curChat?.users?.find(n=> n._id !== mainUser?._id)?.name}
                </h1>



            </header>

            <section style={{maxHeight:'100%'}} className="relative bg-amber-3000 select-none h-full w-full mt-auto ">
                {/* style={{minHeight:"82%",maxHeight:"82%"}} */}
                <MessageBox messages={curMsgs}/>

                {loading && <div className=" absolute inset-0  flex items-center justify-center">
                    {<AiOutlineLoading3Quarters className=" animate-spin h-12 w-12 text-cyan-800"/>}
                </div>}

            </section>

            {((mainUser?.friends?.some(n=>n._id === userId)) || (curChat?.isGroupChat)) ? 
            <form onSubmit={(e)=>sendMsg(e)} style={{backgroundColor:"#",height:'80px'}} className=" relative h-16 w-full -ml-1 rounded-lg bg--500 shadow-md mt-auto flex items-center p- px-5 bg-white">
                {/* {isTyping &&  */}
                <BeatLoader 
                    color={'rgb(6 182 212)'}
                    loading={isTyping}
                    cssOverride={override}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"/>
                {msgLoading && <AiOutlineLoading3Quarters className=" absolute -top-10 right-8 animate-spin text-cyan-500"/>}
                <textarea type="text" value={newMsg} onChange={(e)=>msgTyping(e)} style={{maxWidth:'66%'}} rows={1} className=" relative w-4/6 h-5/6  flex flex-wrap resize-none bg-green-6000 text-base font-semibold px-1 outline-1 outline-cyan-700 scrollbarhidden placeholder:absolute placeholder:top-1/3" placeholder="Write your message... "/>

                <div className="flex items-center p-2 py-4  justify-between w-40 h-full ml-auto ">
                    <span className=" relative cursor-pointer">
                        <BsEmojiSmile onClick={()=>setEmojiPopUp(!emojiPopUp)}  className={`h-5 w-5 ${emojiPopUp ? 'text-amber-500': 'text-gray-400'} `}/>

                        {emojiPopUp && 
                            <section className=" select-none w-52 h-52 grid grid-cols-8 p-2 items-center absolute z- -top-56 left-1/2  transition -translate-x-1/2 bg-white pop up shadow-lg cursor-default rounded">

                                {emojis.map((emoji,ind)=>(
                                    <div onClick={()=>setNewMsg(newMsg+emoji)} key={ind} className="h-5 w-5 p-1 text-sm hover:scale-150 hover:bg-cyan-500 flex items-center justify-center rounded-md">{emoji}</div>
                                ))}
                                
                            </section>
                        }
                    </span>
                    <span><AiOutlinePaperClip className=" h-5 w-5 text-gray-500"/></span>
                    <button type="submit" onClick={()=>setEmojiPopUp(false)} className=" cursor-pointer bg-green-600 flex items-center justify-center text-white h-full aspect-square rounded-md"><RiSendPlaneFill className=" h-5 w-5"/></button>
                </div>

            </form>:
            <footer style={{backgroundColor:"#",height:'80px'}} className=" h-16 w-full rounded-lg shadow-md mt-auto flex justify-center gap-5 items-center p- px-5 bg-white">

                <h1 className=" font-semibold">You have to add "name" to friend list to send message</h1>
                <button onClick={addfriend} style={{backgroundColor:"#146C94",color:"#F6F1F1"}} className='flex px-2 py-3 rounded items-center gap-2 cursor-pointer active:scale-95' >
                    <p className=' text-xs font-medium  right-6 top-0 whitespace-nowrap'>Make Friend</p>
                    <AiOutlineUserAdd className='h-4 w-4'/>
                    
                </button>
            </footer>}

        </aside>
        <aside style={{maxHeight:'99vh',height:'99vh',minWidth:'350px',}} className=' bg-white sticky top-0 w-80  px-1 mx- ml-auto'>
            {(curChat?.isGroupChat) ? <Section2 chat={curChat}/> : <User chatUser = {chatUser ? chatUser : undefined}/> }
            {/* */}
            
        </aside>
        </main>:
            <div className="w-full h-full flex flex-col items-center justify-center gap-10 editbg">
                <img src="https://cdn-icons-png.flaticon.com/128/4761/4761034.png" alt="" className="h-40 w-40"/>

                <h1 className=" font-semibold">Something wrong.. Go to <Link to='/' className=" text-2xl underline font font-semibold mx-2 text-cyan-600">home</Link>  </h1>
            </div>
        }
        </main>
    )
};

export default ChatRoom;

