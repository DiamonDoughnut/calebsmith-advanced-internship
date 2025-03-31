import { Book } from '@/lib/types'
import { Clock3Icon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { Badge } from './ui/badge'

const ForYouBookItem = ({book, loading }: {book: Book, loading: boolean}) => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<number | undefined>()
  const formatTime = (time: number | undefined) => {
    if (time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return '--:--';
  };
  if (loading) {
    return <div className='h-full w-full bg-gray-200 animate-pulse' />
  }
  return (
    <div className='flex flex-col min-w-1/6 gap-y-1 hover:bg-neutral-200 !pt-8 !px-2 cursor-pointer relative z-10' onClick={() => router.push(`/book/${book.id}`)}>
        {book.subscriptionRequired && (<Badge className='bg-blue-900 text-white absolute top-2 right-2 text-xs'>Premium</Badge>)}
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