import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots, Watch } from "react-loader-spinner";
import { getDatabase, ref, set } from "firebase/database";


import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const db = getDatabase();

  const auth = getAuth();
  const [type, setType] = useState("password");

  const shoPass = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFullName = (e) => {
    setFullName(e.target.value);
    setErrorName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrorPassword("");
  };

  const handleSubmit = () => {
    if (!fullName) {
      setErrorName("Full Name Is Required");
    }
    if (!email) {
      setErrorEmail("Email Is Required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setErrorEmail("Invalid Email");
      }
    }
    if (!password) {
      setErrorPassword("Password Is Required");
    }

    // else{
    //     if(!/^(?=.*[a-z])/.test(password)){
    //         setErrorPassword('Lowercase Required')
    //     }
    //    else if(!/^(?=.*[A-Z])/.test(password)){
    //         setErrorPassword('Uppercase Required')
    //     }
    // }

    if (
      fullName &&
      email &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: "images/default-profile.png",
          })
            .then(() => {
              toast.success(
                "Registraion Successfull. Please verify your email"
              );
              console.log('update lksjdflshdl',user )
              setFullName("");
              setEmail("");
              setPassword("");
              sendEmailVerification(auth.currentUser).then(() => {
                setLoading(false);
                navigate("/login");
              });
            }).then(()=>{
              set(ref(db, 'users/' + user.user.uid), {
                username: user.user.displayName,
                email: user.user.email
              });
            
            })
            .catch((error) => {
              console.log(error)
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setErrorEmail("This email already in use");
            setLoading(false);
          }
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  return (
    <div className="flex p-2 lg:p-0 h-auto lg:h-screen  lg:flex-row flex-col-reverse items-center">
      <ToastContainer position="top-center" theme="colored" />
      <div className="w-full lg:w-2/4 flex  lg:justify-end">
        <div className="w-full lg:w-2/4">
          <h2 className="text-lg lg:text-3xl text-center font-bold font-nunito text-primary-headding">
            Get started with easily register
          </h2>

          <p className="text-xl font-medium text-center text-secondary-headding mt-3 mb-10">
            Free register and you can enjoy it
          </p>

          <div>
            <div className="flex flex-col gap-5">
              <Input
                color="green"
                onChange={handleFullName}
                size="lg"
                label="Full Name"
                type="text"
                value={fullName}
              />
              {errorName && (
                <p className="text-sm font-normal text-red font-nunito mt-[-18px] mb-[-8px]">
                  {" "}
                  {errorName}{" "}
                </p>
              )}
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
                onClick={handleSubmit}
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
                  "Sign Up"
                )}
              </Button>
              <p className="text-base font-medium text-center text-secondary-headding font-nunito mb-10">
                Already have an account ?{" "}
                <Link to="/login" className="text-primary-headding">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/4 flex lg:items-center ">
        <div>
          <h1 className="text-6xl mb-5  text-center font-bold font-nunito text-primary-headding">
            Kotha
          </h1>
          <p className="text-xl hidden md:block font-medium text-center text-secondary-headding font-nunito mb-2 lg:mb-10">
            Talk will now be on{" "}
            <span className="text-primary-headding">Kotha App</span>
          </p>
          <img src="images/registraion-10.jpg" className="scale-75" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
