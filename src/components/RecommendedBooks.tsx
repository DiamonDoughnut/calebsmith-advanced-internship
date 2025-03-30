'use client'
import useGetRecommendedBooks from '@/hooks/useGetRecommendedBooks';
import { Book } from '@/lib/types';
import React from 'react'
import ForYouBookItem from './ForYouBookItem';

const RecommendedBooks = () => {
      const {data, loading, error}: {data: Book[] | undefined, loading: boolean, error: unknown} = useGetRecommendedBooks();
  return (
    <div className='h-fit w-[80%] gap-y-4 flex flex-col'>
        <h1 className='text-2xl font-bold'>Recommended For You</h1>
        <p className='font-light'>We think you&apos;ll like these</p>
        <div className='flex gap-x-10 overflow-x-hidden overflow-y-clip'>
        {(!loading && !error) && 
            data?.map((book: Book) => (
                    <ForYouBookItem key={book.id} book={book} />
                ))
            }
        </div>
    </div>
  )
}

export default RecommendedBooks