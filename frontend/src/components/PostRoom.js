import React, { useEffect, useRef, useState } from 'react'
import {BsPlus,BsCheck} from 'react-icons/bs'
import {BiDislike,BiLike,BiSolidLike,BiSolidDislike} from 'react-icons/bi'
import {RiBookmarkFill,RiBookmarkLine} from 'react-icons/ri'

const PostRoom = () => {

  let postRoomWidth = null
  const roomRef = useRef(null)
  
  useEffect(()=>{

    
     function update(){
      if(roomRef.current){
        const width = roomRef.current.offsetWidth 
        postRoomWidth = width
        // console.log(width);
      }
    }
    
    update()

    window.addEventListener('resize',update)
    return() =>{window.removeEventListener('resize',update)}
  },[roomRef.current?.offsetWidth])

  return (
    <main 
    ref={roomRef}
    style={{columnGap:'10px',backgroundColor:'#F6F1F1',columns:`${postRoomWidth > 950 ? 4 : postRoomWidth >700 ? 3 :postRoomWidth > 500 ? 2: 3}`}}
    className={` h-fit overflow-y-scroll columns- scrollbarhidden w-full rounded-lg bg-teal-300 p-2  gap-2`}>
      
        <div style={{minHeight:'280px',minWidth:"220px",maxWidth:'300px',backgroundColor:"#F6F1F1"}} className="bg-green-500 mx-auto border-2 border-green-500 w-full flex flex-col rounded-md overflow-hidden  mb-2 break-inside-avoid">
          <header className=' bg-green-500 h-10  flex items-center  p-1'>

            <aside className=' flex items-center w-2/3 cursor-pointer'>
              <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=sph" alt="" 
              style={{minHeight:'32px',minWidth:'32px'}} className=' h-8 w-8 mx-2 rounded-full bg-blue-800' />

              <article className=' text-sm font-semibold overflow-hidden text-ellipsis pr-'>
                <h1 className=' overflow-hidden text-ellipsis whitespace-nowrap'>Aakesh Ash</h1>
                <h2 className=' text-xs'>5:23</h2>
              </article>
            </aside>


            <button className=' bg-gray-300 border-2 border-bla ck w-1/3 text-xs flex items-center font-semibold px-2 p-1 rounded mx-2 ml-auto'>
              Friend <BsPlus className=' h-4 w-4'/>
            </button>

          </header>

          <section style={{ height:"fit-content"}} className='p-1 text-xs font-medium overflow-hidden scrollbarhidden'>
            <h1 style={{backgroundColor:'#F6F1F1'}} className=' text-lg font-semibold sticky top-0'>Title</h1>
            <p style={{}} className=' overflow-hidden text-ellipsis'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea similique commodi alias laborum nemo suscipit totam neque nam! Modi consequatur quidem cumque culpa ipsa similique autem amet quo deserunt magni? Facere molestias nam sapiente numquam maiores accusantium quas iste doloremque quae sequi odio voluptate natus tempora temporibus a, fugit quo reiciendis commodi. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia ut, facilis vero voluptatibus maxime rerum velit! Pariatur quaerat vitae minus velit ut architecto iusto, numquam tenetur, ullam eligendi ex expedita.</p>
          </section>

          <footer className=' bg-black text-gray-200 flex items-center w-full h-10 mt-auto'>

            <span className='  px-2 rounded-3xl flex gap-1 items-center ml-3 cursor-pointer bg-ye llow-400'>
              <BiLike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>1</h1>
            </span>

            <span className='  px-2 rounded-3xl flex gap-1  items-center ml-3 cursor-pointer'>
              <BiDislike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>5</h1>
            </span>
            
            <RiBookmarkLine className=' ml-auto mx-2 h-5 w-5 cursor-pointer'/>

          </footer>
        </div>

        <div style={{minHeight:'280px',minWidth:"220px",maxWidth:'300px',backgroundColor:"#F6F1F1"}} className="bg-blue-600 mx-auto border-2 border-green-500 w-full flex flex-col rounded-md overflow-hidden h-64 mb-2 break-inside-avoid">
          <header className=' bg-green-500 h-10  flex items-center  p-1'>

            <aside className=' flex items-center w-2/3 cursor-pointer'>
              <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=sph" alt="" 
              style={{minHeight:'32px',minWidth:'32px'}} className=' h-8 w-8 mx-2 rounded-full bg-blue-800' />

              <article className=' text-sm font-semibold overflow-hidden text-ellipsis pr-'>
                <h1 className=' overflow-hidden text-ellipsis whitespace-nowrap'>Aakesh Ash</h1>
                <h2 className=' text-xs'>5:23</h2>
              </article>
            </aside>


            <button className=' bg-gray-300 border-2 border-bla ck w-1/3 text-xs flex items-center font-semibold px-2 p-1 rounded mx-2 ml-auto'>
              Friend <BsPlus className=' h-4 w-4'/>
            </button>

          </header>

          <footer className=' bg-black text-gray-200 flex items-center w-full h-10 mt-auto'>

            <span className='  px-2 rounded-3xl flex gap-1 items-center ml-3 cursor-pointer bg-ye llow-400'>
              <BiLike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>1</h1>
            </span>

            <span className='  px-2 rounded-3xl flex gap-1  items-center ml-3 cursor-pointer'>
              <BiDislike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>5</h1>
            </span>
            
            <RiBookmarkLine className=' ml-auto mx-2 h-5 w-5 cursor-pointer'/>

          </footer>
        </div>
        <div style={{minHeight:'280px',minWidth:"220px",maxWidth:'300px',backgroundColor:"#F6F1F1"}} className="bg-blue-600 mx-auto border-2 border-green-500 w-full flex flex-col rounded-md overflow-hidden h-80 mb-2 break-inside-avoid">
          <header className=' bg-green-500 h-10  flex items-center  p-1'>

            <aside className=' flex items-center w-2/3 cursor-pointer'>
              <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=sph" alt="" 
              style={{minHeight:'32px',minWidth:'32px'}} className=' h-8 w-8 mx-2 rounded-full bg-blue-800' />

              <article className=' text-sm font-semibold overflow-hidden text-ellipsis pr-'>
                <h1 className=' overflow-hidden text-ellipsis whitespace-nowrap'>Aakesh Ash</h1>
                <h2 className=' text-xs'>5:23</h2>
              </article>
            </aside>


            <button className=' bg-gray-300 border-2 border-bla ck w-1/3 text-xs flex items-center font-semibold px-2 p-1 rounded mx-2 ml-auto'>
              Friend <BsPlus className=' h-4 w-4'/>
            </button>

          </header>

          <footer className=' bg-black text-gray-200 flex items-center w-full h-10 mt-auto'>

            <span className='  px-2 rounded-3xl flex gap-1 items-center ml-3 cursor-pointer bg-ye llow-400'>
              <BiLike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>1</h1>
            </span>

            <span className='  px-2 rounded-3xl flex gap-1  items-center ml-3 cursor-pointer'>
              <BiDislike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>5</h1>
            </span>
            
            <RiBookmarkLine className=' ml-auto mx-2 h-5 w-5 cursor-pointer'/>

          </footer>
        </div>
        <div style={{minHeight:'280px',minWidth:"220px",maxWidth:'300px',backgroundColor:"#F6F1F1"}} className="bg-blue-600 mx-auto border-2 border-green-500 w-full flex flex-col rounded-md overflow-hidden h-72 mb-2 break-inside-avoid">
          <header className=' bg-green-500 h-10  flex items-center  p-1'>

            <aside className=' flex items-center w-2/3 cursor-pointer'>
              <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=sph" alt="" 
              style={{minHeight:'32px',minWidth:'32px'}} className=' h-8 w-8 mx-2 rounded-full bg-blue-800' />

              <article className=' text-sm font-semibold overflow-hidden text-ellipsis pr-'>
                <h1 className=' overflow-hidden text-ellipsis whitespace-nowrap'>Aakesh Ash</h1>
                <h2 className=' text-xs'>5:23</h2>
              </article>
            </aside>


            <button className=' bg-gray-300 border-2 border-bla ck w-1/3 text-xs flex items-center font-semibold px-2 p-1 rounded mx-2 ml-auto'>
              Friend <BsPlus className=' h-4 w-4'/>
            </button>

          </header>

          <footer className=' bg-black text-gray-200 flex items-center w-full h-10 mt-auto'>

            <span className='  px-2 rounded-3xl flex gap-1 items-center ml-3 cursor-pointer bg-ye llow-400'>
              <BiLike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>1</h1>
            </span>

            <span className='  px-2 rounded-3xl flex gap-1  items-center ml-3 cursor-pointer'>
              <BiDislike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>5</h1>
            </span>
            
            <RiBookmarkLine className=' ml-auto mx-2 h-5 w-5 cursor-pointer'/>

          </footer>
        </div>
        <div style={{minHeight:'280px',minWidth:"220px",maxWidth:'300px',backgroundColor:"#F6F1F1"}} className="bg-blue-600 mx-auto border-2 border-green-500 w-full flex flex-col rounded-md overflow-hidden h-72 mb-2 break-inside-avoid">
          <header className=' bg-green-500 h-10  flex items-center  p-1'>

            <aside className=' flex items-center w-2/3 cursor-pointer'>
              <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=sph" alt="" 
              style={{minHeight:'32px',minWidth:'32px'}} className=' h-8 w-8 mx-2 rounded-full bg-blue-800' />

              <article className=' text-sm font-semibold overflow-hidden text-ellipsis pr-'>
                <h1 className=' overflow-hidden text-ellipsis whitespace-nowrap'>Aakesh Ash</h1>
                <h2 className=' text-xs'>5:23</h2>
              </article>
            </aside>


            <button className=' bg-gray-300 border-2 border-bla ck w-1/3 text-xs flex items-center font-semibold px-2 p-1 rounded mx-2 ml-auto'>
              Friend <BsPlus className=' h-4 w-4'/>
            </button>

          </header>

          <footer className=' bg-black text-gray-200 flex items-center w-full h-10 mt-auto'>

            <span className='  px-2 rounded-3xl flex gap-1 items-center ml-3 cursor-pointer bg-ye llow-400'>
              <BiLike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>1</h1>
            </span>

            <span className='  px-2 rounded-3xl flex gap-1  items-center ml-3 cursor-pointer'>
              <BiDislike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>5</h1>
            </span>
            
            <RiBookmarkLine className=' ml-auto mx-2 h-5 w-5 cursor-pointer'/>

          </footer>
        </div>
        <div style={{minHeight:'280px',minWidth:"220px",maxWidth:'300px',backgroundColor:"#F6F1F1"}} className="bg-blue-600 mx-auto border-2 border-green-500 w-full flex flex-col rounded-md overflow-hidden h-48 mb-2 break-inside-avoid">
          <header className=' bg-green-500 h-10  flex items-center  p-1'>

            <aside className=' flex items-center w-2/3 cursor-pointer'>
              <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=sph" alt="" 
              style={{minHeight:'32px',minWidth:'32px'}} className=' h-8 w-8 mx-2 rounded-full bg-blue-800' />

              <article className=' text-sm font-semibold overflow-hidden text-ellipsis pr-'>
                <h1 className=' overflow-hidden text-ellipsis whitespace-nowrap'>Aakesh Ash</h1>
                <h2 className=' text-xs'>5:23</h2>
              </article>
            </aside>


            <button className=' bg-gray-300 border-2 border-bla ck w-1/3 text-xs flex items-center font-semibold px-2 p-1 rounded mx-2 ml-auto'>
              Friend <BsPlus className=' h-4 w-4'/>
            </button>

          </header>

          <footer className=' bg-black text-gray-200 flex items-center w-full h-10 mt-auto'>

            <span className='  px-2 rounded-3xl flex gap-1 items-center ml-3 cursor-pointer bg-ye llow-400'>
              <BiLike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>1</h1>
            </span>

            <span className='  px-2 rounded-3xl flex gap-1  items-center ml-3 cursor-pointer'>
              <BiDislike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>5</h1>
            </span>
            
            <RiBookmarkLine className=' ml-auto mx-2 h-5 w-5 cursor-pointer'/>

          </footer>
        </div>
        <div style={{minHeight:'280px',minWidth:"220px",maxWidth:'300px',backgroundColor:"#F6F1F1"}} className="bg-blue-600 mx-auto border-2 border-green-500 w-full flex flex-col rounded-md overflow-hidden h-80 mb-2 break-inside-avoid">
          <header className=' bg-green-500 h-10  flex items-center  p-1'>

            <aside className=' flex items-center w-2/3 cursor-pointer'>
              <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=sph" alt="" 
              style={{minHeight:'32px',minWidth:'32px'}} className=' h-8 w-8 mx-2 rounded-full bg-blue-800' />

              <article className=' text-sm font-semibold overflow-hidden text-ellipsis pr-'>
                <h1 className=' overflow-hidden text-ellipsis whitespace-nowrap'>Aakesh Ash</h1>
                <h2 className=' text-xs'>5:23</h2>
              </article>
            </aside>


            <button className=' bg-gray-300 border-2 border-bla ck w-1/3 text-xs flex items-center font-semibold px-2 p-1 rounded mx-2 ml-auto'>
              Friend <BsPlus className=' h-4 w-4'/>
            </button>

          </header>

          <footer className=' bg-black text-gray-200 flex items-center w-full h-10 mt-auto'>

            <span className='  px-2 rounded-3xl flex gap-1 items-center ml-3 cursor-pointer bg-ye llow-400'>
              <BiLike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>1</h1>
            </span>

            <span className='  px-2 rounded-3xl flex gap-1  items-center ml-3 cursor-pointer'>
              <BiDislike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>5</h1>
            </span>
            
            <RiBookmarkLine className=' ml-auto mx-2 h-5 w-5 cursor-pointer'/>

          </footer>
        </div>
        <div style={{minHeight:'280px',minWidth:"220px",maxWidth:'300px',backgroundColor:"#F6F1F1"}} className="bg-blue-600 mx-auto border-2 border-green-500 w-full flex flex-col rounded-md overflow-hidden h-72 mb-2 break-inside-avoid">
          <header className=' bg-green-500 h-10  flex items-center  p-1'>

            <aside className=' flex items-center w-2/3 cursor-pointer'>
              <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=sph" alt="" 
              style={{minHeight:'32px',minWidth:'32px'}} className=' h-8 w-8 mx-2 rounded-full bg-blue-800' />

              <article className=' text-sm font-semibold overflow-hidden text-ellipsis pr-'>
                <h1 className=' overflow-hidden text-ellipsis whitespace-nowrap'>Aakesh Ash</h1>
                <h2 className=' text-xs'>5:23</h2>
              </article>
            </aside>


            <button className=' bg-gray-300 border-2 border-bla ck w-1/3 text-xs flex items-center font-semibold px-2 p-1 rounded mx-2 ml-auto'>
              Friend <BsPlus className=' h-4 w-4'/>
            </button>

          </header>

          <footer className=' bg-black text-gray-200 flex items-center w-full h-10 mt-auto'>

            <span className='  px-2 rounded-3xl flex gap-1 items-center ml-3 cursor-pointer bg-ye llow-400'>
              <BiLike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>1</h1>
            </span>

            <span className='  px-2 rounded-3xl flex gap-1  items-center ml-3 cursor-pointer'>
              <BiDislike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>5</h1>
            </span>
            
            <RiBookmarkLine className=' ml-auto mx-2 h-5 w-5 cursor-pointer'/>

          </footer>
        </div>
        <div style={{minHeight:'280px',minWidth:"220px",maxWidth:'300px',backgroundColor:"#F6F1F1"}} className="bg-blue-600 mx-auto border-2 border-green-500 w-full flex flex-col rounded-md overflow-hidden h-72 mb-2 break-inside-avoid">
          <header className=' bg-green-500 h-10  flex items-center  p-1'>

            <aside className=' flex items-center w-2/3 cursor-pointer'>
              <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=sph" alt="" 
              style={{minHeight:'32px',minWidth:'32px'}} className=' h-8 w-8 mx-2 rounded-full bg-blue-800' />

              <article className=' text-sm font-semibold overflow-hidden text-ellipsis pr-'>
                <h1 className=' overflow-hidden text-ellipsis whitespace-nowrap'>Aakesh Ash</h1>
                <h2 className=' text-xs'>5:23</h2>
              </article>
            </aside>


            <button className=' bg-gray-300 border-2 border-bla ck w-1/3 text-xs flex items-center font-semibold px-2 p-1 rounded mx-2 ml-auto'>
              Friend <BsPlus className=' h-4 w-4'/>
            </button>

          </header>

          <footer className=' bg-black text-gray-200 flex items-center w-full h-10 mt-auto'>

            <span className='  px-2 rounded-3xl flex gap-1 items-center ml-3 cursor-pointer bg-ye llow-400'>
              <BiLike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>1</h1>
            </span>

            <span className='  px-2 rounded-3xl flex gap-1  items-center ml-3 cursor-pointer'>
              <BiDislike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>5</h1>
            </span>
            
            <RiBookmarkLine className=' ml-auto mx-2 h-5 w-5 cursor-pointer'/>

          </footer>
        </div>
        <div style={{minHeight:'280px',minWidth:"220px",maxWidth:'300px',backgroundColor:"#F6F1F1"}} className="bg-blue-600 mx-auto border-2 border-green-500 w-full flex flex-col rounded-md overflow-hidden h-48 mb-2 break-inside-avoid">
          <header className=' bg-green-500 h-10  flex items-center  p-1'>

            <aside className=' flex items-center w-2/3 cursor-pointer'>
              <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=sph" alt="" 
              style={{minHeight:'32px',minWidth:'32px'}} className=' h-8 w-8 mx-2 rounded-full bg-blue-800' />

              <article className=' text-sm font-semibold overflow-hidden text-ellipsis pr-'>
                <h1 className=' overflow-hidden text-ellipsis whitespace-nowrap'>Aakesh Ash</h1>
                <h2 className=' text-xs'>5:23</h2>
              </article>
            </aside>


            <button className=' bg-gray-300 border-2 border-bla ck w-1/3 text-xs flex items-center font-semibold px-2 p-1 rounded mx-2 ml-auto'>
              Friend <BsPlus className=' h-4 w-4'/>
            </button>

          </header>

          <footer className=' bg-black text-gray-200 flex items-center w-full h-10 mt-auto'>

            <span className='  px-2 rounded-3xl flex gap-1 items-center ml-3 cursor-pointer bg-ye llow-400'>
              <BiLike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>1</h1>
            </span>

            <span className='  px-2 rounded-3xl flex gap-1  items-center ml-3 cursor-pointer'>
              <BiDislike className=' h-5 w-5'/>
              <h1 className=' text-xs font-medium'>5</h1>
            </span>
            
            <RiBookmarkLine className=' ml-auto mx-2 h-5 w-5 cursor-pointer'/>

          </footer>
        </div>


    </main>
  )
}

export default PostRoom