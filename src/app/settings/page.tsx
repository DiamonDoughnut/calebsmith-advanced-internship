'use client'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import Settings from './Settings'

const Page = () => {
  return (
    <div className='h-full w-full'>
        <Header />
        <Sidebar page='Settings' />
        <Settings />
    </div>
  )
}

export default Page