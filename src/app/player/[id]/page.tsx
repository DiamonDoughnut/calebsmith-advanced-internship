"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/ReduxTSAdapter";
import useGetBookById from "@/hooks/useGetBookById";
import { PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";

const Page = () => {
    const {id} = useParams();
    const { data, loading } = useGetBookById(id as string)
    const fontSize = useAppSelector((state) => state.user.prefferedText)
    const [time, setTime] = useState<number | undefined>()
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isAudioLoading, setIsAudioLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null)

    const formatTime = (timeInSeconds: number): string => {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
      }

      const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect()
        const percent = (e.clientX - bounds.left) / bounds.width
        if (audioRef.current) {
          audioRef.current.currentTime = percent * audioRef.current.duration
        }
      }
      const togglePlayPause = () => {
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }
          setIsPlaying(!isPlaying);
        }
      };
      
      const skipForward = () => {
        if (audioRef.current) {
          audioRef.current.currentTime += 10;
        }
      };
      
      const skipBackward = () => {
        if (audioRef.current) {
          audioRef.current.currentTime -= 10;
        }
      };
      

  return (
    <div className='min-h-screen w-full relative flex flex-col'>
            <Header />
            <Sidebar page='player/:id' />
            
            {/* Main content - maintains original !ml-50 !pl-24 !pb-32 for desktop */}
            <div className='h-full w-full relative 
                !ml-4 sm:!ml-8 md:!ml-24 lg:!ml-50 
                !pl-4 sm:!pl-8 md:!pl-16 lg:!pl-24 
                !pb-32 
                text-black'>
                
                {loading ? (
                    <div className="w-[90%] sm:w-[85%] md:w-[80%] h-fit flex flex-col !gap-4 animate-pulse">
                        <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
                        <div className="h-40 w-full bg-gray-200 rounded"></div>
                    </div>
                ) : (
                    <div className="w-[90%] sm:w-[85%] md:w-[80%] h-fit flex flex-col !gap-x-4">
                        <div className="border-b border-b-neutral-200 !-mt-4 !pb-4 text-xl sm:text-2xl">
                            {data?.title}
                        </div>
                        <div className={`text-${fontSize} font-normal whitespace-pre-line !mt-8`}>
                            {data?.summary}
                        </div>
                    </div>
                )}

                {/* Audio player controls - fixed bottom */}
                <div className="fixed bottom-0 left-0 w-full h-16 sm:h-20 bg-slate-800 
                    flex items-center justify-center">
                    
                    {/* Book info section */}
                    <div className="absolute left-2 sm:left-8 top-[10%] h-4/5 
                        w-[120px] sm:w-[200px] md:w-[250px]
                        text-neutral-100 
                        flex items-center justify-center !gap-x-2">
                        {data && (
                            <>
                                <div className="relative h-full hidden sm:block">
                                    {isImageLoading && (
                                        <div className="absolute inset-0 bg-gray-600 animate-pulse rounded" />
                                    )}
                                    <Image 
                                        src={data.imageLink || ''} 
                                        alt="" 
                                        height={600} 
                                        width={600} 
                                        className="h-full object-contain"
                                        onLoadingComplete={() => setIsImageLoading(false)}
                                    />
                                </div>
                                <div className="h-full flex flex-col justify-center overflow-hidden md:min-w-fit">
                                    <h1 className="w-fit whitespace-nowrap text-sm sm:text-base truncate">
                                        {data.title}
                                    </h1>
                                    <p className="text-xs sm:text-sm truncate">{data.author}</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Progress bar section */}
                    <div className="absolute right-2 sm:right-8 top-[10%] h-4/5 
                        w-[100px] sm:w-[200px] md:w-[300px] lg:w-[400px]
                        flex flex-col items-center justify-center !gap-2">
                        <div 
                            className={`w-full h-2 bg-neutral-200 rounded-full cursor-pointer relative 
                                ${isAudioLoading ? 'opacity-50' : ''}`}
                            onClick={handleSeek}
                        >
                            <div 
                                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        
                        <div className="w-full flex justify-between !px-2 text-xs sm:text-sm text-neutral-200">
                            <span>{formatTime(currentTime)}</span>
                            <span>{isAudioLoading ? '--:--' : formatTime(time || 0)}</span>
                        </div>
                    </div>

                    {/* Playback controls */}
                    <div className="flex items-center justify-evenly h-4/5 w-fit !gap-x-2 sm:!gap-x-4">
                        <Button 
                            onClick={skipBackward}
                            disabled={isAudioLoading}
                            className={`h-8 w-8 sm:h-12 sm:w-12 bg-transparent outline-none hover:bg-transparent 
                                hover:outline-none shadow-none drop-shadow-none cursor-pointer
                                ${isAudioLoading ? 'opacity-50' : ''}`}
                        >
                            <SkipBackIcon className="min-h-6 min-w-6 sm:min-h-8 sm:min-w-8" />
                        </Button>

                        <Button 
                            onClick={togglePlayPause}
                            disabled={isAudioLoading}
                            className={`h-12 w-12 sm:h-16 sm:w-16 bg-transparent outline-none hover:bg-transparent 
                                hover:outline-none shadow-none drop-shadow-none cursor-pointer
                                ${isAudioLoading ? 'opacity-50' : ''}`}
                        >
                            <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-neutral-200 
                                flex items-center justify-center">
                                {isAudioLoading ? (
                                    <div className="animate-spin h-6 w-6 sm:h-8 sm:w-8 
                                        border-4 border-slate-800 border-t-transparent rounded-full" />
                                ) : isPlaying ? (
                                    <PauseIcon fill="#1d293d" className="min-h-8 min-w-8 sm:min-h-10 sm:min-w-10 text-slate-800" />
                                ) : (
                                    <PlayIcon fill="#1d293d" className="min-h-8 min-w-8 sm:min-h-10 sm:min-w-10 text-slate-800" />
                                )}
                            </div>
                        </Button>

                        <Button 
                            onClick={skipForward}
                            disabled={isAudioLoading}
                            className={`h-8 w-8 sm:h-12 sm:w-12 bg-transparent outline-none hover:bg-transparent 
                                hover:outline-none shadow-none drop-shadow-none cursor-pointer
                                ${isAudioLoading ? 'opacity-50' : ''}`}
                        >
                            <SkipForwardIcon className="min-h-6 min-w-6 sm:min-h-8 sm:min-w-8" />
                        </Button>
                    </div>

                    <audio 
                        ref={audioRef} 
                        className="hidden" 
                        src={data?.audioLink}
                        onLoadStart={() => setIsAudioLoading(true)}
                        onCanPlay={() => setIsAudioLoading(false)}
                        onLoadedMetadata={() => setTime(audioRef.current?.duration)}
                        onTimeUpdate={() => {
                            if(audioRef.current) {
                                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
                                setCurrentTime(audioRef.current.currentTime)
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Page