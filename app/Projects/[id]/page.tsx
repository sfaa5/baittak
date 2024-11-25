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

      <div className="flex gap-10 mt-9">
        {/* images */}
        <div className="grid grid-cols-6 gap-y-7  gap-x-10 items-center grid-rows-7 w-[62%]">
          <div className="col-span-6 row-span-6">
            <img
              src="/project/Property House.png"
              alt="Property Large"
              className="w-full h-[10%] object-cover rounded-xl"
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
        <div className="flex flex-col gap-5 w-[35%] p-5 shadow-lg rounded-[0.6rem]">
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

{/* Amenities */}
<div className="w-2/3 mt-10 ">
<h3 className="text-xl font-medium mb-5 ">AMENITIES</h3>

<div className="flex gap-10" >

  <div className="flex gap-2 items-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_659)">
<path d="M6.49992 11.9167C9.49146 11.9167 11.9166 9.49154 11.9166 6.49999C11.9166 3.50845 9.49146 1.08333 6.49992 1.08333C3.50838 1.08333 1.08325 3.50845 1.08325 6.49999C1.08325 9.49154 3.50838 11.9167 6.49992 11.9167Z" fill="#79B84E" stroke="black"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" fill="#79B84E"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_659">
<rect width="13" height="13" fill="white"/>
</clipPath>
</defs>
</svg>
 <span className="text-lg">Balcony</span></div>

 <div className="flex gap-2 items-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_659)">
<path d="M6.49992 11.9167C9.49146 11.9167 11.9166 9.49154 11.9166 6.49999C11.9166 3.50845 9.49146 1.08333 6.49992 1.08333C3.50838 1.08333 1.08325 3.50845 1.08325 6.49999C1.08325 9.49154 3.50838 11.9167 6.49992 11.9167Z" fill="#79B84E" stroke="black"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" fill="#79B84E"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_659">
<rect width="13" height="13" fill="white"/>
</clipPath>
</defs>
</svg>
 <span className="text-lg">Balcony</span></div>


 <div className="flex gap-2 items-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_659)">
<path d="M6.49992 11.9167C9.49146 11.9167 11.9166 9.49154 11.9166 6.49999C11.9166 3.50845 9.49146 1.08333 6.49992 1.08333C3.50838 1.08333 1.08325 3.50845 1.08325 6.49999C1.08325 9.49154 3.50838 11.9167 6.49992 11.9167Z" fill="#79B84E" stroke="black"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" fill="#79B84E"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_659">
<rect width="13" height="13" fill="white"/>
</clipPath>
</defs>
</svg>
 <span className="text-lg">Balcony</span></div>



 <div className="flex gap-2 items-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_659)">
<path d="M6.49992 11.9167C9.49146 11.9167 11.9166 9.49154 11.9166 6.49999C11.9166 3.50845 9.49146 1.08333 6.49992 1.08333C3.50838 1.08333 1.08325 3.50845 1.08325 6.49999C1.08325 9.49154 3.50838 11.9167 6.49992 11.9167Z" fill="#79B84E" stroke="black"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" fill="#79B84E"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_659">
<rect width="13" height="13" fill="white"/>
</clipPath>
</defs>
</svg>
 <span className="text-lg">Balcony</span></div>

</div>



<div className="flex gap-10 mt-5" >

  <div className="flex gap-2 items-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_659)">
<path d="M6.49992 11.9167C9.49146 11.9167 11.9166 9.49154 11.9166 6.49999C11.9166 3.50845 9.49146 1.08333 6.49992 1.08333C3.50838 1.08333 1.08325 3.50845 1.08325 6.49999C1.08325 9.49154 3.50838 11.9167 6.49992 11.9167Z" fill="#79B84E" stroke="black"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" fill="#79B84E"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_659">
<rect width="13" height="13" fill="white"/>
</clipPath>
</defs>
</svg>
 <span className="text-lg">Balcony</span></div>

 <div className="flex gap-2 items-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_659)">
<path d="M6.49992 11.9167C9.49146 11.9167 11.9166 9.49154 11.9166 6.49999C11.9166 3.50845 9.49146 1.08333 6.49992 1.08333C3.50838 1.08333 1.08325 3.50845 1.08325 6.49999C1.08325 9.49154 3.50838 11.9167 6.49992 11.9167Z" fill="#79B84E" stroke="black"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" fill="#79B84E"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_659">
<rect width="13" height="13" fill="white"/>
</clipPath>
</defs>
</svg>
 <span className="text-lg">Balcony</span></div>


 <div className="flex gap-2 items-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_659)">
<path d="M6.49992 11.9167C9.49146 11.9167 11.9166 9.49154 11.9166 6.49999C11.9166 3.50845 9.49146 1.08333 6.49992 1.08333C3.50838 1.08333 1.08325 3.50845 1.08325 6.49999C1.08325 9.49154 3.50838 11.9167 6.49992 11.9167Z" fill="#79B84E" stroke="black"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" fill="#79B84E"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_659">
<rect width="13" height="13" fill="white"/>
</clipPath>
</defs>
</svg>
 <span className="text-lg">Balcony</span></div>



 <div className="flex gap-2 items-center"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_40_659)">
<path d="M6.49992 11.9167C9.49146 11.9167 11.9166 9.49154 11.9166 6.49999C11.9166 3.50845 9.49146 1.08333 6.49992 1.08333C3.50838 1.08333 1.08325 3.50845 1.08325 6.49999C1.08325 9.49154 3.50838 11.9167 6.49992 11.9167Z" fill="#79B84E" stroke="black"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" fill="#79B84E"/>
<path d="M4.604 6.77083L5.68734 7.85416L8.39567 5.14583" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_40_659">
<rect width="13" height="13" fill="white"/>
</clipPath>
</defs>
</svg>
 <span className="text-lg">Balcony</span></div>

</div>


</div>

 
    </div>
  );
}

export default page;
