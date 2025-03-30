'use client'
import { Book } from '@/lib/types';
import React from 'react'
import ForYouBookItem from './ForYouBookItem';
import useGetSuggestedBooks from '@/hooks/useGetSuggestedBooks';

const SuggestedBooks = () => {
      const {data, loading, error}: {data: Book[] | undefined, loading: boolean, error: unknown} = useGetSuggestedBooks();
  return (
    <div className='h-fit w-[80%] gap-y-4 flex flex-col'>
        <h1 className='text-2xl font-bold'>Suggested Books</h1>
        <p className='font-light'>Browse those books</p>
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

export default SuggestedBooks