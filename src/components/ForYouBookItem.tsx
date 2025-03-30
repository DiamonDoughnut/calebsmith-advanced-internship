import { Book } from '@/lib/types'
import { Clock3Icon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const ForYouBookItem = ({book}: {book: Book}) => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<number | undefined>()
  const formatTime = (time: number | undefined) => {
    if (time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  };
  return (
    <div className='flex flex-col min-w-1/6 gap-y-1 hover:bg-neutral-200 !pt-8 !px-2 cursor-pointer' onClick={() => router.push(`/book/${book.id}`)}>
        <Image src={book.imageLink} alt='book img' height={600} width={600} className='w-full h-auto' />
        <h1 className='font-bold text-base/5'>{book.title}</h1>
        <p className='text-sm font-light text-gray-400'>{book.author}</p>
        <p className='text-sm/5'>{book.subTitle}</p>
        <div className="flex gap-x-2 text-gray-400 text-sm">
            <Clock3Icon size={18} />
            <span>{formatTime(duration)}</span>
            <StarIcon size={18} />
            <span>{book.averageRating}</span>    
        </div>
        <audio ref={audioRef} className='hidden' src={book.audioLink} onLoadedMetadata={() => setDuration(audioRef?.current?.duration)} />    
    </div>
  )
}

export default ForYouBookItem