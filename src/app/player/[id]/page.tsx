"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/ReduxTSAdapter";
import useGetBookById from "@/hooks/useGetBookById";
import { cn } from "@/lib/utils";
import { PauseIcon, PlayCircleIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";

const Page = () => {
    const {id} = useParams();
    const { data, loading, error } = useGetBookById(id as string)
    const fontSize = useAppSelector((state) => state.user.prefferedText)
    const [time, setTime] = useState<number | undefined>()
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);
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
    <div className='h-full w-full relative !ml-50 !pl-24 !pb-32 text-black'>
      <Header />
      <Sidebar page='player/:id' />
      <div className="w-[80%] h-fit flex flex-col gap-x-4">
        <div className="border-b border-b-neutral-200 !-mt-4 !pb-4 text-2xl">{data?.title}</div>
        <div className={`text-${fontSize} font-normal whitespace-pre-line !mt-8`}>{data?.summary}</div>
      </div>
      <div className="fixed bottom-0 left-0 w-full h-20 bg-slate-800 flex items-center justify-center">
        <div className="absolute left-8 top-[10%] h-4/5 w-50 text-neutral-100 flex items-center justify-center">
            {data && (<Image src={data.imageLink || null} alt="" height={600} width={600} className="h-full object-contain" />)}
            <div className="h-full flex flex-col justify-center">
                <h1 className="w-fit whitespace-nowrap">{data?.title}</h1>
                <p className="text-sm ">{data?.author}</p>
            </div>
        </div>
        <div className="absolute right-8 top-[10%] h-4/5 w-120 flex flex-col items-center justify-center gap-2">
  {/* Progress Bar Container */}
  <div className="w-full h-2 bg-neutral-200 rounded-full cursor-pointer relative"
       onClick={(e) => {
         const bounds = e.currentTarget.getBoundingClientRect()
         const percent = (e.clientX - bounds.left) / bounds.width
         if (audioRef.current) {
           audioRef.current.currentTime = percent * audioRef.current.duration
         }
       handleSeek(e);  
       }}>
    {/* Progress Bar Fill */}
    <div 
      className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
      style={{ width: `${progress}%` }}
    />
  </div>
  
  {/* Time Display */}
  <div className="w-full flex justify-between px-2 text-sm text-neutral-200">
    <span>{formatTime(currentTime)}</span>
    <span>{formatTime(time || 0)}</span>
  </div>
</div>        <div className="flex items-center justify-evenly h-4/5 w-fit gap-x-4">
            <Button onClick={skipBackward} className="h-12 w-12 bg-transparent outline-none hover:bg-transparent hover:outline-none shadow-none drop-shadow-none cursor-pointer">
                <SkipBackIcon className="min-h-8 min-w-8" />                
            </Button>
            <Button onClick={togglePlayPause} className="h-16 w-16 bg-transparent outline-none hover:bg-transparent hover:outline-none shadow-none drop-shadow-none cursor-pointer">
                <div className="h-14 w-14 rounded-full bg-neutral-200 flex items-center justify-center ">
                    {isPlaying ? (
                        <PauseIcon fill="#1d293d" className="min-h-10 min-w-10 text-slate-800" />
                    ) : (
                        <PlayIcon fill="#1d293d" className="min-h-10 min-w-10 text-slate-800" />
                    )}
                </div>
            </Button>
            <Button onClick={skipForward} className="h-12 w-12 bg-transparent outline-none hover:bg-transparent hover:outline-none shadow-none drop-shadow-none cursor-pointer">
                <SkipForwardIcon className="min-h-8 min-w-8" />
            </Button>
        </div>
        <audio ref={audioRef} className="hidden" src={data?.audioLink} onLoadedMetadata={() => setTime(audioRef.current?.duration)} onTimeUpdate={() => {
            if(audioRef.current) {
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
                setCurrentTime(audioRef.current.currentTime)
            }
        }} />
      </div>
    </div>
  )
}

export default Page