"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TriangleAlertIcon, UserIcon } from "lucide-react";
import { BiLogoGoogle } from "react-icons/bi";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  AuthError,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxTSAdapter";
import { setUser, signOutUser } from "@/lib/redux/userSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  closeLoginModal,
  openForgotPasswordModal,
  openLoginModal,
  openSignupModal,
} from "@/lib/redux/modalSlice";
import { cn } from "@/lib/utils";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = useAppSelector((state) => state.modals.loginModalOpen);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      setError(null);
      setIsLoading(true);

      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      await signInWithEmailAndPassword(auth, email, password);
      dispatch(closeLoginModal());
      router.push("/for-you");
    } catch (err) {
      const error = err as AuthError;
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/user-disabled":
          setError("This account has been disabled");
          break;
        case "auth/user-not-found":
          setError("No account found with this email");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        default:
          setError("Failed to log in. Please try again.");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const guestEmail = process.env.NEXT_PUBLIC_GUEST_EMAIL;
      const guestPassword = process.env.NEXT_PUBLIC_GUEST_PASSWORD;

      if (
        !guestEmail ||
        !guestPassword
      ) {
        throw new Error("Guest login credentials not configured");
      }

      await signInWithEmailAndPassword(
        auth,
        guestEmail,
        guestPassword
      );
      dispatch(closeLoginModal());
      router.push("/for-you");
    } catch (err) {
      setError("Guest login failed. Please try again.");
      console.error("Guest login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    try {
      dispatch(closeLoginModal());
      dispatch(openForgotPasswordModal());
    } catch (err) {
      console.error("Error switching to forgot password:", err);
    }
  };

  const handleSignupSwap = () => {
    try {
      dispatch(closeLoginModal());
      dispatch(openSignupModal());
    } catch (err) {
      console.error("Error switching to signup:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        // Clear user state when logged out
        dispatch(signOutUser());
        return;
      }
  
      try {
        // First set basic user info
        dispatch(
          setUser({
            email: currentUser.email,
            uid: currentUser.uid,
          })
        );
  
        // Then try to fetch additional user data
        const userDataRef = collection(db, "userData");
        const q = query(userDataRef, where("userId", "==", currentUser.uid));
        
        try {
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            dispatch(
              setUser({
                email: currentUser.email,
                uid: currentUser.uid,
                library: userDoc.library || [], // Provide defaults
                finished: userDoc.finished || [],
                userDocRef: userDoc.userDocRef || userDoc,
                isSubscribed: userDoc.isSubscribed || false,
              })
            );
          } else {
            // Handle case where user document doesn't exist
            console.log("No user data found, using defaults");
            dispatch(
              setUser({
                email: currentUser.email,
                uid: currentUser.uid,
                library: [],
                finished: [],
                isSubscribed: undefined
              })
            );
          }
        } catch (firestoreErr) {
          console.error("Firestore error:", firestoreErr);
          // Still keep the user logged in with basic info even if Firestore fails
          dispatch(
            setUser({
              email: currentUser.email,
              uid: currentUser.uid,
              library: [],
              finished: [],
            })
          );
        }
      } catch (err) {
        console.error("Error in auth state change:", err);
        // Handle error appropriately - maybe show a notification
        // but don't prevent the login
      }
    });
  
    // Cleanup subscription
    return () => {
      try {
        unsubscribe();
      } catch (err) {
        console.error("Error unsubscribing:", err);
      }
    };
  }, [dispatch]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (isOpen) {
          dispatch(closeLoginModal());
        } else {
          dispatch(openLoginModal());
        }
      }}
      modal
    >
      <DialogContent className={cn('sm:max-w-[500px] sm:min-h-[600px] sm:h-fit h-full w-full flex flex-col items-center overflow-y-hidden justify-center gap-y-8 pt-8',
        error && 'sm:min-h-[680px]'
      )}>
        <DialogHeader className='flex items-center mt-8 justify-center p-4'>
          <DialogTitle className='text-2xl'>Log in to Summarist</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="h-12 w-full flex justify-center items-center relative bg-red-500/30 border-2 border-red-500 text-red-600 rounded-md">
          <TriangleAlertIcon className="absolute top-1/2 left-2 -translate-y-1/2 h-10 w-10" />
          <p>{error}</p>
          </div>
        )}

        <div className='w-[90%] items-center justify-center flex flex-col gap-y-4'>
          <Button
            onClick={handleGuestLogin}
            disabled={isLoading}
            className='bg-blue-950 flex items-center justify-center text-lg w-full h-12 relative hover:bg-blue-900 disabled:opacity-50'
          >
            <UserIcon className='!h-10 !w-10 text-gray-300 absolute top-1/2 left-2 -translate-y-1/2' />
            <h1>{isLoading ? "Logging in..." : "Login as a Guest"}</h1>
          </Button>

          <div className='w-full h-8 items-center justify-center relative'>
            <div className='absolute bg-gray-300 left-0 top-1/2 -translate-y-1/2 h-1 w-[40%]' />
            <p className='text-center font-bold text-lg'>or</p>
            <div className='absolute bg-gray-300 right-0 top-1/2 -translate-y-1/2 h-1 w-[40%]' />
          </div>
          <Button className='bg-blue-500 flex items-center justify-center w-full h-12 relative hover:bg-blue-400'>
            <BiLogoGoogle className='!w-10 !h-10 absolute top-1/2 left-2 -translate-y-1/2 ' />
            <h1>Login with Google</h1>
          </Button>
          <div className='w-full h-8 items-center justify-center relative'>
            <div className='absolute bg-gray-300 left-0 top-1/2 -translate-y-1/2 h-1 w-[40%]' />
            <p className='text-center font-bold text-lg'>or</p>
            <div className='absolute bg-gray-300 right-0 top-1/2 -translate-y-1/2 h-1 w-[40%]' />
          </div>

          <Input
            type='email'
            placeholder='Email Address'
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className='h-12 text-xl placeholder:text-lg w-full !px-4 [&:not(:placeholder-shown)]:text-xl'
          />
          <Input
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className='h-12 text-xl placeholder:text-lg w-full !px-4 [&:not(:placeholder-shown)]:text-xl'
          />
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className='bg-green-500 flex items-center justify-center w-full h-12 text-xl hover:bg-green-700 disabled:opacity-50'
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <button
            onClick={handleForgotPassword}
            disabled={isLoading}
            className='translate-y-3 hover:cursor-pointer text-blue-600 hover:text-blue-500 disabled:opacity-50'
          >
            Forgot Password?
          </button>
        </div>

        <DialogFooter
          onClick={handleSignupSwap}
          className='bg-neutral-300 w-full h-12 flex items-center !justify-center translate-y-2 hover:cursor-pointer text-blue-600 hover:text-blue-500'
        >
          Don&apos;t have an account?
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
