'use client'
import { useAppDispatch } from '@/hooks/ReduxTSAdapter'
import { closeForgotPasswordModal, closeLoginModal, closeSignupModal, openLoginModal } from '@/lib/redux/modalSlice'
import { signOutUser } from '@/lib/redux/userSlice'
import { cn } from '@/lib/utils'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IconType } from 'react-icons/lib'

const SidebarLink = ({ page, text, Icon }: { page: 'For you' | 'My Library' | 'Settings' | string | undefined, text: string, Icon: IconType }) => {
    const authRef = getAuth();
    const dispatch = useAppDispatch();
    const router = useRouter();
    async function handleLogout() {
        await signOut(authRef);
        dispatch(signOutUser());
        dispatch(closeSignupModal());
        dispatch(closeLoginModal());
        dispatch(closeForgotPasswordModal());
        router.push('/')
    }
    const handleClick = () => {
        if (text === 'Login') {
            dispatch(openLoginModal())
        }
        if (text === 'Logout') {
            handleLogout();
        }
        if (text === 'For you' && page !== 'For you') {
            router.push('/for-you')
        }
        if (text === 'My Library' && page !== 'My Library') {
            router.push('/library')
        }
        if (text === 'Settings' && page !== 'Settings') {
            router.push('/settings')
        }
    }
  return (
    <div onClick={() => {
        if (page === undefined) {
            return
        }
        handleClick();
    }} className={cn('relative h-16 text-lg flex items-center justify-start gap-x-2 !pl-4 text-slate-900 hover:bg-neutral-200 cursor-pointer', page === undefined && 'cursor-not-allowed')}>
        {page === text && <div className='h-full w-1 bg-green-500 absolute top-0 left-0' />}
        <Icon size={28}/>
        <h1>{text}</h1>
    </div>
  )
}

export default SidebarLink