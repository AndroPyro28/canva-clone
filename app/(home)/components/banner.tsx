'use client'
import { Button } from '@/components/ui/button'
import { Crown } from 'lucide-react'
import React from 'react'

export const Banner = () => {
  return (
    <div className="flex flex-col items-center rounded-xl overflow-hidden bg-gradient-to-r from-[#00c4cc] via-[#8b3dff] to-[#5533ff] text-white p-4 sm:p-6  md:p-8 text-center">
      <div className="flex flex-col sm:flex-row justify-center items-center mb-2 sm:mb-4">
        <Crown className='size-8 sm:size-10 md:size-12 text-yellow-400'/>
        <span className='sm:ml-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight'> Create Innovative Designs</span>
      </div>
      <h2 className=" text-sm sm:text-based md:text-lg font-bold mb-4 sm:mb-6 max-w-2xl mx-auto">Design eye-catching thumbnails that get more views</h2>

      <Button className='cursor-pointer text-[#8b3dff] bg-white w-fit hover:bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-2.5'>Start Designing</Button>
    </div>
  )
}
