import React from 'react'

function Footer() {
  return (
    <footer>
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
                  className="w-full pl-10 pr-4 py-3 border rounded-[6px] border-gray-300  focus:outline-none focus:ring-2 focus:ring-black-100"
                />
                     <button className="absolute right-0 bg-primary text-white px-10 py-3 rounded-[6px] font-medium text-base ">
                Submit
              </button>
              </div>



            </div>

        </div>
    </footer>
  )
}

export default Footer