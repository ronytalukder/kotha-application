import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const auth = getAuth();
    const navigate = useNavigate()



    const handleForgotPassword =()=>{
        if(email===''){
            toast.error('Please enter your email')
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('Check your email for password reset')
                setTimeout(()=>{
                    navigate('/login')
                },2000)
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode)
              if(errorCode.includes('auth/user-not-found')){
                  toast.error('Email is not found')
              }
    
              // ..
            });
        }
        
    }

    const backToLogin=()=>{
        navigate('/login')
    }

  return (
    <div className="bg-secondary-headding bg-opacity-20 h-screen flex justify-center items-center">
        <ToastContainer position="top-center" theme="colored" />
      <Card className="w-[400px]">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-20 place-items-center"
        >
          <Typography variant="h4" className='font-nunito text-2xl font-semibold' color="white">
            Please enter your email
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input value={email} onChange={(e)=>setEmail(e.target.value)} label="Email" size="lg" />
        </CardBody>
        <CardFooter className="pt-0 flex gap-2">
            <Button onClick={backToLogin}  variant="gradient" color="amber" fullWidth className='font-nunito text-sm font-semibold'>
                cancel
            </Button>
            <Button onClick={handleForgotPassword} variant="gradient" fullWidth className='font-nunito text-sm font-semibold'>
              Send
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
