'use client'
import Header from '@/components/Header'
import Sidebar from '../../components/Sidebar'
import React from 'react'
import SelectedBook from '@/components/SelectedBook'
import RecommendedBooks from '@/components/RecommendedBooks'
import SuggestedBooks from '@/components/SuggestedBooks'

const page = () => {
  const page = 'for-you'
  

  return (
    <div className='h-full w-full relative !ml-50 !pl-32 !pb-24 text-black'>
        <Header />
        <Sidebar page='For you' setFontSize={undefined} />
        <SelectedBook />
        <RecommendedBooks />
        <SuggestedBooks />
    </div>
  )
}

export default page