import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("password");
  const auth = getAuth();

  const shoPass = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrorPassword("");
  };
  const navigate = useNavigate()
  const handleLogin = () => {
      if (!email) {
        setErrorEmail("Email Is Required");
      }
      else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          setErrorEmail("Invalid Email");
        }
      
      
      if (!password) {
        setErrorPassword("Password Is Required");
      }
      if(email&&password){
        setLoading(true)
        signInWithEmailAndPassword(auth, email,password)
            .then((userCredential) => {
                toast.success("Log In Successfully.");
                setEmail('')
                setPassword('')
                setLoading(false)
                navigate('/home')
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode.includes('auth/user-not-found')){
                    setErrorEmail('This email not use')
                }
                else if(errorMessage.includes('auth/wrong-password')){
                    setErrorPassword('Wrong Password')
                }
                setLoading(false)
              });
        
      }
    console.log(email, password);
  };
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn=()=>{
    signInWithPopup(auth, provider)
    .then(()=>{
      navigate('/home')
    })
  }

  return (
    <div>
        <ToastContainer position="top-center" theme="colored" />
      <div className="flex p-2 lg:p-0 h-auto lg:h-screen  lg:flex-row flex-col-reverse items-center">
        <div className="w-full lg:w-2/4 flex  lg:justify-end">
        <div className="w-full lg:w-2/4">
            <h2 className="text-3xl mb-10 text-center font-bold font-nunito text-primary-headding">
              Login to your account!
            </h2>

            <div>
              <div className="flex flex-col gap-5">
                <Input
                  color="green"
                  onChange={handleEmail}
                  size="lg"
                  label="Your Email"
                  type="email"
                  value={email}
                />
                {errorEmail && (
                  <p className="text-sm font-normal text-red font-nunito mt-[-18px] mb-[-8px]">
                    {" "}
                    {errorEmail}{" "}
                  </p>
                )}
                <div className="relative">
                  <Input
                    color="green"
                    onChange={handlePassword}
                    size="lg"
                    label="Password"
                    type={type}
                    value={password}
                  />
                  <p
                    onClick={shoPass}
                    className="absolute cursor-pointer right-8 top-[50%] translate-y-[-50%]"
                  >
                    {" "}
                    {type === "password" ? <FaEyeSlash /> : <FaEye />}{" "}
                  </p>
                </div>
                {errorPassword && (
                  <p className="text-sm font-normal text-red font-nunito mt-[-18px] mb-[-8px]">
                    {" "}
                    {errorPassword}{" "}
                  </p>
                )}
                <Button
                  onClick={handleLogin}
                  className="font-nunito text-base font-medium capitalize relative"
                  fullWidth
                  color="green"
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <ThreeDots
                        height="40"
                        width="40"
                        radius="9"
                        color="#fff"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    </div>
                  ) : (
                    "Log In"
                  )}
                </Button>
                <Button
                  onClick={handleGoogleSignIn}
                  className=" flex justify-center gap-2 items-center font-nunito text-base font-medium capitalize relative"
                  fullWidth
                  color="amber"
                            
                > 
                     <FaGoogle></FaGoogle>
                    <p>Login with Google</p>
                  
                </Button>
                <p className="text-base font-medium text-center text-secondary-headding font-nunito">
                  <Link to="/forgotPassword" className="text-primary-headding">
                  Forgotten password?
                  </Link>
                </p>
                <p className="text-base font-medium text-center text-secondary-headding font-nunito mb-10">
                  Don’t have an account ?{" "}
                  <Link to="/signup" className="text-primary-headding">
                    Sign Up
                  </Link>
                </p>
                
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/4">
          <div>
            <h1 className="text-6xl  text-center font-bold font-nunito text-pera mb-5">
              Kotha
            </h1>
            <p className="text-xl hidden md:block font-medium text-center text-secondary-headding font-nunito mb-2 lg:mb-10">
              Talk will now be on{" "}
              <span className="text-primary-headding">Kotha App</span>
            </p>
          </div>
          <div className="hidden md:block w-2/4 m-auto">
            <img src="images/Login-1.png" className="w-full" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// video class 20 part 3 58 minutes  theke dekhte hobe