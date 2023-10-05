import React,{useState} from 'react'
import {AiOutlineClose,AiOutlineLoading3Quarters} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { getMainUser } from '../redux/features/mainUserSlice'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'

const ProfileEdit = ({setEditOpen}) => {
    // dispatch(getMainUser(USER?._id))
    const token = JSON.parse(localStorage.getItem('chatUser'))?.token
    const dispatch = useDispatch()
    const mainUser = useSelector(state=>state.mainUser.mainUser)

    const [name,setName] = useState(mainUser?.name)
    const [title,seTtitle] = useState(mainUser?.title)
    const [bio,setBio] = useState(mainUser?.bio)
    const [pimg,setPimg] = useState(mainUser?.pimg)
    const [cimg,setCimg] = useState(mainUser?.cimg)
    const [loading,setLoading] = useState(false)

    const PIMGpost = (pimg) =>{
        setLoading(true)
        if(!pimg) { console.log('pimg error');return} 

        if(pimg.type === "image/jpeg" || pimg.type === "image/png" ){

            const data = new FormData()
            data.append('file',pimg)
            data.append('upload_preset','chatlyy')
            data.append('cloud_name', "dbbq6djnb")

            fetch("https://api.cloudinary.com/v1_1/dbbq6djnb/image/upload",{
                method:'post',
                body: data
            }).then((res)=>res.json())
            .then((data)=>{
                setPimg(data.url.toString())
                console.log(data.url.toString());
                setLoading(false)
            })
            .catch((err)=>{
                console.log(err)
                setLoading(false)
            })
        }
        else{console.log('img format error');}
    }

    const CIMGpost = (cimg) =>{
        setLoading(true)
        if(!cimg) { console.log('cimg error');return} 

        if(cimg.type === "image/jpeg" || cimg.type === "image/png" ){

            const data = new FormData()
            data.append('file',cimg)
            data.append('upload_preset','chatlyy')
            data.append('cloud_name', "dbbq6djnb")

            fetch("https://api.cloudinary.com/v1_1/dbbq6djnb/image/upload",{
                method:'post',
                body: data
            }).then((res)=>res.json())
            .then((data)=>{
                setCimg(data.url.toString())
                console.log(data.url.toString());
                setLoading(false)
            })
            .catch((err)=>{
                console.log(err)
                setLoading(false)
            })
        }
        else{console.log('img format error');}
    }
 
    const navigate = useNavigate()
    const [editPageOption,setEditPageOption] = useState(true)


    async function EditProfile(e) {
        e.preventDefault()
        if(!name || !title || !bio) return 
        console.log(name , title , bio , pimg ,cimg);
        setLoading(true)
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            };

            const response = await axios.put(
                "https://chatly-server.vercel.app/user/edit-user",
                {
                    userId:mainUser?._id,
                    name : name ? name : mainUser?.name,
                    title : title ? title : mainUser?.title,
                    bio  : bio ? bio : mainUser?.bio,
                    pimg : pimg ? pimg : mainUser?.pimg,
                    cimg : cimg ? cimg : mainUser?.cimg,
                },
                config
            )

            console.log(response.data);


            dispatch(getMainUser(mainUser?._id))

            setEditOpen(false)

        } catch (error) {
            console.log(error);
        }

        setLoading(false)
    }

    const handleLogOut = () =>{

        localStorage.removeItem('chatUser')

        console.log('logout');

        navigate('/')
        window.location.reload()

    }
  return (
      <section className='editbg absolute inset-0 z-10 flex items-center justify-center'>
            <main className=' select-none w-96 h-fit bg-white  shadow-md rounded-md overflow-hidden'>
                <header className=' w-full bg-cyan-600 py-2 text-white flex items-center justify-around'>
                    <button className=' bg-white text-cyan-600 p-1 px-2 rounded font-semibold cursor-pointer' onClick={()=>setEditPageOption(true)}>Edit Profile</button>
                    <button className=' bg-white text-cyan-600 p-1 px-2 rounded font-semibold cursor-pointer' onClick={()=>setEditPageOption(false)}>Log Out</button>
                    <AiOutlineClose onClick={()=>{setEditOpen(false);setEditPageOption(true)}} className=' h-5 w-5 cursor-pointer'/>
                </header>
              {editPageOption ? 
                <form onSubmit={(e)=>EditProfile(e)} className='w-full py-5 flex flex-col gap-2 items-center'>
                    <div className='w-10/12'>
                        <label htmlFor="name" className='text-sm font-semibold block'>Name</label>
                        <input value={name} required onChange={(e)=>setName(e.target.value)} type="text" id='name' className='outline-none border-2 border-cyan-400 text-xs font-semibold w-full h-8 rounded-sm mt-1'/> 
                    </div>
                    <div className='w-10/12'>
                        <label htmlFor="title" className='text-sm font-semibold block'>Title</label>
                        <input value={title} required onChange={(e)=>seTtitle(e.target.value)} type="text" id='title' className='outline-none border-2 border-cyan-400 text-xs font-semibold w-full h-8 rounded-sm mt-1'/> 
                    </div>
                    <div className='w-10/12'>
                        <label htmlFor="bio" className='text-sm font-semibold block'>Bio</label>
                        <textarea value={bio} required onChange={(e)=>setBio(e.target.value)} type="text" id='bio' className='outline-none border-2 border-cyan-400 text-xs font-semibold w-full h-12 max-h-52 rounded-sm mt-1' placeholder='max 125 char'/> 
                    </div>
                    <div className='w-10/12 mt-2'>
                        {/* <label style={{backgroundColor:"#146C94",color:"#F6F1F1"}} htmlFor="pimg" className=' mx-auto w-1/2 py-2 flex justify-evenly cursor-pointer active:scale-95 rounded  text-sm font-semibold'><FaFileUpload className='h-5 w-5'/> Profile image</label> */}
                        <label htmlFor="pimg"  className='text-sm font-semibold block'> Profile image <span style={{fontSize:'10px',fontWeight:'500',marginInline:'10px'}}>( jpeg or png ) formats preferred</span></label>
                        <input onChange={(e)=>PIMGpost(e.target.files[0])} type="file" id='pimg' accept="image/*" className=' outline-none border-2 border-cyan-400 w-full h-8 rounded-sm mt-1'/> 
                    </div>
                    <div className='w-10/12'>
                        {/* <label style={{backgroundColor:"#146C94",color:"#F6F1F1"}} htmlFor="cimg" className=' mx-auto w-1/2 py-2 flex justify-evenly cursor-pointer active:scale-95 rounded  text-sm font-semibold'><FaFileUpload className='h-5 w-5'/> Cover image</label> */}
                        <label htmlFor="cimg"  className='text-sm font-semibold block'> Cover image <span style={{fontSize:'10px',fontWeight:'500',marginInline:'10px'}}>( jpeg or png ) formats preferred</span></label>
                        <input onChange={(e)=>CIMGpost(e.target.files[0])} type="file" id='cimg' accept="image/*" className=' outline-none border-2 border-cyan-400 w-full h-8 rounded-sm mt-1'/> 
                    </div>


                    {!loading ?
                        <button type="submit" style={{backgroundColor:"green",color:"#F6F1F1"}}
                        className='mx-auto w-10/12 h-10 cursor-pointer active:scale-95 rounded  text-sm font-semibold'>
                            update
                        </button>:

                        <div
                        className='mx-auto bg-green-500 text-white hiddenn w-10/12 h-10 flex justify-center items-center cursor-pointer rounded  text-sm font-semibold'>
                            <AiOutlineLoading3Quarters className=' animate-spin h-5 w-5'/>
                        </div>
                    }

                </form>:
                <div className='w-full h-96 flex flex-col items-center justify-center'>

                    <h1>Do you realy want to logout? 😥 </h1>
                    <button onClick={handleLogOut} style={{backgroundColor:'red'}} className='w-3/4 py-2 rounded-md my-12 text-white font-bold active:scale-90'>Log out</button>
                </div>
              }

            </main>
        </section>
  )
}

export default ProfileEdit