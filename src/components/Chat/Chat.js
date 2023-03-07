import React, { useEffect, useState } from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import profile from "../../images/profile.png";
import img from "../../images/registraion-1.png";
import ModalImage from "react-modal-image";
import { FaPaperPlane, FaFileImage } from "react-icons/fa";
import { ImCamera } from "react-icons/im";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useSelector } from "react-redux";
import { activeChat } from "../../slices/activeChatSlice";

const Chat = () => {
  const [check, setCheck] = useState(false);
  const [captureImg, setCaptureImg] = useState("");
  const [messege, setMessege] = useState("");
  const [groupMessegeList, setGroupMessegeList] = useState("");
  const [messegeError, setMessegeErro] = useState("");
  const [messegeList, setMessegeList] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);

  const db = getDatabase();
  const storage = getStorage();

  const activeChatName = useSelector((state) => state.activeChat);
  console.log(activeChatName);

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
    setCaptureImg(dataUri);
  }

  const handleMassege = (e) => {
    setMessege(e.target.value);
    setMessegeErro("");
  };

  useEffect(() => {
    const singleRef = ref(db, "singleMessege");
    onValue(singleRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().wheSendId === data.uid &&
            item.val().whoReceveId === activeChatName.active.id) ||
          (item.val().whoReceveId === data.uid &&
            item.val().wheSendId === activeChatName.active.id)
        ) {
          arr.push(item.val());
        }
      });
      setMessegeList(arr);
    });
  }, [activeChatName.active.id]);

  // group messege
  useEffect(() => {
    const singleRef = ref(db, "groupMessege");
    onValue(singleRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setGroupMessegeList(arr);
    });
  }, []);
  
  useEffect(() => {
    const singleRef = ref(db, "groupmembers");
    onValue(singleRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().groupId+ item.val().userId);
      });
      setGroupMemberList(arr);
    });
  }, []);

  const handleMessageSend = () => {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;

    if (!messege) {
      setMessegeErro("Send Something...");
    } else {
      if (activeChatName.active.status === "single") {
        set(push(ref(db, "singleMessege")), {
          wheSendId: data.uid,
          whoSendName: data.displayName,
          whoReceveId: activeChatName.active.id,
          whoReceveName: activeChatName?.active?.name,
          messege: messege,
          date: `${strTime}`,
        }).then(() => {
          setMessege("");
        });
      } else {
        console.log(" group theke bolchi");
        set(push(ref(db, "groupMessege")), {
          wheSendId: data.uid,
          whoSendName: data.displayName,
          whoReceveId: activeChatName.active.id,
          whoReceveName: activeChatName?.active?.name,
          adminId: activeChatName?.active?.adminId,
          messege: messege,
          date: `${strTime}`,
        }).then(() => {
          setMessege("");
        });
      }
    }
  };

  const handleImgeUpload = (e) => {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;

    console.log(e.target.files[0]);
    const storageRef = sref(storage, e.target.files[0]?.name);

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          set(push(ref(db, "singleMessege")), {
            wheSendId: data.uid,
            whoSendName: data.displayName,
            whoReceveId: activeChatName.active.id,
            whoReceveName: activeChatName?.active?.name,
            img: downloadURL,
            date: `${strTime}`,
          });
        });
      }
    );
  };

  return (
    <div>
      <div className="px-9">
        <div className="flex  items-center border-b border-b-secondary-headding  pb-2 mb-5">
          <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
            <img src={profile} alt="" />
          </div>
          <div>
            <h3 className="text-base text-black font-bold font-nunito ">
              {activeChatName && activeChatName.active?.name}
            </h3>
            <p className="text-sm">Online</p>
          </div>
        </div>
      </div>

      <div className="h-[400px]  px-9 overflow-y-scroll overflow-hidden">
        {activeChatName.active?.status === "single"
          ? messegeList.map((item) =>
              item.wheSendId === data.uid ? (
                item.messege ? (
                  <div className="mb-5 text-right">
                    <div className="inline-block bg-secondary-headding relative py-2 px-8 rounded-md">
                      <p className="text-white"> {item.messege}</p>
                      <BsFillTriangleFill className="absolute bottom-[-1px] right-[-6px] text-secondary-headding rotate-[3deg]"></BsFillTriangleFill>
                    </div>
                    <p className="text-sm mt-1">{item.date}</p>
                  </div>
                ) : (
                  <div className="mb-5 text-right">
                    <div className="inline-block bg-secondary-headding relative p-2 w-64 rounded-md">
                      <ModalImage
                        className="bg-white"
                        small={item.img}
                        large={item.img}
                      />
                      <BsFillTriangleFill className="absolute bottom-[-1px] right-[-6px] text-secondary-headding rotate-[3deg]"></BsFillTriangleFill>
                    </div>
                    <p className="text-sm mt-1">{item.date}</p>
                  </div>
                )
              ) : item.messege ? (
                <div className="mb-5">
                  <div className="inline-block bg-gray-300 relative py-2 px-8 rounded-md">
                    <p className="text-black"> {item.messege} </p>
                    <BsFillTriangleFill className="absolute bottom-[-1px] left-[-6px] text-gray-300 rotate-[3deg]"></BsFillTriangleFill>
                  </div>
                  <p className="text-sm mt-1">{item.date}</p>
                </div>
              ) : (
                <div className="mb-5">
                  <div className="inline-block bg-gray-300 relative p-2 w-64  rounded-md">
                    <ModalImage
                      className="bg-white"
                      small={item.img}
                      large={item.img}
                    />

                    <BsFillTriangleFill className="absolute bottom-[-1px] left-[-6px] text-gray-300 rotate-[3deg]"></BsFillTriangleFill>
                  </div>
                  <p className="text-sm mt-1">{item.date}</p>
                </div>
              )
            )
          : data.uid === activeChatName?.active?.adminId || groupMemberList.includes(activeChatName?.active?.id+data.uid)
          ?
          
          groupMessegeList.map((item) =>
          item.wheSendId === data.uid ? (
            item.whoReceveId === activeChatName?.active?.id && (
              <div className="mb-5 text-right">
                <div className="inline-block bg-secondary-headding relative py-2 px-8 rounded-md">
                  <p className="text-white"> {item.messege}</p>
                  <BsFillTriangleFill className="absolute bottom-[-1px] right-[-6px] text-secondary-headding rotate-[3deg]"></BsFillTriangleFill>
                </div>
                <p className="text-sm mt-1">{item.date}</p>
              </div>
            )
          ) :item.whoReceveId === activeChatName?.active?.id &&  (
            <div className="mb-5">
              <div className="inline-block bg-gray-300 relative py-2 px-8 rounded-md">
                <p className="text-black"> {item.messege} </p>
                <BsFillTriangleFill className="absolute bottom-[-1px] left-[-6px] text-gray-300 rotate-[3deg]"></BsFillTriangleFill>
              </div>
              <p className="text-sm mt-1">{item.date}</p>
            </div>
          )
          )
          :
          <div className="text-center">
          <h1 className="text-red font-bold font-nunito mt-[200px] text-2xl">You are Not Member Is This Group!!</h1>    
          </div>
        }

        {/* recive img  */}

        {/* <div className="mb-5">
          <div className="inline-block bg-gray-300 relative p-2 w-64  rounded-md">
            <ModalImage small={img} large={img} />

            <BsFillTriangleFill className="absolute bottom-[-1px] left-[-6px] text-gray-300 rotate-[3deg]"></BsFillTriangleFill>
          </div>
          <p className="text-sm mt-1">10:45 pm</p>
        </div> */}

        {/* send img */}

        {/* <div className="mb-5 text-right">
          <div className="inline-block bg-secondary-headding relative p-2 w-64 rounded-md">
            <ModalImage small={img} large={img} />
            <BsFillTriangleFill className="absolute bottom-[-1px] right-[-6px] text-secondary-headding rotate-[3deg]"></BsFillTriangleFill>
          </div>
          <p className="text-sm mt-1">10:45 pm</p>
        </div> */}

        {/* recive audio  */}

        {/* <div className="mb-5">
          <div className="inline-block relative">
            <audio controls></audio>
          </div>
          <p className="text-sm mt-1">10:45 pm</p>
        </div> */}

        {/* send audio  */}

        {/* <div className="mb-5 text-right">
          <div className="inline-block relative">
            <audio controls></audio>
          </div>
          <p className="text-sm mt-1">10:45 pm</p>
        </div> */}

        {/* recive video  */}

        {/* <div className="mb-5">
          <div className="inline-block relative">
            <video controls></video>
          </div>
          <p className="text-sm mt-1">10:45 pm</p>
        </div> */}

        {/* send video  */}

        {/* <div className="mb-5 text-right">
          <div className="inline-block relative">
            <video controls></video>
          </div>
          <p className="text-sm mt-1">10:45 pm</p>
        </div> */}
      </div>

{activeChatName?.active?.status==='single'
  ?
  <div className="px-9 mt-6 ">
  <div className="border-b-secondary-headding border-b mb-5 relative">
    {messegeError && (
      <p className="text-red border-4 border-secondary-headding border-opacity-5 bg-white rounded p-1 text-sm font-nunito absolute left-[50%] translate-y-[-50%] top-[50%] translate-x-[-50%]">
        {messegeError}
      </p>
    )}
  </div>
  <div className="flex justify-between items-end">
    <div className="w-[92%] relative">
      <input
        onChange={handleMassege}
        value={messege}
        className={`w-full block ${
          messegeError ? "bg-red" : "bg-gray-300"
        } h-8 pl-2 pr-28 rounded-lg text-sm focus:outline-none`}
      />

      <label className="absolute top-[50%] translate-y-[-50%] right-2">
        <input
          type="file"
          onClick={handleImgeUpload}
          className="hidden"
        />
        <div>
          <FaFileImage className="text-lg text-secondary-headding"></FaFileImage>
        </div>
      </label>
      {/* <ImCamera
        // onClick={() => setCheck(true)}
        className="absolute top-[50%] translate-y-[-50%] right-8 text-xl text-secondary-headding"
      ></ImCamera> */}
    </div>

    <div className="w-[3%]">
      <button
        onClick={handleMessageSend}
        className="h-8 w-10 text-white relative bg-secondary-headding rounded"
      >
        <FaPaperPlane className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></FaPaperPlane>
      </button>
    </div>
  </div>
</div>
  :


  (data.uid === activeChatName?.active?.adminId || groupMemberList.includes(activeChatName?.active?.id+data.uid))&&
(
  <div className="px-9 mt-6 ">
  <div className="border-b-secondary-headding border-b mb-5 relative">
    {messegeError && (
      <p className="text-red border-4 border-secondary-headding border-opacity-5 bg-white rounded p-1 text-sm font-nunito absolute left-[50%] translate-y-[-50%] top-[50%] translate-x-[-50%]">
        {messegeError}
      </p>
    )}
  </div>
  <div className="flex justify-between items-end">
    <div className="w-[92%] relative">
      <input
        onChange={handleMassege}
        value={messege}
        className={`w-full block ${
          messegeError ? "bg-red" : "bg-gray-300"
        } h-8 pl-2 pr-28 rounded-lg text-sm focus:outline-none`}
      />

      <label className="absolute top-[50%] translate-y-[-50%] right-2">
        <input
          type="file"
          onClick={handleImgeUpload}
          className="hidden"
        />
        <div>
          <FaFileImage className="text-lg text-secondary-headding"></FaFileImage>
        </div>
      </label>
      {/* <ImCamera
        // onClick={() => setCheck(true)}
        className="absolute top-[50%] translate-y-[-50%] right-8 text-xl text-secondary-headding"
      ></ImCamera> */}
    </div>

    <div className="w-[3%]">
      <button
        onClick={handleMessageSend}
        className="h-8 w-10 text-white relative bg-secondary-headding rounded"
      >
        <FaPaperPlane className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></FaPaperPlane>
      </button>
    </div>
  </div>
</div>
)
}

      {/* camera start */}
      {check && (
        <div className="absolute w-full left-0 top-0 flex justify-center items-center h-screen z-10 bg-black bg-opacity-80">
          <div
            onClick={() => setCheck(false)}
            className="text-red text-4xl w-14 h-14 flex absolute right-20 top-20 justify-center rounded-full cursor-pointer items-center bg-white font-bold "
          >
            <p>X</p>
          </div>
          {/* <Camera
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri);
            }}
            //   onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
            //   onCameraError = { (error) => { handleCameraError(error); } }
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            idealResolution={{ width: 640, height: 480 }}
            imageType={IMAGE_TYPES.JPG}
            imageCompression={0.97}
            isMaxResolution={true}
            isImageMirror={false}
            isSilentMode={false}
            isDisplayStartCameraError={true}
            isFullscreen={false}
            sizeFactor={1}
            //   onCameraStart = { (stream) => { handleCameraStart(stream); } }
            //   onCameraStop = { () => { handleCameraStop(); } }
          /> */}
        </div>
      )}
      {/* camera start */}
    </div>
  );
};

export default Chat;

// camera part class 27 part - 3
