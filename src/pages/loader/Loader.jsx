import React from 'react'

function Loader() {
  return (
    <>
    <div className='flex justify-center gap-2 min-h-screen items-center'>
        <div className='w-8 h-10 bg-black      animate-bounce border-dashed  border border-white'></div>
        <div className='w-8 h-10 bg-pink-700   animate-bounce border-dashed  border border-white'></div>
        <div className='w-8 h-10 bg-orange-500 animate-bounce border-dashed  border border-white'></div>
        <div></div>
    </div>
    </>
  )
}

export default Loader