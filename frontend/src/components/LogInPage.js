import React, { useState } from 'react'
import {AiOutlineGoogle,AiFillApple,AiFillFacebook,AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import {RiChatSmile3Line} from 'react-icons/ri'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'


import {loginFun,signinFun} from '../redux/features/authSlice'
import { useDispatch,useSelector } from 'react-redux'

const LogInPage = () => {

    const [signinOption,setSigninOption] = useState(true)

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [showPassWord,setShowPassWord] = useState(false)

    const [loginEmail,setLogInEmail] = useState("")
    const [loginPassword,setLoginpassword] = useState("")

    const [loginShowPassWord,setLoginShowPassWord] = useState(false)

    const [existError,setExistError] = useState(null)
    const [logError,setLogError] = useState(null)
    const [loading,setLoading] = useState(false)


    const signinSchema = yup.object().shape({
        name:yup.string().trim().required('username is required').min(2,'min 2 letters'),
        email:yup.string().trim().required('Email is required').email('Enter valid email'),
        password:yup.string().required('Password is required').min(4,'password min length 4 char').max(6,'password max length 6 char')
    })

    const loginSchema = yup.object().shape({
        loginEmail:yup.string().required('Email is required').email('Enter valid email'),
        loginPassword:yup.string().required('Password is required').min(4,'min length 4 char').max(6,'max length 6 char')
    })
    
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver:yupResolver(signinOption ? signinSchema : loginSchema),
        mode:"all"
    })

    const dispatch = useDispatch()
    const userData = useSelector(state=>state.userData)

    async function handleSignIn(e) {
        
        setLoading(true)
        try {
            dispatch(signinFun(
                {
                "name":name,
                "email":email,
                "password":password  
                }
            ))
            
            setLoading(false)
        } catch (error) {
            console.log('l');
            console.log(error);
            console.log(error.response);
            setLoading(false)
        }

    }
    async function handleLogIn(e) {
        
        try {
            dispatch(loginFun(
                {
                    "email":loginEmail,
                    "password":loginPassword
                }
            ))
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <main style={{backgroundColor:'#F6F1F1',minHeight:'101vh'}} className='relative loginPage w-full h-full pb-10 '>
        <header className=' w-full h-24  flex px-10'>
            <h1 style={{color:"#146C94"}} className=' flex gap-2 items-center text-3xl font-extrabold my-auto'>Chatly <RiChatSmile3Line/></h1>
        </header>
        {/* <img className=' absolute h-4/5 aspect-square z- right-0' src="https://img.freepik.com/free-vector/selfisolation-party-abstract-concept-vector-illustration-celebration-online-video-call-happy-friend-quarantine-fun-coronavirus-outbreak-zoom-videoconference-virtual-chat-abstract-metaphor_335657-6264.jpg?w=740&t=st=1695279375~exp=1695279975~hmac=d78a652b8a0a2acb713b68a7b50811af52d00fcca547aa4a6a645346328bdbe4" alt="" /> */}
        <section style={{backgroundColor:'white'}} className=' w-11/12 sm:w-96 shadow-md  mx-auto rounded-2xl p-3'>
            <div style={{gridTemplateColumns:'1fr 1fr'}} className='grid'>
                <button onClick={()=>{setSigninOption(!signinOption)}} style={{borderColor: signinOption && '#19A7CE'}} className=' py-3 text-lg font-semibold border-b-4 transition-colors'>
                    Sign up
                </button>

                <button onClick={()=>{setSigninOption(!signinOption)}} style={{borderColor:!signinOption && '#19A7CE'}} className=' py-3 text-lg font-semibold border-b-4 transition-colors'>
                    Log In
                </button>
            </div>
                
            {signinOption &&
                <form className='' onSubmit={handleSubmit(handleSignIn)}>
                    <h1 className=' text-center mt-5 text-2xl font-bold'>User Sign Up</h1>
                    <h1 className=' text-center mt-3 w-4/5 mx-auto text-sm font-semibold'>Hey, Enter your details to create account in 
                        <span style={{color:'#146C94'}} className=' mt-2 font-bold mx-auto flex gap-2 items-center justify-center'>Chatly <RiChatSmile3Line className=' h-4 w-4'/></span>
                    </h1>
                    
                    { (errors.name || errors.email || errors.password || existError || userData?.error) &&  <h2 className=' mt-2 bg-red-500 py-1 font-semibold text-base text-white px-5'>{errors.name?.message || errors.email?.message || errors.password?.message || existError || userData?.error}</h2>}
                    <div className=' w-11/12 mt-5 flex border-2 border-gray-300 rounded-md bg-transparent p-1 mx-auto h-10'>
                        <input 
                        {...register('name')}
                        value={name} onChange={(e)=>setName(e.target.value)} 
                        type="text" className=' w-full outline-none text-black placeholder:text-gray-500 text-sm font-semibold' placeholder='Enter your Name'/> 
                    </div>
    
                    <div className=' w-11/12 mt-5 flex border-2 border-gray-300 rounded-md bg-transparent p-1 mx-auto h-10'>
                        <input 
                        {...register('email')}
                        value={email} onChange={(e)=>setEmail(e.target.value.trim())} 
                        type="text" className=' w-full outline-none text-black placeholder:text-gray-500 text-sm font-semibold' placeholder='Enter Your Email'/> 
                    </div>
    
                    <div className=' w-11/12 flex mt-5 border-2 border-gray-300 rounded-md bg-transparent p-1 mx-auto h-10'>
                        <input 
                        {...register('password')}
                        value={password} onChange={(e)=>setPassword(e.target.value.trim())} 
                        type={ showPassWord ? "text" : "password"} className=' w-10/12 outline-none text-black placeholder:text-gray-500 text-sm font-semibold' placeholder='Passcode'/> 
                        <span onClick={()=>setShowPassWord(!showPassWord)} className='my-auto cursor-pointer'>
                            {showPassWord ? <AiOutlineEye className='h-6 w-6'/> : <AiOutlineEyeInvisible className='h-6 w-6'/>}
                        </span>
                    </div>
    
                    <h1 className=' mt-3 text-xs font-semibold px-4'>Having trible in sign up?</h1>
    
                    <button type="submit" style={{backgroundColor:'#19A7CE'}} className=' w-11/12 mx-auto block mt-5  py-3 rounded-md text-sm font-bold  transition-transform active:scale-95'>Sign Up</button>
    
                    <p className=' mt-6 text-xs font-semibold text-center '>—— Or Sign up with ——</p>
    
                    <div className='w-11/12 mt-5 mx-auto flex gap-1 justify-around'>
                        <button className=' flex items-center justify-center gap-2 font-bold py-2 border-2 border-gray-400  w-1/3 rounded-md'><AiOutlineGoogle className=' w-5 h-5'/> Google</button>
                        <button className=' flex items-center justify-center gap-2 font-bold py-2 border-2 border-gray-400  w-1/3 rounded-md'><AiFillApple className=' w-5 h-5'/> Apple</button>
                        <button className=' flex items-center justify-center gap-2 font-bold py-2 border-2 border-gray-400  w-1/3 rounded-md'><AiFillFacebook className=' w-5 h-5'/> faceBook</button>
                    </div>
    
                    <h3 className=' text-xs mt-5 mb-8 text-center font-medium'>Already have an coount? <span onClick={()=>setSigninOption(!signinOption)} className=' font-bold cursor-pointer'>Log In </span></h3>
                </form>
            }{!signinOption &&
                <form className='' onSubmit={handleSubmit(handleLogIn)}>
                    <h1 className=' text-center mt-5 text-2xl font-bold'>User Login</h1>
                    <h1 className=' text-center mt-3 w-4/5 mx-auto text-sm font-semibold'>Hey, Enter your details to get sign in to your account </h1>

                    { (errors.loginEmail || errors.loginPassword || logError || userData.error) &&  <h2 className=' mt-2 bg-red-500 py-1 font-semibold text-base text-white px-5'>{errors.loginEmail?.message || errors.loginPassword?.message || logError || userData.error}</h2>}

                    <div className=' w-11/12 mt-5 flex border-2 border-gray-300 rounded-md bg-transparent p-1 mx-auto h-10'>
                        <input 
                        {...register('loginEmail')}
                        value={loginEmail} onChange={(e)=>setLogInEmail(e.target.value.trim())} 
                        type="text" className=' w-10/12 outline-none text-black placeholder:text-gray-500 text-sm font-semibold' placeholder='Enter Your Email'/>
                    </div>

                    <div className=' w-11/12 flex mt-5 border-2 border-gray-300 rounded-md bg-transparent p-1 mx-auto h-10'>
                        <input 
                        {...register('loginPassword')}
                        value={loginPassword} onChange={(e)=>setLoginpassword(e.target.value.trim())} 
                        type={ loginShowPassWord ? "text" : "password"}className=' w-10/12 outline-none text-black placeholder:text-gray-500 text-sm font-semibold' placeholder='Passcode'/> 
                        <span onClick={()=>setLoginShowPassWord(!loginShowPassWord)} className=' my-auto cursor-pointer'>
                            {loginShowPassWord ? <AiOutlineEye className='h-6 w-6'/> : <AiOutlineEyeInvisible className='h-6 w-6'/>}
                        </span>
                    </div>

                    <h1 className=' mt-3 text-xs font-semibold px-4'>Having trible in Sign in?</h1>

                    <button type="submit" style={{backgroundColor:'#19A7CE'}} className=' w-11/12 mx-auto block mt-5  py-3 rounded-md text-sm font-bold foc us:scale-95  transition-transform active:scale-95'>Sign In</button>

                    <p className=' mt-6 text-xs font-semibold text-center '>—— Or Sign in with ——</p>

                    <div className='w-11/12  mt-5 mx-auto flex gap-1 justify-around'>
                        <button className=' flex items-center justify-center gap-2 font-bold py-2 border-2 border-gray-400  w-1/3 rounded-md'><AiOutlineGoogle className='  w-5 h-5'/> Google</button>
                        <button className=' flex items-center justify-center gap-2 font-bold py-2 border-2 border-gray-400  w-1/3 rounded-md'><AiFillApple className=' w-5 h-5'/> Apple</button>
                        <button className=' flex items-center justify-center gap-2 font-bold py-2 border-2 border-gray-400  w-1/3 rounded-md'><AiFillFacebook className=' w-5 h-5'/> faceBook</button>
                    </div>

                    <h3 className=' text-xs mt-5 mb-8 text-center font-medium'>Don't have an coount? <span onClick={()=>setSigninOption(!signinOption)} className=' cursor-pointer font-bold'>Create Now</span></h3>
                </form>
            }


        </section>
    </main>
  )
}

export default LogInPage