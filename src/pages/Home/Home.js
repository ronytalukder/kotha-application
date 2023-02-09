import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FriendRequest from "../../components/FriendRequest/FriendRequest";
import GroupList from "../../components/GroupList/GroupList";
import { BsThreeDotsVertical } from "react-icons/bs";
import Friends from "../../components/Friends/Friends";
import MyGroups from "../../components/MyGroups/MyGroups";
import UserList from "../../components/UserList/UserList";
import BlockedUsers from "../../components/BlockedUsers/BlockedUsers";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from "../../slices/userSlice";

const Home = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [verify, setVerify] = useState(false);

  const dispatch = useDispatch();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    dispatch(userLoginInfo(user))
    localStorage.setItem('userInfo', JSON.stringify(user))
  });

  const navigate = useNavigate();

  useEffect(() => {
     if(data.emailVerified){
      setVerify(true)
    }
  }, []);
 
  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {verify ? (
        <div className="px-9 mt-10 flex justify-between flex-wrap gap-6 ">
          <div className="w-full lg:w-[31%] md:w-[450%]   rounded-lg shadow-lg ">
            <div className="flex justify-between items-center mb-5 px-5 ">
              <h1 className="text-lg font-bold text-black font-nunito ">
                Group List
              </h1>
              <BsThreeDotsVertical className="text-xl cursor-pointer mr-[-8px]"></BsThreeDotsVertical>
            </div>
            <div className=" h-[250px] overflow-y-scroll p-5 ">
              <GroupList></GroupList>
            </div>
          </div>

          <div className="w-full lg:w-[31%] md:w-[450%]   rounded-lg shadow-lg ">
            <div className="flex justify-between items-center mb-5 px-5 ">
              <h1 className="text-lg font-bold text-black font-nunito ">
                Friend Request
              </h1>
              <BsThreeDotsVertical className="text-xl cursor-pointer mr-[-8px]"></BsThreeDotsVertical>
            </div>
            <div className=" h-[250px] overflow-y-scroll p-5 ">
              <FriendRequest></FriendRequest>
            </div>
          </div>

          <div className="w-full lg:w-[31%] md:w-[450%]   rounded-lg shadow-lg ">
            <div className="flex justify-between items-center mb-5 px-5 ">
              <h1 className="text-lg font-bold text-black font-nunito ">
                Friends
              </h1>
              <BsThreeDotsVertical className="text-xl cursor-pointer mr-[-8px]"></BsThreeDotsVertical>
            </div>
            <div className=" h-[250px] overflow-y-scroll p-5 ">
              <Friends></Friends>
            </div>
          </div>

          <div className="w-full lg:w-[31%] md:w-[450%]   rounded-lg shadow-lg ">
            <div className="flex justify-between items-center mb-5 px-5 ">
              <h1 className="text-lg font-bold text-black font-nunito ">
                My Groups
              </h1>
              <BsThreeDotsVertical className="text-xl cursor-pointer mr-[-8px]"></BsThreeDotsVertical>
            </div>
            <div className=" h-[250px] overflow-y-scroll p-5 ">
              <MyGroups></MyGroups>
            </div>
          </div>

          <div className="w-full lg:w-[31%] md:w-[450%]   rounded-lg shadow-lg ">
            <div className="flex justify-between items-center mb-5 px-5 ">
              <h1 className="text-lg font-bold text-black font-nunito ">
                User List
              </h1>
              <BsThreeDotsVertical className="text-xl cursor-pointer mr-[-8px]"></BsThreeDotsVertical>
            </div>
            <div className=" h-[250px] overflow-y-scroll p-5 ">
              <UserList></UserList>
            </div>
          </div>

          <div className="w-full lg:w-[31%] md:w-[450%]   rounded-lg shadow-lg ">
            <div className="flex justify-between items-center mb-5 px-5 ">
              <h1 className="text-lg font-bold text-black font-nunito ">
                Blocked users
              </h1>
              <BsThreeDotsVertical className="text-xl cursor-pointer mr-[-8px]"></BsThreeDotsVertical>
            </div>
            <div className=" h-[250px] overflow-y-scroll p-5 ">
              <BlockedUsers></BlockedUsers>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center bg-secondary-headding items-center">
          <h1 className="font-nunito text-3xl text-white">
            Please Verify Your Email
          </h1>
        </div>
      )}
    </>
  );
};

export default Home;


