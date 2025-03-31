import useGetBookById from '@/hooks/useGetBookById'
import React from 'react'
import ForYouBookItem from '../ForYouBookItem'

const LibraryBookItem = ({id}: {id: string}) => {
    const { data, loading } = useGetBookById(id)
    if (!data || loading) {
        return <></>
    }
  return (
    <ForYouBookItem book={data} loading={loading} />
  )
}

export default LibraryBookItem