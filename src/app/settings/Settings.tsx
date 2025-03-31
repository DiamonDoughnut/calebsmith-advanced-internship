'use client'
import React from 'react'
import { auth } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxTSAdapter'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { openLoginModal } from '@/lib/redux/modalSlice'
import { useRouter } from 'next/navigation'

const Settings = () => {
    const user = auth.currentUser
    const isSubscribed = useAppSelector((state) => state.user.isSubscribed);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLoginClick = () => {
        dispatch(openLoginModal())
    }

    const handleSubscriptionClick = () => {
        router.push('/choose-plan')
    }

    if (!user) {
        return (
            <div className='h-full w-full sm:w-[80%] md:w-[70%] lg:w-[60%] 
                !ml-4 sm:!ml-8 md:!ml-12 lg:!ml-92'>
                <h1 className='text-2xl sm:text-3xl font-bold 
                    !py-4 
                    border-b border-b-gray-500/50'>
                    Settings
                </h1>
                <div className="flex flex-col items-center justify-center w-full 
                    !mt-4 sm:!mt-8">
                    <div className="relative w-full max-w-[600px] aspect-[1.45/1]">
                        <Image 
                            src={'/assets/login.png'} 
                            alt='' 
                            fill
                            className='object-contain'
                        />
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold 
                        !py-4 
                        w-full text-center">
                        Log in to view your settings
                    </h1>
                    <Button 
                        onClick={handleLoginClick} 
                        className='!p-4 !px-8 bg-green-500 text-lg sm:text-xl'>
                        Log In
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className='h-full w-full sm:w-[80%] md:w-[70%] lg:w-[60%] 
            !ml-4 sm:!ml-8 md:!ml-12 lg:!ml-92'>
            <h1 className='text-2xl sm:text-3xl font-bold 
                !py-4 
                border-b border-b-gray-500/50'>
                Settings
            </h1>
            
            {/* Subscription section */}
            <div className="!mt-4 sm:!mt-8">
                <h1 className="text-lg sm:text-xl font-bold 
                    !pt-8 !pb-4">
                    Your Subscription plan
                </h1>
                <p className="text-base font-normal !pb-4">
                    {isSubscribed ? isSubscribed : "Basic"}
                </p>
                {!isSubscribed && (
                    <Button 
                        onClick={handleSubscriptionClick} 
                        className='!p-4 !px-8 bg-green-500 text-lg sm:text-xl'>
                        Upgrade
                    </Button>
                )}
            </div>

            {/* Divider */}
            <div className='h-[1px] w-full bg-gray-500/50 !mt-8' />

            {/* Email section */}
            <div className="!mt-4 sm:!mt-8">
                <h1 className='text-lg sm:text-xl font-bold 
                    !pt-8 !pb-4'>
                    Email
                </h1>
                <p className="text-base font-normal !pb-4">
                    {user.email}
                </p>
            </div>
        </div>
    )
}

export default Settings
