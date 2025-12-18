import Image from 'next/image'
import React from 'react'

const Wave = () => {
  return (
    <Image priority loading='eager' alt='wave' src='/images/landingPage/wave.svg' width={100} height={100} className='w-full h-screen object-cover pointer-events-none -bottom-20 absolute z-1'/>
  )
}

export default Wave
