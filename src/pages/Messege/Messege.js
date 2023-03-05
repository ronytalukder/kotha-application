import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { FaSistrix } from "react-icons/fa";
import Friends from "../../components/Friends/Friends";
import MessegeGroup from "../../components/MessegeGroup";
import Chat from "../../components/Chat/Chat";

const Messege = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  useEffect(() => {
    if (!data) {
      Navigate("/login");
    }
  }, []);
  return (
    <div className="px-[100px] mt-11 flex justify-between">

      <div className="w-[40%] ">
        <div className="w-full mb-8  rounded-lg shadow-lg ">
          <div className="flex justify-between items-center  px-5 ">
            <h1 className="text-lg font-bold text-black font-nunito ">
              Friends
            </h1>
          </div>
          <div class="pt-2 px-5 relative mx-auto text-gray-600">
            <input
              class="border-2 border-secondary-headding bg-white h-8 px-2 w-full pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <div
              type="submit"
              class="text-secondary-headding text-lg absolute right-5 top-[-5px] mt-5 mr-4"
            >
              <FaSistrix></FaSistrix>
            </div>
          </div>
          {/* <div className=" h-[250px] overflow-y-scroll p-5 "> */}
          <div className=" h-[250px] overflow-y-scroll p-5 ">
            <Friends></Friends>
          </div>
        </div>

        <div className="w-full rounded-lg shadow-lg ">
          <MessegeGroup></MessegeGroup>
        </div>
      </div>

      <div className="w-[55%] shadow-lg rounded-md  pt-9  bg-secondary-headding bg-opacity-5">
        <Chat></Chat>
      </div>

      {/* <div class="pt-2 relative mx-auto text-gray-600">
        <input
          class="border-2 border-secondary-headding bg-white h-10 px-2 w-full pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
        />
        <button type="submit" class="text-secondary-headding text-lg absolute right-0 top-0 mt-5 mr-4">
          <FaSistrix></FaSistrix>
        </button>
      </div> */}
    </div>
  );
};

export default Messege;
