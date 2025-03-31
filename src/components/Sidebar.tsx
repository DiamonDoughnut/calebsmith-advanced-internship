import Image from 'next/image'
import React from 'react'
import SidebarLink from './SidebarLink'
import { BookmarkIcon, CogIcon, HelpCircleIcon, HouseIcon, LogInIcon, LogOutIcon, PenIcon, SearchIcon } from 'lucide-react'
import { auth } from '../../firebase'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { setUser } from '@/lib/redux/userSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxTSAdapter'

const Sidebar = ({ page, }: { page: string }) => {
  const user = auth.currentUser
  const fontSize = useAppSelector((state) => state.user.prefferedText)
  const dispatch = useAppDispatch();

  return (
    <div className={cn('fixed top-0 left-0 h-full w-50 bg-neutral-100 flex flex-col justify-between', page === 'player/:id' && 'h-11/12')}>
      <div className="flex flex-col">
        <Image src={'/assets/logo.png'} height={114} width={495} alt='Summarist' className='!p-4' />
        <div className="flex flex-col !mt-8">
          <SidebarLink page={page} text='For you' Icon={HouseIcon} />
          <SidebarLink page={page} text='My Library' Icon={BookmarkIcon} />
          <SidebarLink page={undefined} text='Highlights' Icon={PenIcon} />
          <SidebarLink page={undefined} text='Search' Icon={SearchIcon} />
          {page === 'player/:id' && (
            <div className="!py-4 bg-transparent text-black flex items-center justify-evenly">
              <Button onClick={() => dispatch(setUser({prefferedText: 'base'}))} className={cn(`text-base text-black shadow-none drop-shadow-none cursor-pointer border-b-4 border-b-transparent !px-1 bg-transparent outline-none  hover:bg-transparent`, fontSize === 'base' && 'border-b-green-400 !-pb-1')}>Aa</Button>
              <Button onClick={() => dispatch(setUser({prefferedText: 'lg'}))} className={cn(`text-lg text-black shadow-none drop-shadow-none cursor-pointer border-b-4 border-b-transparent !px-1 bg-transparent outline-none  hover:bg-transparent`, fontSize === 'lg' && 'border-b-green-400 !-pb-1')}>Aa</Button>
              <Button onClick={() => dispatch(setUser({prefferedText: 'xl'}))} className={cn(`text-xl text-black shadow-none drop-shadow-none cursor-pointer border-b-4 border-b-transparent !px-1 bg-transparent outline-none  hover:bg-transparent`, fontSize === 'xl' && 'border-b-green-400 !-pb-1')}>Aa</Button>
              <Button onClick={() => dispatch(setUser({prefferedText: '2xl'}))} className={cn(`text-2xl text-black shadow-none drop-shadow-none cursor-pointer border-b-4 border-b-transparent !px-1 bg-transparent outline-none  hover:bg-transparent`, fontSize === '2xl' && 'border-b-green-400 !-pb-1')}>Aa</Button>
            </div>
          )}
        </div>
      </div>
        <div className="flex flex-col !mb-4">
        <SidebarLink page={page} text='Settings' Icon={CogIcon} />
        <SidebarLink page={undefined} text='Help & Support' Icon={HelpCircleIcon} />
        {user ? 
        <SidebarLink page={page} text='Logout' Icon={LogOutIcon} /> :
        <SidebarLink page={page} text='Login' Icon={LogInIcon} />  
        }
        </div>
      
    </div>
  )
}

export default Sidebar