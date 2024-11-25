import React from "react";

function page() {
  return (
    <div className="py-10 sm:container mx-auto px-0 lg:px-[120px]">
      {/* head */}
      <div className="relative flex flex-col pl-36 p-8 w-full bg-gradient-to-r from-primary from-[34%] to-[#3C3D3C] to-100%  rounded-[0.7rem]">
      <img src="/project/desktop (1) 1.png" alt="company" className="absolute left-5 top-4 w-24" />
        <div className="flex gap-3 items-center">
          <p>By شركة امجال للتطوير العقاري</p>
          <p className="rounded-[0.6rem] text-sm bg-white p-1">COMPLETED</p>
        </div>
        <div className="flex w-full justify-between">
          <h3 className="text-2xl text-secondary font-semibold">
            Amajal AlYasmin project
          </h3>
          <p className="text-2xl font-medium text-white">From 1,362,500 SAR</p>
        </div>
      </div>

      <div className="flex mt-9">
        {/* images */}
        <div className="grid grid-cols-7 gap-y-7  gap-x-10 items-center grid-rows-7 w-[70%]">
          <div className="col-span-7 row-span-6">
            <img
              src="/project/Property House.png"
              alt="Property Large"
              className="w-[90%] h-full object-cover rounded-xl"
            />
          </div>

          <div className="col-span-1 row-span-1">
            <img
              src="/project/Property House.png"
              alt="Property Large"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src="/project/Property House.png"
              alt="Property Large"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src="/project/Property House.png"
              alt="Property Large"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src="/project/Property House.png"
              alt="Property Large"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src="/project/Property House.png"
              alt="Property Large"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src="/project/Property House.png"
              alt="Property Large"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* form */}
        <div className="flex flex-col gap-5 w-[30%] p-5 shadow-lg rounded-[0.6rem]">
          <div className="w-full flex items-center bg-gray-200 p-3 rounded-[0.6rem]">
            <img src="/project/desktop (1) 2.png" alt="company" />
            <p className="text-secondary font-medium ml-5">
              Amjal AlYasmin ProJect
            </p>
          </div>

          <input
            type="text"
            placeholder="Name"
            className="w-full border-gray-400 border-[1px] rounded-[0.6rem] text-gray-700 p-5"
          />

          <input
            type="text"
            placeholder="phone"
            className="w-full border-gray-400 border-[1px] rounded-[0.6rem] text-gray-700 p-5"
          />

          <input
            type="text"
            placeholder="Email"
            className="w-full border-gray-400 border-[1px] rounded-[0.6rem] text-gray-700 p-5"
          />

          <textarea
            placeholder="Hello, Iam ..."
            className="w-full border-gray-400 h-36 border-[1px] rounded-[0.6rem] text-gray-700 p-5"
          />

          <button className="rounded-[0.6rem] p-5 bg-secondary text-white font-semibold">
            REQUEST DETAILS
          </button>
          <button className="rounded-[0.6rem] p-5 bg-primary text-white font-semibold">
            CALL NOW
          </button>
        </div>
        </div>

{/* Apout */}

<div className="flex flex-col w-2/3 mt-24 mb-10">
<h2 className="text-secondary text-3xl font-semibold mb-8" >About Amjal AlYasmin Project</h2>
<div className="flex gap-28 text-lg">
<div className="flex flex-col gap-7">
    <div className="flex flex-col"><p className="text-gray-600">Price Form</p>
    <p className="font-medium" >1,362,500 SAR</p></div>
    <div className="flex flex-col"><p className="text-gray-600">Price Form</p>
    <p className="font-medium" >1,362,500 SAR</p></div>

</div>

<div className="flex flex-col gap-7">
    <div className="flex flex-col"><p className="text-gray-600">Price per sqft</p>
    <p className="font-medium" >Ask for price</p></div>
    <div className="flex flex-col"><p className="text-gray-600">Total units</p>
    <p className="font-medium" >12</p></div>

</div>


<div className="flex flex-col gap-7">
    <div className="flex flex-col"><p className="text-gray-600">Status</p>
    <p className="font-medium" >Completed</p></div>
    <div className="flex flex-col"><p className="text-gray-600">Bedrooms</p>
    <p className="font-medium" >4 bedrooms</p></div>

</div>

</div>
</div>

{/* loccation */}


{/* description */}
<div className="w-2/3 mt-10">
    <h3 className="text-xl font-medium mb-3 ">DESCRIPTION</h3>
    <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.
         Sint magni, minus expedita pariatur quas voluptatem excepturi odio iste, 
         asperiores, dolorum quo? Sint provident nobis est repudiandae. 
         Architecto nostrum consequuntur corrupti.
         Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Quaerat incidunt vel corrupti possimus, 
          quam consectetur odit quae accusamus in, 
          esse totam! Dolorum cumque pariatur itaque, at aut blanditiis ipsum animi?

    </p>
    
</div>

 
    </div>
  );
}

export default page;
