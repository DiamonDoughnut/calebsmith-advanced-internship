import { Book } from '@/lib/types'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Clock3Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SearchResultItem = ({book}: {book: Book}) => {
    const [duration, setDuration] = useState(0)
    const router = useRouter();
    const audioRef = useRef(null);
    const formatTime = (time: number | undefined) => {
        if (time) {
          const minutes = Math.floor(time / 60);
          const seconds = Math.floor(time % 60);
          return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
      };
  return (
    <div onClick={() => router.push(`/book/${book.id}`)} className="flex items-center !p-4 gap-x-3 cursor-pointer border-b border-b-gray-500/50 w-full h-30 relative z-50">
                    <Image src={book.imageLink} alt='' height={600} width={600} className='h-25 w-25 object-contain' />
                    <div className="">
                      <h1 className="text-lg font-bold">{book.title}</h1>
                      <p className='text-base font-normal text-gray-500'>{book.author}</p>
                      <div className="flex items-center justify-start">
                        <Clock3Icon />
                        <p>{formatTime(duration)}</p>
                      </div>
                    </div>
                    {/*@ts-expect-error: error is type unknown*/}
                    <audio src={book.audioLink} className='hidden' ref={audioRef} onLoadedMetadata={() => setDuration(audioRef?.current?.duration)} />
                  </div>
  )
}

export default SearchResultItem