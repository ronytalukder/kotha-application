import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../slices/userSlice";
import { FaCloudUploadAlt, FaCommentDots, FaHome } from "react-icons/fa";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";

const Menu = () => {
  const [openNav, setOpenNav] = useState(false);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const storage = getStorage();
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [imagesUploadModal, setImagesUploadModal] = useState(false);

  const handleImageUpload = () => {
    setImagesUploadModal(true)
  };
  const handleImageUploadClose = () => {
    setImagesUploadModal(false)
    setImage('')
    setCropData('')
    setCropper('')
  };

  const handleProfileUpload = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };


  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());

      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
    
      });
    }
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="green"
        className="p-1 font-normal"
      >
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive
              ? "text-secondary-headding block border-t-2 pt-2 border-secondary-headding "
              : "text-primary-headding border-none"
          }
        >
          <Tooltip content="home" placement="bottom">
            <Button
              variant="outlined"
              className="border-none h-auto p-0 hover:opacity-100 focus:shadow-none"
            >
              <FaHome className="text-4xl"></FaHome>
            </Button>
          </Tooltip>
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="green"
        className="p-1 font-normal"
      >
        <NavLink
          to=""
          className={({ isActive }) =>
            isActive
              ? "text-secondary-headding block border-t-2 pt-2  border-secondary-headding "
              : "text-primary-headding border-none"
          }
        >
          <Tooltip content="Messesger" placement="bottom">
            <Button
              variant="outlined"
              className="border-none h-auto p-0 hover:opacity-100 focus:shadow-none"
            >
              <FaCommentDots className="text-4xl"></FaCommentDots>
            </Button>
          </Tooltip>
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to=""
          className={({ isActive }) =>
            isActive
              ? "text-secondary-headding block border-t-2 pt-2 border-secondary-headding "
              : "text-primary-headding border-none"
          }
        >
          <Tooltip content="Notification" placement="bottom">
            <Button
              variant="outlined"
              className="border-none h-auto p-0 hover:opacity-100 focus:shadow-none"
            >
              <IoMdNotifications className="text-4xl "></IoMdNotifications>
            </Button>
          </Tooltip>
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="green"
        className="p-1 font-normal"
      >
        <NavLink
          to=""
          className={({ isActive }) =>
            isActive
              ? "text-secondary-headding block border-t-2 pt-2 border-secondary-headding "
              : "text-primary-headding border-none"
          }
        >
          <Tooltip content="Settings" placement="bottom">
            <Button
              variant="outlined"
              className="border-none h-auto p-0 hover:opacity-100 focus:shadow-none"
            >
              <AiFillSetting className="text-4xl"></AiFillSetting>
            </Button>
          </Tooltip>
        </NavLink>
      </Typography>
      <Typography>
        <div className="group relative h-20 w-20 rounded-full overflow-hidden">
          <img src="images/profile.png" className="w-full" alt="" />
          <div
            onClick={handleImageUpload}
            className="absolute opacity-0 group-hover:opacity-100 left-0 top-0 h-full w-full rounded-full bg-blue-gray-900 bg-opacity-75 flex justify-center items-center"
          >
            <FaCloudUploadAlt className="text-white text-2xl"></FaCloudUploadAlt>
          </div>
        </div>
      </Typography>
    </ul>
  );

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(userLoginInfo(null));
        localStorage.removeItem("userInfo");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Navbar
      color="white"
      className=" rounded-none max-w-full py-2 px-4 lg:px-8 lg:py-4"
    >
      <div className="mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <Link to="/home">
            <span className="text-4xl font-bold text-primary-headding">
              Kotha
            </span>
          </Link>
        </Typography>
        <div className="flex items-center">
          <div className="hidden lg:block">{navList}</div>
          <Button
            onClick={handleLogOut}
            variant="gradient"
            color="green"
            size="sm"
            className="hidden  lg:inline-block ml-0 lg:ml-5"
          >
            <span>Log Out</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button
            onClick={handleLogOut}
            variant="gradient"
            color="amber"
            fullWidth
            className="mb-2"
          >
            <span>Log Out</span>
          </Button>
        </div>
      </MobileNav>
      {
        imagesUploadModal&& <div className="h-screen w-full absolute flex justify-center items-center left-0 top-0 bg-secondary-headding">
        <div className="w-2/5  p-7 bg-white rounded-lg ">

          <h2 className="capitalize font-nunito text-3xl mb-6 text-secondary-headding font-bold">
            upload your profile
          </h2>


          <input onChange={handleProfileUpload} type="file" />
          
           {
            image&&
            <Cropper
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
           }
          
          {
            image&&
            <>
            <div className="flex justify-between">
          <div>
            <h2 className="text-base font-bold text-primary-headding capitalize p-4">preview</h2>
          <div className=" overflow-hidden h-56 w-56">
            <div className="img-preview w-full h-full"></div>
          </div>
          </div>
          </div>

</>
          }
          
          <div className="flex mt-6">
            <Button
            onClick={handleImageUploadClose}
              className=" flex mr-5 justify-center gap-2 items-center font-nunito text-base font-medium capitalize relative"
              color="green"
              size="sm"
            >
              <p>Cancel</p>
            </Button>
            <Button
            onClick={getCropData}
              className=" flex justify-center gap-2 items-center font-nunito text-base font-medium capitalize relative"
              color="amber"
              size="sm"
            >
              <p>Upload</p>
            </Button>
            
          </div>
        </div>
      </div>
      }
     
    </Navbar>
  );
};

export default Menu;
// class 23 part 2 - 00 minutes theke dekhte hobe 