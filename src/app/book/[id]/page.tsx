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
import { auth, db } from "../../../../firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxTSAdapter";
import { openLoginModal } from "@/lib/redux/modalSlice";
import { setUser } from "@/lib/redux/userSlice";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const Page = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetBookById(id?.toString() as string);
  const user = auth.currentUser;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isSubscribed = useAppSelector((state) => state.user.isSubscribed);
  const userLibrary = useAppSelector((state) => state.user.library);
  const [inLibrary, setInLibrary] = useState<boolean>(
    userLibrary.includes(id?.toString() as string) || false
  );
  const [isUpdatingLibrary, setIsUpdatingLibrary] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);


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

  const addToLibrary = async () => {
    if (!user) {
      dispatch(openLoginModal());
      return;
    }

    if (isUpdatingLibrary) return;

    setIsUpdatingLibrary(true);
    try {
      const userDataRef = collection(db, "userData");
      const q = query(userDataRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.error("No matching document found");
        return;
      }

      const userDocRef = doc(db, "userData", querySnapshot.docs[0].id);
      const newLibrary = inLibrary
        ? userLibrary.filter((book) => book !== id.toString())
        : [...userLibrary, id.toString()];

      // Optimistically update UI
      setInLibrary(!inLibrary);
      dispatch(setUser({ library: newLibrary }));

      await updateDoc(userDocRef, {
        library: newLibrary
      });
    } catch (error) {
      console.error("Error updating library: ", error);
      // Revert optimistic updates on error
      dispatch(setUser({ library: userLibrary }));
      setInLibrary(inLibrary);
    } finally {
      setIsUpdatingLibrary(false);
    }
  };

  return (
    <div className='min-h-screen w-full relative flex flex-col'>
      <Header />
      <Sidebar page='book/:id' />
      
      {/* Main content container - maintains !ml-50 for desktop */}
      <div className='w-full md:w-[90%] lg:w-[80%] 
        !ml-4 sm:!ml-8 md:!ml-12 lg:!ml-50 
        !pl-4 sm:!pl-8 md:!pl-16 lg:!pl-24 
        !pb-6 sm:!pb-12 md:!pb-16 lg:!pb-24'>
        
        <div className='flex flex-col lg:flex-row w-full gap-x-4'>
          {loading ? (
            // Responsive loading skeleton
            <div className="w-full animate-pulse">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-3/4">
                  <div className="h-8 w-1/2 bg-gray-200 !mb-4 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-200 !mb-4 rounded"></div>
                  <div className="h-6 w-3/4 bg-gray-200 !mb-6 rounded"></div>
                  
                  <div className="border-y-2 border-neutral-400 !py-4 !mb-6">
                    <div className="flex gap-4 !mb-4">
                      <div className="h-6 w-24 bg-gray-200 rounded"></div>
                      <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-6 w-24 bg-gray-200 rounded"></div>
                      <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/4">
                  <div className="h-64 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-500">Error loading book details</div>
          ) : data ? (
            <>
              {/* Book details section */}
              <div className='flex flex-col w-full lg:w-[75%] !gap-y-4'>
                <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold'>
                  {data.title} {data.subscriptionRequired ? " (Premium)" : ""}
                </h1>
                <p className='font-normal'>{data.author}</p>
                <h1 className='text-lg sm:text-xl lg:text-2xl font-extralight'>{data.subTitle}</h1>
                
                {/* Stats section */}
                <div className='border-y-neutral-400 w-full border-y-2 flex flex-col !gap-y-4 !py-4 !pl-4'>
                  <div className='flex flex-wrap gap-6 lg:w-1/2 relative'>
                    <div className='flex items-center !gap-x-2'>
                      <StarIcon />
                      <p className='text-sm'>
                        {data.averageRating + " (" + data.totalRating + " ratings)"}
                      </p>
                    </div>
                    <div className='flex items-center !gap-x-2'>
                      <Clock3Icon />
                      <p className='text-sm'>Time</p>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-6 lg:w-1/2 relative'>
                    <div className='flex items-center !gap-x-2'>
                      <MicIcon />
                      <p className='text-sm'>{data.type}</p>
                    </div>
                    <div className='flex items-center !gap-x-2'>
                      <LightbulbIcon />
                      <p className='text-sm'>{data.keyIdeas + " Key Ideas"}</p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className='flex flex-wrap !gap-4 !mt-4'>
                  <Button
                    onClick={handleClick}
                    className='w-full sm:w-36 h-12 cursor-pointer bg-blue-700 hover:bg-blue-800 active:bg-blue-500'
                  >
                    <BookOpenIcon size={40} className='min-h-6 min-w-6' />
                    <h1 className='text-lg'>Read</h1>
                  </Button>
                  <Button
                    onClick={handleClick}
                    className='w-full sm:w-36 h-12 cursor-pointer bg-blue-700 hover:bg-blue-800 active:bg-blue-500'
                  >
                    <MicIcon size={40} className='min-h-6 min-w-6' />
                    <h1 className='text-lg'>Listen</h1>
                  </Button>
                </div>

                {/* Library button */}
                <Button
                  onClick={addToLibrary}
                  disabled={isUpdatingLibrary}
                  className={`h-12 w-full sm:w-60 cursor-pointer bg-transparent hover:bg-transparent 
                    text-blue-600 hover:text-blue-800 active:text-blue-500
                    ${isUpdatingLibrary ? 'opacity-50' : ''}`}
                >
                  {isUpdatingLibrary ? (
                    <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full" />
                  ) : inLibrary ? (
                    <BookmarkCheckIcon size={40} className='min-h-6 min-w-6' />
                  ) : (
                    <BookmarkPlusIcon size={40} className='min-h-6 min-w-6' />
                  )}
                  <h1 className='text-lg'>
                    {isUpdatingLibrary 
                      ? 'Updating...' 
                      : `${inLibrary ? "Saved to" : "Add Title to"} My Library`}
                  </h1>
                </Button>

                {/* Book description */}
                <div className='flex flex-col !mt-4 !gap-y-2'>
                  <h1 className='text-lg font-bold'>What's it about?</h1>
                  <div className='flex flex-wrap !gap-2'>
                    {data.tags.map((tag) => (
                      <div
                        key={data.id + tag}
                        className='h-12 !px-8 bg-neutral-300 font-semibold text-base text-black rounded-md 
                          flex items-center justify-center'
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                  <p className='text-base font-normal !mt-2'>{data.bookDescription}</p>
                  <h1 className='text-lg font-bold !my-2'>About the author</h1>
                  <p className='text-base font-normal'>{data.authorDescription}</p>
                </div>
              </div>

              {/* Book image section */}
              <div className="w-full lg:w-[25%] !mt-6 lg:!mt-0">
                {isImageLoading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
                )}
                <Image
                  src={data.imageLink}
                  width={600}
                  height={600}
                  alt='book'
                  className='w-full h-auto object-contain'
                  onLoadingComplete={() => setIsImageLoading(false)}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Page;
