"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LibraryBookItem from "@/components/ui/LibraryBookItem";
import { useAppSelector } from "@/hooks/ReduxTSAdapter";
import React, { useEffect, useState } from "react";

const Page = () => {
  const library = useAppSelector((state) => state.user.library);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [library]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Sidebar page='My Library' />
      
      {/* Made heading responsive */}
      <h1 className='text-xl sm:text-2xl font-bold 
        ml-4 sm:ml-20 md:ml-40 lg:ml-80 
        mb-4 sm:mb-8 md:mb-12 lg:mb-20'>
        Your Library
      </h1>
      
      {/* Responsive grid container */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-4 sm:gap-6 
        mt-4 
        mx-4 sm:!mx-20 md:!mx-40 lg:!ml-72 
        w-[calc(100%-2rem)] sm:w-[calc(100%-10rem)] md:w-[calc(100%-12rem)] lg:w-[calc(100%-20rem)]'>
        <>{/* Fragment to prevent whitespace */}
          {isLoading ? (
            [...Array(8)].map((_, index) => (
              <div 
                key={index} 
                className='w-full aspect-[3/4] bg-gray-200 animate-pulse rounded-md'
              />
            ))
          ) : library.length > 0 ? (
            library.map((book, index) => {
                if (index > 0) return (
              <div
                key={book}
                className='w-full'
              >
                <LibraryBookItem id={book} />
              </div>
            )})
          ) : (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center">
              <h1 className="text-lg sm:text-xl">No books added to your library yet</h1>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Page;
