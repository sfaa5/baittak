import React from 'react'

function Footer() {
  return (
    <footer className='pb-28'>
        <div className="container mx-auto flex flex-col">


            <div className="flex justify-between">
            <img
            src="/BaittakLOGO1 2.png"
            alt="logo"
            className="w-2/3  sm:w-full h-auto max-w-44 object-contain"
          />



    <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className="w-full px-5 py-5  border rounded-[6px] border-gray-300  focus:outline-none focus:ring-2 focus:ring-black-100"
                />
                     <button className="absolute right-2 bg-primary text-white px-10 py-2 top-1/2 transform -translate-y-1/2  rounded-[6px] font-medium text-sm ">
                Submit
              </button>
              </div>



            </div>

        </div>
    </footer>
  )
}

export default Footer