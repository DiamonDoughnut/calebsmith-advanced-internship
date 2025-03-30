import React from 'react'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'

const Header = () => {
  return (
    <div className='w-[65%] h-20 bg-transparent border-b-2 border-neutral-100 flex items-center justify-end !mb-8'>
        <div className='h-1/2 relative min-w-80 rounded-md bg-neutral-200'>
            <Input placeholder='Search for Books' className='w-70 border-0 h-full bg-neutral-200 rounded-r-none border-r border-r-neutral-400 !pl-4' />
            <SearchIcon className='absolute top-1/2 right-2 -translate-y-1/2 h-6 w-6 cursor-pointer text-neutral-500 active:text-black' />
        </div>
    </div>
  )
}

export default Header