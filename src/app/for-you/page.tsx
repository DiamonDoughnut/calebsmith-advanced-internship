'use client'
import Header from '@/components/Header'
import Sidebar from '../../components/Sidebar'
import React, { Suspense } from 'react'
import SelectedBook from '@/components/SelectedBook'
import RecommendedBooks from '@/components/RecommendedBooks'
import SuggestedBooks from '@/components/SuggestedBooks'
import { useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/hooks/ReduxTSAdapter'
import { setUser } from '@/lib/redux/userSlice'
import { auth, db } from '../../../firebase'
import { collection, getDocs, query, setDoc, where } from 'firebase/firestore'

const Page = () => {
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const user = auth.currentUser
  
    const handleDatabaseUpdate = async (userId: string, subscription: 'premium' | 'premium-plus') => {
      const userDataRef = collection(db, "userData");
      const q = query(userDataRef, where("userId", "==", userId));
      const querySnapshot = (await getDocs(q))
      const userDoc = querySnapshot.docs[0]
      setDoc(userDoc.ref, {isSubscribed: subscription})
    }
  
    if (user) {
    const userId = user.uid;

    if (params.toString().includes('success')) {
      if (params.toString().includes('premium-plus')) {
        dispatch(setUser({isSubscribed: 'premium-plus'}))
        handleDatabaseUpdate(userId, 'premium-plus')
      } else {
        dispatch(setUser({isSubscribed: 'premium'}))
        handleDatabaseUpdate(userId, 'premium')
      }
    } 
  }
    
  return (
    <Suspense >
    <div className='h-full w-full relative z-0 !ml-50 !pl-32 !pb-24 text-black'>
        <Header />
        <Sidebar page='For you' />
        <SelectedBook />
        <RecommendedBooks />
        <SuggestedBooks />
    </div>
    </Suspense>
  )
}

export default Page