import React from 'react'

const UserLoading = () => {
return (
    <section className="w-full h-full rounded-lg overflow-hidden">
      <main
        style={{ height: '30%', backgroundColor: '#000000', color: '#F6F1F1' }}
        className="h-1/3 w-full bg-cyan-400 "
      >
        <section className="relative bg-red-4000 h-1/2 w-full">
          <div className="animate-pulses">
            <div className="w-1/4 absolute top-1/4 left-2 border-2 border-white aspect-square rounded-full flex items-center justify-center overflow-hidden bg-gray-200"></div>
          </div>
        </section>

        <article className="h-1/4 w-3/4 px-4 ml-auto flex flex-col">
          <div className="animate-pulses">
            <h1 className="text-xl font-bold bg-gray-300 rounded h-5"></h1>
            <h2 className="text-sm font-semibold text-gray-400 bg-gray-200 rounded h-4"></h2>
          </div>
        </article>
        <article className="h-1/4 w-full px-2 py-1 bg-gray-400 animate-pulses">
          <div className="animate-pulses">
            <h3 className="text-xs font-medium bg-gray-300 rounded h-3"></h3>
          </div>
        </article>
      </main>

      <section style={{ height: '8%', backgroundColor: '#000000' }} className="w-full h-16 bg-cyan-400 flex items-center justify-evenly">
        <div className="w-1/3 h-full p-1">
          <button style={{ color: '#F6F1F1' }} className="w-full h-full transition rounded-md bg-gray-200 shadow-md animate-pulses">
            <div className="animate-pulses">
              <h2 className="text-xs font-semibold bg-gray-300 rounded h-4"></h2>
            </div>
          </button>
        </div>

        <div className="w-1/3 h-full p-1">
          <button style={{ backgroundColor: '#F6F1F1', color: '#F6F1F1' }} className="w-full h-full transition rounded-md bg-cyan-300 shadow-md animate-pulses">
            <div className="animate-pulses">
              <h1 className="text-base font-bold bg-gray-300 rounded h-5"></h1>
              <h2 className="text-xs font-semibold bg-gray-200 rounded h-3"></h2>
            </div>
          </button>
        </div>

        <div className="w-1/3 h-full p-1">
          <button style={{ backgroundColor: '#F6F1F1' }} className="w-full h-full rounded-md bg-cyan-300 shadow-md animate-pulses">
            <div className="animate-pulses">
              <h1 className="text-base font-bold bg-gray-300 rounded h-5"></h1>
              <h2 className="text-xs font-semibold bg-gray-200 rounded h-3"></h2>
            </div>
          </button>
        </div>
      </section>

      <section style={{ height: '62%', backgroundColor: '#F6F1F1' }} className="w-full h-2/3 pb-5 bg-red-300 rounded-lg overflow-hidden">
        <div className="my-2 mx-1 px-1 h-10 bg-white border rounded-full flex justify-center items-center animate-pulses">
          <div className="animate-pulses w-11/12 h-4/5 bg-gray-300 rounded"></div>
        </div>

        <p style={{ height: '2px' }} className="my-2 w-full bg-black"></p>

        <section style={{ height: '90%' }} className="scrollbarhidden w-full overflow-y-scroll">
          <div className="w-full h-72 font-medium flex items-center justify-center bg-gray-300 rounded animate-pulses">-- no result --</div>
        </section>
      </section>
    </section>
  );
}

export default UserLoading