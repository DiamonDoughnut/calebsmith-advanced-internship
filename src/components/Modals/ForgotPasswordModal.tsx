"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxTSAdapter";
import { closeForgotPasswordModal, openForgotPasswordModal, openLoginModal } from "@/lib/redux/modalSlice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MailCheckIcon, TriangleAlertIcon } from "lucide-react";
import { FirebaseError } from "firebase/app";
import { cn } from "@/lib/utils";


const ForgotPasswordModal = () => {

    const isOpen = useAppSelector((state) => state.modals.forgotPasswordModalOpen)
    const [email, setEmail] = useState('')
    const [error, setError] = useState<unknown>()
    const [status, setStatus] = useState<null | 'sent' | 'error'>(null)

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        
        sendPasswordResetEmail(auth, email).then(() => setStatus('sent')).catch((e) => {setStatus('error');setError(() => {
            if (e.message === 'Firebase: Error (auth/missing-email).') {
                setError({message: "Please enter an Email Address"})
            } else {
                setError({message: e.message})
            }
        })})
    }

    const handleLoginSwap = () => {
        setError(null)
        setStatus(null)
        dispatch(openLoginModal())
        dispatch(closeForgotPasswordModal())
    }

  return (
    <Dialog
        open={isOpen}
        onOpenChange={() => {
            if (isOpen) {
                dispatch(closeForgotPasswordModal())
            } else {
                dispatch(openForgotPasswordModal())
            }
        }}
        modal
    >
        <DialogContent className={cn('sm:max-w-[500px] sm:min-h-[300px] sm:h-fit h-full w-full flex flex-col items-center overflow-y-hidden justify-center gap-y-8 pt-8',
            status !== null && "sm:min-h-[360px]"
        )}>
            <DialogHeader className="flex items-center mt-8 justify-center p-4">
                <DialogTitle className="text-2xl">Reset your password</DialogTitle>
            </DialogHeader>
            <div className="w-[90%] items-center justify-center flex flex-col gap-y-4">
                {status === 'error' && (
                    <div className="h-12 w-full flex justify-center items-center relative bg-red-500/30 border-2 border-red-500 text-red-600 rounded-md">
                    <TriangleAlertIcon className="absolute top-1/2 left-2 -translate-y-1/2 h-10 w-10" />
                    <p>{error?.message || 'An error occured, please try again later'}</p>
                    </div>
                )}
                {status === "sent" && (
                    <div className="h-12 w-full flex flex-col justify-center items-center relative bg-green-600/30 border-2 border-green-500 text-green-900 rounded-md">
                        <MailCheckIcon className="absolute top-1/2 left-2 -translate-y-1/2 h-10 w-10" />
                        <p>Password reset Email sent!</p>
                        <p className="text-sm text-black">(Email may take up to 15 minutes to arrive)</p>
                    </div>
                )}
                <Input 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    type="email"
                    className="h-12 text-xl placeholder:text-lg w-full !px-4 [&:not(:placeholder-shown)]:text-xl"
                />
                <Button
                    className="h-12 text-xl w-full bg-green-500 hover:bg-green-600"
                    onClick={() => handleSubmit()}
                >
                    Send reset password link
                </Button>
            </div>
            <DialogFooter onClick={handleLoginSwap} className="bg-neutral-300 w-full h-12 flex items-center !justify-center translate-y-6 hover:cursor-pointer text-blue-600 hover:text-blue-500">
                Return to Login
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default ForgotPasswordModal