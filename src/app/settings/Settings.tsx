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
            <div className='h-full w-[60%] !ml-92'>
                <h1 className='text-3xl font-bold !py-4 border-b border-b-gray-500/50'>Settings</h1>
                <div className="flex flex-col items-center justify-center w-full">
                    <Image src={'/assets/login.png'} alt='' width={1033} height={712} className='object-contain h-100' />
                    <h1 className="text-3xl font-bold !py-4 w-full text-center">Log in to view your settings</h1>
                    <Button onClick={handleLoginClick} className='!p-4 !px-8 bg-green-500 text-xl'>Log In</Button>
                </div>
            </div>
        )
    }
  return (
            <div className='h-full w-[60%] !ml-92'>
                <h1 className='text-3xl font-bold !py-4 border-b border-b-gray-500/50'>Settings</h1>
                <h1 className="text-xl font-bold !pt-8 !pb-4">Your Subscription plan</h1>
                <p className="text-base font-normal !pb-4">{isSubscribed ? isSubscribed : "Basic"}</p>
                {!isSubscribed && <Button onClick={handleSubscriptionClick} className='!p-4 !px-8 bg-green-500 text-xl'>Upgrade</Button>}
                <div className='h-[1px] w-full bg-gray-500/50 !mt-8' />
                <h1 className='text-xl font-bold !pt-8 !pb-4'>Email</h1>
                <p className="text-base font-normal !pb-4">{user.email}</p>
            </div>
  )
}

export default Settings