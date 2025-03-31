'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxTSAdapter'
import { cn } from '@/lib/utils'
import { AlertTriangleIcon, CircleDotIcon, CircleIcon, FileTextIcon, HandshakeIcon, SproutIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { auth } from '../../../firebase'
import { useRouter, useSearchParams } from 'next/navigation'
import { openLoginModal } from '@/lib/redux/modalSlice'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const Page = () => {
    const [planSelected, setPlanSelected] = useState<'monthly' | 'annual'>('annual')
    const dispatch = useAppDispatch();
    const isSubscribed = useAppSelector((state) => state.user.isSubscribed)
    const user = auth.currentUser;
    const router = useRouter();
    const params = useSearchParams();
    const [processing, setProcessing] = useState(false);

    if (params.toString().includes('cancelled')) {
        setProcessing(false);
    }

    if (isSubscribed) {
        router.push('/for-you');
    }

    const handleClick = () => {
        dispatch(openLoginModal());
        return;
    }

    return (
        <div className='min-h-screen w-full relative flex flex-col'>
            <div className="w-full relative">
                {/* Hero section - maintaining !-mt-[65vw] !pt-[62vw] for desktop */}
                <div className='min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] w-full 
                    bg-slate-800 text-white 
                    rounded-b-[15%] sm:rounded-b-[20%] md:rounded-b-[25%] lg:rounded-b-[30%] 
                    relative z-20 
                    flex flex-col items-center justify-center
                    !-mt-[30vw] sm:!-mt-[40vw] md:!-mt-[50vw] lg:!-mt-[65vw]
                    !pt-[28vw] sm:!pt-[38vw] md:!pt-[48vw] lg:!pt-[62vw]'>
                    
                    <div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] 
                        flex items-center justify-center flex-col 
                        !gap-y-4 sm:!gap-y-6 md:!gap-y-8 
                        relative z-30'>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center'>
                            Get unlimited access to many amazing books to read
                        </h1>
                        <h2 className='text-lg sm:text-xl md:text-2xl text-center'>
                            Turn ordinary moments into amazing learning opportunities
                        </h2>
                    </div>

                    <div className="h-2/5 w-[40%] sm:w-[30%] md:w-[25%] lg:w-[20%] 
                        bg-transparent rounded-t-full 
                        !-mb-8 sm:!-mb-12 md:!-mb-16 
                        items-center justify-center relative z-20">
                        <Image 
                            src={'/assets/pricing-top.png'} 
                            alt='' 
                            height={722} 
                            width={860} 
                            className='object-contain rounded-t-full' 
                        />
                    </div>
                </div>

                {/* Features section */}
                <div className="w-full !mt-8 
                    flex flex-col sm:flex-row 
                    justify-center items-center 
                    relative z-30 
                    !gap-y-6 sm:!gap-x-8">
                    <div className='flex flex-col items-center text-center w-60'>
                        <FileTextIcon fill='#1D293D' className='text-white !w-12 sm:!w-16 h-12 sm:h-16' />
                        <span>
                            <b>Key ideas in few min</b> with many books to read.
                        </span>
                    </div>
                    <div className='flex flex-col items-center text-center w-60'>
                        <SproutIcon className='!w-12 sm:!w-16 h-12 sm:h-16' />
                        <span>
                            <b>3 million</b> people growing with Summarist every day
                        </span>
                    </div>
                    <div className='flex flex-col items-center text-center w-60'>
                        <HandshakeIcon className='!w-12 sm:!w-16 h-12 sm:h-16' />
                        <span>
                            <b>Precise recommendations</b>
                            <p>collections curated by experts</p>
                        </span>
                    </div>
                </div>

                {/* Plans section */}
                <div className="flex flex-col items-center !gap-y-8 justify-center relative">
                    <h1 className="text-xl sm:text-2xl md:text-3xl !mt-8">
                        Choose the plan that fits you
                    </h1>

                    {/* Annual plan */}
                    <div 
                        onClick={() => setPlanSelected('annual')} 
                        className={cn('w-[90%] sm:w-[70%] md:w-[60%] lg:w-1/2 h-auto sm:h-40 border-4 cursor-pointer border-gray-500 rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-start !p-4 sm:!p-6 !gap-4 sm:!gap-x-8',
                            planSelected === 'annual' && 'border-green-500'
                        )}>
                        <div className="w-fit">
                            {planSelected === 'annual' ? (
                                <CircleDotIcon className='h-6 w-6 sm:h-8 sm:w-8' />
                            ) : (
                                <CircleIcon className='h-6 w-6 sm:h-8 sm:w-8' />
                            )}
                        </div>
                        <div className="flex-1">
                            <h1 className='font-bold text-lg sm:text-xl'>Premium Plus</h1>
                            <h1 className='font-bold text-xl sm:text-2xl md:text-3xl'>
                                $99.99 <span className='text-sm font-normal text-gray-500'>(billed annually)</span>
                            </h1>
                            <p className='underline decoration-green-500'>7-day free trial included</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex relative items-center justify-center w-[90%] sm:w-[70%] md:w-[60%] lg:w-1/2">
                        <div className="absolute left-0 top-1/2 -translate-y-[50%] h-0.5 w-[40%] bg-gray-400/50 rounded-full z-50" />
                        <p>or</p>
                        <div className="absolute right-0 top-1/2 -translate-y-[50%] h-0.5 w-[40%] bg-gray-400/50 rounded-full z-50" />
                    </div>

                    {/* Monthly plan */}
                    <div 
                        onClick={() => setPlanSelected('monthly')} 
                        className={cn('w-[90%] sm:w-[70%] md:w-[60%] lg:w-1/2 h-auto sm:h-40 border-4 cursor-pointer border-gray-500 rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-start !p-4 sm:!p-6 !gap-4 sm:!gap-x-8',
                            planSelected === 'monthly' && 'border-green-500'
                        )}>
                        <div className="w-fit">
                            {planSelected === 'monthly' ? (
                                <CircleDotIcon className='h-6 w-6 sm:h-8 sm:w-8' />
                            ) : (
                                <CircleIcon className='h-6 w-6 sm:h-8 sm:w-8' />
                            )}
                        </div>
                        <div className="flex-1">
                            <h1 className='font-bold text-lg sm:text-xl'>Premium</h1>
                            <h1 className='font-bold text-xl sm:text-2xl md:text-3xl'>
                                $9.99 <span className='text-sm font-normal text-gray-500'>(billed monthly)</span>
                            </h1>
                            <p className='underline decoration-red-500'>Free trial NOT included</p>
                        </div>
                    </div>
                </div>

                {/* Alert */}
                {params.toString().includes('cancelled') && (
                    <Alert className='w-[90%] sm:w-[70%] md:w-[60%] lg:w-1/2 mx-auto 
                        border-red-500 text-red-700 bg-red-400/20 
                        !mt-8 !pl-8 
                        flex flex-col relative'>
                        <AlertTriangleIcon className='min-h-8 min-w-8 absolute top-1 left-8' />
                        <AlertTitle>Order Cancelled</AlertTitle>
                        <AlertDescription className='text-red-700'>
                            Continue shopping and return here when you&apos;re ready to purchase.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Action button */}
                <form 
                    action={(user ? `/api/checkout_sessions/${planSelected}` : handleClick)} 
                    method='POST' 
                    className="sticky bottom-0 left-0 
                        h-auto sm:h-40 w-full 
                        bg-white z-50 
                        flex flex-col items-center justify-center 
                        !py-4 sm:!py-6">
                    <Button 
                        type='submit' 
                        disabled={processing} 
                        className='w-[90%] sm:w-[70%] md:w-[60%] lg:w-1/3 
                            !py-2 
                            text-lg sm:text-xl 
                            bg-green-500 hover:bg-green-600 cursor-pointer'>
                        {planSelected === "annual" ? "Start your 7-day free trial" : "Start your first month"}
                    </Button>
                    <p className="text-sm text-gray-500 !pt-4 text-center !px-4">
                        {planSelected === 'annual' 
                            ? "Cancel your trial at any time before it ends and you won't be charged" 
                            : "30-day money back guarantee; No questions asked."}
                    </p>
                </form>

                {/* FAQ Accordion */}
                <div className="w-full flex flex-col items-center justify-center !pb-12">
                    <Accordion type='single' collapsible className='w-[90%] sm:w-[70%] md:w-[60%] lg:w-1/2'>
                   
            <AccordionItem value='item-1' className='w-full !py-4'>
                <AccordionTrigger className='cursor-pointer'>
                    <h1 className='text-2xl font-bold'>{"How does the 7-day free trial work?"}</h1>
                </AccordionTrigger>    
                <AccordionContent>
                    <p className='text-lg !px-3 w-[90%] !pt-2'>{"Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial."}</p>
                </AccordionContent>
            </AccordionItem>        
            <AccordionItem value='item-2'  className='w-full !py-4'>
                <AccordionTrigger className='cursor-pointer'>
                    <h1 className='text-2xl font-bold'>{"Can I switch subscriptions from monthly to yearly, or yearly to monthly?"}</h1>
                </AccordionTrigger>    
                <AccordionContent>
                    <p className='text-lg !px-3 w-[90%] !pt-2'>{"While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."}</p>
                </AccordionContent>
            </AccordionItem>        
            <AccordionItem value='item-3'  className='w-full !py-4'>
                <AccordionTrigger className='cursor-pointer'>
                    <h1 className='text-2xl font-bold'>{"What's included in the Premium plan?"}</h1>
                </AccordionTrigger>    
                <AccordionContent>
                    <p className='text-lg !px-3 w-[90%] !pt-2'>{"Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle."}</p>
                </AccordionContent>
            </AccordionItem>        
            <AccordionItem value='item-4'  className='w-full !py-4'>
                <AccordionTrigger className='cursor-pointer'>
                    <h1 className='text-2xl font-bold'>{"Can I cancel during my trial or subscription?"}</h1>
                </AccordionTrigger>    
                <AccordionContent>
                    <p className='text-lg !px-3 w-[90%] !pt-2'>{"You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day."}</p>
                </AccordionContent>
            </AccordionItem>        
        </Accordion>
        <div className="flex flex-col items-center justify-center w-full h-80 !mt-14 bg-neutral-300 !px-12">
                <div className="flex items-center justify-evenly w-full">
                 <div className="flex flex-col gap-y-2">
                    <h1 className="text-xl font-bold">Actions</h1>
                    <Link href={'/'} className='cursor-not-allowed'>Summarist Magazine</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Cancel Subscription</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Help</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Contact Us</Link>
                </div>
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-xl font-bold">Useful Links</h1>
                    <Link href={'/'} className='cursor-not-allowed'>Pricing</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Summarist Business</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Gift Cards</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Authors & Publishers</Link>
                </div>
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-xl font-bold">Company</h1>
                    <Link href={'/'} className='cursor-not-allowed'>About</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Careers</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Partners</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Code of Conduct</Link>
                </div>
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-xl font-bold">Other</h1>
                    <Link href={'/'} className='cursor-not-allowed'>Sitemap</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Legal Notice</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Terms of Service</Link>
                    <Link href={'/'} className='cursor-not-allowed'>Privacy Policies</Link>
                </div>
                </div>
                <h1 className='!pt-10 font-bold text-base'>Copyright &copy; 2025 Summarist.</h1>
        </div>        
        </div>        
    </div>
    </div>
  )
}

export default Page