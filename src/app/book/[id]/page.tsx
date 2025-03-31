"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import useGetBookById from "@/hooks/useGetBookById";
import {
  BookmarkCheckIcon,
  BookmarkPlusIcon,
  BookOpenIcon,
  Clock3Icon,
  LightbulbIcon,
  MicIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { auth } from "../../../../firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxTSAdapter";
import { openLoginModal } from "@/lib/redux/modalSlice";
import { setUser } from "@/lib/redux/userSlice";
import { setDoc } from "firebase/firestore";

const Page = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetBookById(id?.toString() as string);
  const user = auth.currentUser;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isSubscribed = useAppSelector((state) => state.user.isSubscribed);
  const docRef = useAppSelector((state) => state.user.userDocRef);
  const userLibrary = useAppSelector((state) => state.user.library);
  const [inLibrary, setInLibrary] = useState<boolean>(
    userLibrary.includes(id?.toString() as string) || false
  );

  if (id?.toString() === "" || !id) {
    router.push("/for-you");
    return <div></div>;
  }

  const handleClick = () => {
    if (!user) {
      dispatch(openLoginModal());
      return;
    }
    if (data?.subscriptionRequired && isSubscribed) {
      router.push(`/player/${id}`);
    } else if (!loading && !error && !data?.subscriptionRequired) {
      router.push(`/player/${id}`);
    } else {
      router.push("/choose-plan");
    }
  };

  const addToLibrary = () => {
    if (!user) {
      dispatch(openLoginModal());
      return;
    }
    if (inLibrary) {
      const newLibrary = userLibrary.filter((book) => book !== id.toString());
      dispatch(setUser({ library: newLibrary }));
      if (docRef) {
        setDoc(docRef, { library: newLibrary });
      }
      setInLibrary(false);
    } else {
      dispatch(setUser({ library: [...userLibrary, id.toString()] }));
      if (docRef) {
        setDoc(docRef, { library: [...userLibrary, id.toString()] });
      }
      setInLibrary(true);
    }
  };

  return (
    <div className='h-full w-full relative !ml-50 !pl-24 !pb-24 text-black'>
      <Header />
      <Sidebar page='book/:id' />
      <div className=' h-fit w-[80%] gap-x-4 flex items-start'>
        <div className='flex flex-col w-[75%] h-full gap-y-4'>
          <h1 className='text-3xl font-bold'>{data?.title} {data?.subscriptionRequired ? " (Premium)" : ""}</h1>
          <p className='font-normal'>{data?.author}</p>
          <h1 className='text-2xl font-extralight'>{data?.subTitle}</h1>
          <div className='border-y-neutral-400 w-full h-fit border-y-2 flex flex-col gap-y-4 !py-4 !pl-4'>
            <div className='flex justify-between w-1/2 h-8 relative'>
              <div className='flex items-center gap-x-2 absolute top-1/2 left-2 -translate-y-[70%]'>
                <StarIcon />
                <p className='text-sm'>
                  {data?.averageRating + " (" + data?.totalRating + " ratings)"}
                </p>
              </div>
              <div className='flex items-center gap-x-2 absolute top-1/2  left-1/2 -translate-y-[70%]'>
                <Clock3Icon />
                <p className='text-sm'>Time</p>
              </div>
            </div>
            <div className='flex justify-between w-1/2 !mb-4 relative'>
              <div className='flex items-center gap-x-2 absolute top-1/2 left-2 -translate-y-1/2'>
                <MicIcon />
                <p className='text-sm'>{data?.type}</p>
              </div>
              <div className='flex items-center gap-x-2 absolute top-1/2 left-1/2 -translate-y-1/2'>
                <LightbulbIcon />
                <p className='text-sm'>{data?.keyIdeas + " Key Ideas"}</p>
              </div>
            </div>
          </div>
          <div className='flex gap-x-8 !ml-12'>
            <Button
              onClick={handleClick}
              className='w-36 h-12 cursor-pointer bg-blue-700 hover:bg-blue-800 active:bg-blue-500 active:translate-[1px]'
            >
              <BookOpenIcon
                size={40}
                className='min-h-6 min-w-6'
              />
              <h1 className='text-lg'>Read</h1>
            </Button>
            <Button
              onClick={handleClick}
              className='w-36 h-12 cursor-pointer bg-blue-700 hover:bg-blue-800 active:bg-blue-500 active:translate-[1px]'
            >
              <MicIcon
                size={40}
                className='min-h-6 min-w-6'
              />
              <h1 className='text-lg'>Listen</h1>
            </Button>
          </div>
          <Button
            onClick={addToLibrary}
            className='h-12 w-60 cursor-pointer !ml-12 border-none shadow-none drop-shadow-none bg-transparent hover:bg-transparent text-blue-600 hover:text-blue-800 active:text-blue-500'
          >
            {inLibrary ? (
              <BookmarkPlusIcon
                size={40}
                className='min-h-6 min-w-6'
              />
            ) : (
              <BookmarkCheckIcon
                size={40}
                className='min-h-6 min-w-6'
              />
            )}
            <h1 className='text-lg'>
              {inLibrary ? "Saved to" : "Add Title to"} My Library
            </h1>
          </Button>
          <div className='flex flex-col !mt-4 gap-y-2'>
            <h1 className='text-lg font-bold'>What&apos;s it about?</h1>
            <div className='flex gap-x-2 !ml-2'>
              {data?.tags.map((tag) => (
                <div
                  key={data.id + tag}
                  className='h-12 !px-8 bg-neutral-300 font-semibold text-base text-black rounded-md flex items-center justify-center'
                >
                  {tag}
                </div>
              ))}
            </div>
            <p className='text-base font-normal !mt-2'>
              {data?.bookDescription}
            </p>
            <h1 className='text-lg font-bold !my-2'>About the author</h1>
            <p className='text-base font-normal'>{data?.authorDescription}</p>
          </div>
        </div>
        {!loading && !error && data && (
          <Image
            src={data.imageLink}
            width={600}
            height={600}
            alt='book'
            className='w-[25%] h-[25w] object-contain'
          />
        )}
      </div>
    </div>
  );
};

export default Page;
