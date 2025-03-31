"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BiLogoGoogle } from "react-icons/bi";
import { 
    createUserWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxTSAdapter";
import { setUser } from "@/lib/redux/userSlice";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import { closeSignupModal, openLoginModal, openSignupModal } from "@/lib/redux/modalSlice";
import { TriangleAlertIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SignupModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const isOpen = useAppSelector((state) => state.modals.signupModalOpen)
  const dispatch = useAppDispatch();

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDocRef = doc(db, "userData", userCredential.user.uid);
      await setDoc(userDocRef, {
        userId: userCredential.user.uid,
        email: email,
        library: [],
        finished: [],
        createdAt: new Date().toISOString(),
        isSubscribed: false
      }); 

      dispatch(
        setUser({
          email: email,
          uid: userCredential.user.uid,
          library: [],
          finished: [],
          userDocRef,
          isSubscribed: undefined
        })
      );

      dispatch(closeSignupModal());
      router.push("/for-you");
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already registered. Please login instead.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else {
        setError('Failed to create account. Please try again.');
      }
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSwap = () => {
    setError('')
    dispatch(closeSignupModal())
    dispatch(openLoginModal())
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (isOpen) {
            dispatch(closeSignupModal())
        } else {
            dispatch(openSignupModal())
        }
      }}
    >
      <DialogContent className={cn('sm:max-w-[500px] sm:min-h-[500px] h-fit flex flex-col items-center overflow-y-hidden justify-center gap-y-8 pt-8',
        error !== '' && 'sm:min-h-[560px]'
      )}>
        <DialogHeader className="flex items-center mt-8 justify-center p-4">
          <DialogTitle className="text-2xl">Create your account</DialogTitle>
        </DialogHeader>
        <div className='w-[90%] items-center justify-center flex flex-col gap-y-4'>
          <Button 
            className='bg-blue-500 flex items-center justify-center text-lg w-full h-12 relative hover:bg-blue-400'
          >
            <BiLogoGoogle className='!w-10 !h-10 absolute top-1/2 left-2 -translate-y-1/2 ' />
            <h1>Sign up with Google</h1>
          </Button>
          <div className='w-full h-8 items-center justify-center relative'>
            <div className='absolute bg-gray-300 left-0 top-1/2 -translate-y-1/2 h-1 w-[40%]' />
            <p className="text-center font-bold text-lg">or</p>
            <div className='absolute bg-gray-300 right-0 top-1/2 -translate-y-1/2 h-1 w-[40%]' />
          </div>
          
          {error && (
            <div className="bg-red-500/30 border-red-500 h-12 border-2 text-red-600 rounded-md flex items-center justify-center text-sm w-full text-center relative">
                <TriangleAlertIcon className="absolute left-2 top-1/2 -translate-y-1/2 !h-10 !w-10" />
              {error}
            </div>
          )}
          
          <Input
            type='email'
            placeholder='Email Address'
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="h-12 text-xl placeholder:text-lg w-full !px-4 [&:not(:placeholder-shown)]:text-xl"
          />
          <Input
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="h-12 text-xl placeholder:text-lg w-full !px-4 [&:not(:placeholder-shown)]:text-xl"
          />
          <Button
            onClick={handleSignup}
            className='bg-green-500 flex items-center justify-center w-full h-12 text-xl hover:bg-green-700'
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </div>
        <DialogFooter onClick={handleLoginSwap} className="bg-neutral-300 w-full h-14 flex items-center !justify-center translate-y-7.5 text-blue-500 hover:text-blue-700 hover:cursor-pointer">
          Already have an account? Login instead
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;