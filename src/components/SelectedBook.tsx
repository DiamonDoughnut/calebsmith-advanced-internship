import useGetSelectedBooks from '@/hooks/useGetSelectedBooks';
import { Book } from '@/lib/types';
import { PlayIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'

const SelectedBook = () => {
    const {data, loading}: {data: Book[] | undefined, loading: boolean, error: unknown} = useGetSelectedBooks();
    const router = useRouter();
    const [duration, setDuration] = useState<number | undefined>()
    const [isAudioLoading, setIsAudioLoading] = useState(true);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const audioRef = useRef<HTMLAudioElement>(null)
    const formatTime = (time: number | undefined) => {
      if (time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    };
  return (
    <div className="text-2xl font-bold cursor-pointer" onClick={() => data && (router.push(`/book/${data?.[0].id}`))}>
          Selected just for you
          <div className="h-48 w-[50%] rounded-md flex flex-col sm:flex-row items-center !my-4 bg-neutral-200">
          {loading ? (
            // Loading skeleton
            <div className="w-full h-full animate-pulse flex">
              <div className="h-[80%] w-[40%] bg-gray-300 !ml-4" />
              <div className="h-[80%] w-[55%] bg-gray-300 ml-4" />
            </div>
          ) : (
            <>
              <div className="h-[80%] w-[40%] border-r border-r-neutral-400 text-base !ml-4 font-normal">
                <div className="h-full w-[80%]">
                  {data && data[0].subTitle}
                </div>
              </div>
              <div className="h-[80%] w-[55%] flex items-center justify-center">
                {data && (
                  <>
                    <div className="relative">
                      {isImageLoading && (
                        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
                      )}
                      <Image 
                        height={600} 
                        width={600} 
                        src={data[0].imageLink} 
                        alt='book image' 
                        className='h-full w-50 !-ml-8 object-contain'
                        onLoadingComplete={() => setIsImageLoading(false)}
                      />
                    </div>
                    <div className="h-full flex flex-col justify-start gap-y-2 items-start">
                      <h1 className='text-base font-bold'>{data[0].title}</h1>  
                      <p className="text-base font-light">{data[0].author}</p>
                      <div className="!pt-0 flex w-full h-fit">
                        <div className="flex items-center justify-center rounded-full h-10 w-10 bg-slate-800">
                          <PlayIcon fill='#e5e5e5' className='text-neutral-200 !pl-0.5' />
                        </div> 
                        <p className='text-base font-normal h-10 w-20 flex items-center justify-start !ml-2 text-gray-600'>
                          {isAudioLoading ? (
                            <span className="animate-pulse">Loading...</span>
                          ) : (
                            formatTime(duration)
                          )}
                        </p> 
                      </div>  
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
        <audio 
          className='hidden' 
          ref={audioRef} 
          src={data?.[0].audioLink} 
          onLoadedMetadata={() => {
            setDuration(audioRef.current?.duration);
            setIsAudioLoading(false);
          }} 
        />
      </div>
    )
}

export default SelectedBook