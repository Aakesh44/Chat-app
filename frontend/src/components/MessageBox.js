import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { useSelector } from 'react-redux'
const MessageBox = ({messages}) => {

    const mainUser= useSelector(state=> state.mainUser.mainUser)

    function sameSender(m,i) {
        return (
            i < messages.length -1 && 
           
            ( m.sender._id !== messages[i+1].sender._id || !messages[i+1].sender._id) &&

            messages[i].sender._id !== mainUser?._id
        )
    }

    function lastMsg(i) {
        
        return (
            i === messages.length -1 &&

            messages[messages.length -1].sender._id !== mainUser?._id &&

            messages[messages.length -1].sender._id
        )
    }

    function formatTime(timeString) {
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure two-digit minutes
        
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }


    return (
        
        <ScrollableFeed className=' absolute bottom-0 h-full w-full bg-red-5000 overflow-y-scroll scrollbarhidden px-5 py-2 flex flex-col'>
            
            {messages && messages.map((m,i)=>(

                // <div className="w-4/5 mt-auto ml-auto flex items-end justify-end  h-fit bg-red-6 00 my-3 gap-2">
                //     <p className="m- auto text-xs font-mono">3:45</p>
                //     <h1 className=" rounded-br-none bg-gray-300 w-fit px-2  py-2 rounded-lg font-medium">hello 😍</h1>
                // </div>

                <div key={i} 
                style={{
                    marginTop:i === 0 && "auto" ,
                    marginBottom:(m.sender._id === messages[i+1]?.sender._id) ? '5px' : '15px' ,
                    marginLeft: (m.sender._id === mainUser?._id) && "auto",
                    justifyContent: (m.sender._id === mainUser?._id) ? "flex-end" : "flex-start"
                }} 
                className=" w-4/5  flex justify-ed items-end h-fit bg-red-6000 my-30 gap-2">

                     
                    <img style={{visibility:( (sameSender(m,i) || lastMsg(i)) ) ? 'visible' : 'hidden'}} src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais" alt="" className="h-8 w-8 rounded-full " /> 
                    
                    { (m.sender._id === mainUser?._id) && <p style={{fontSize: '10px',lineHeight: '1rem'}} className="mr- auto text- xs font-mono whitespace-nowrap">{formatTime(m.createdAt)}</p>}

                    <h1 
                    style={{
                        borderBottomLeftRadius:( (sameSender(m,i) || lastMsg(i)) ) && '0px' ,
                        borderBottomRightRadius:(m.sender._id == mainUser?._id) && '0px',
                        backgroundColor:(m.sender._id === mainUser?._id) ? "rgb(209 213 219)" : "rgb(6 182 212)" 
                    }} 
                    className=" m -auto bg-cyan-5000 w-fit px-2  py-2 rounded-lg font-medium">{m.content}</h1>
                    { (m.sender._id !== mainUser?._id) && <p style={{fontSize: '10px',lineHeight: '1rem'}} className="mr- auto text- xs font-mono whitespace-nowrap">{formatTime(m.createdAt)}</p>}

                </div>

            ))}
        </ScrollableFeed>
    )
}

export default MessageBox