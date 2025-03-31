'use client'
import { Book } from '@/lib/types';
import React from 'react'
import ForYouBookItem from './ForYouBookItem';
import useGetSuggestedBooks from '@/hooks/useGetSuggestedBooks';

const SuggestedBooks = () => {
      const {data, loading}: {data: Book[] | undefined, loading: boolean, error: unknown} = useGetSuggestedBooks();
  return (
    <div className='h-fit w-[80%] gap-y-4 flex flex-col'>
        <h1 className='text-2xl font-bold'>Suggested Books</h1>
        <p className='font-light'>Browse those books</p>
        <div className='flex gap-x-10 overflow-x-hidden overflow-y-clip'>
        {loading ? (
          // Loading skeleton
          [...Array(5)].map((_, index) => (
            <div key={index} className='h-80 w-1/6 bg-gray-200 animate-pulse rounded-md' />
          ))
        ) : data ? (
          // Actual data
          data.map((book: Book) => (
            <ForYouBookItem key={book.id} book={book} loading={loading} />
          ))
        ) : (
          // No data state
          <div>No books found</div>
        )}
        </div>
    </div>
  )
}

export default SuggestedBooks