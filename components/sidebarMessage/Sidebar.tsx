import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'

function Sidebar() {
  console.log("Parent re-rendered!");
  return (
    <div className='border-r border-slate-300 p-2 flex flex-col w-[50%] shadow-md rounded-l-[8px]'>
        <SearchInput/>
        <div className='divider px-3'></div>
        <Conversations/>
    </div>
  )
}

export default Sidebar