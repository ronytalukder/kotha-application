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
import { Button, Input } from "@material-tailwind/react";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";

const Home = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [verify, setVerify] = useState(false);
  const [show, setShow] = useState(false)

  let [groupName , setGroupName] = useState('')
  let [errorGroupName , setErrorGroupName] = useState('')

  let [tagline , setTagline] = useState('')
  let [errorTagline , setErrorTagline] = useState('')


  const  handleGroupName = (e) =>{
    setGroupName(e.target.value)
    setErrorGroupName('')
  }

  const  handleGroupTagline = (e) =>{
    setTagline(e.target.value)
    setErrorTagline('')
  }

  const handeGroupCreate = () =>{
    if(!groupName){
      setErrorGroupName('Grup name is required')
    }
    if(!tagline){
      setErrorTagline('Grup tagline is required')
    }
    else{ 
      console.log(groupName, tagline)
      set(push(ref(db, 'group')), {
        groupName:groupName,
        groupTagLine:tagline,
        adminId: data.uid,
        adminName: data.displayName
      }).then(()=>{
        setShow(false)
        setGroupName('')
        setTagline('')
      })
    }
  }

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

  const handleGroupCreate = ()=>{
    setShow(!show)
    console.log(show)
  }


  const handleGroupJoin = (item)=> {
    console.log(item)
    set(push(ref(db, 'groupJoinRequest')), {
      groupid:item.key, 
      groupName:item.groupName,
      groupTagLine:item.groupTagLine,
      adminId: item.adminId,
      adminName: item.adminName,
      userId: data.uid,
      username:data.displayName,
    })
  }


  return (
    <>
      {verify ? (
        <div className="px-9 mt-10 flex justify-between flex-wrap gap-6 ">
          <div className="w-full lg:w-[31%] md:w-[450%]   rounded-lg shadow-lg ">
            <div className="flex justify-between items-center mb-5 px-5 ">
              <h1 className="text-lg font-bold text-black font-nunito ">
                Group List
              </h1>
              <h1 onClick={handleGroupCreate} className="text-lg font-bold text-green-600 font-nunito cursor-pointer ">
                {show?"🡴 Go Back":'Create Group +'}
                 
              </h1>
              {/* <BsThreeDotsVertical className="text-xl cursor-pointer mr-[-8px]"></BsThreeDotsVertical> */}
            </div>
            <div className=" h-[250px] overflow-y-scroll p-5 ">

              {
                show?
                <div className="bg-primary-headding bg-opacity-10 p-5 rounded">
                  <div>

                  <Input
                    color="green"
                    onChange={handleGroupName}
                    size="lg"
                    label="Group name"
                    type='text'
                    />
                    </div>
                    <div className="mt-5">
                    <p className="text-sm font-normal text-red font-nunito mb-3">
                    {errorGroupName}
                  </p>
                  <Input
                    color="green"
                    onChange={handleGroupTagline}
                    size="lg"
                    label="Group Tagline"
                    type='text'
                    />
                    <p className="text-sm font-normal text-red font-nunito mb-3 ">
                    {errorTagline}
                  </p>
                    </div>

                    <Button
                    onClick={handeGroupCreate}
                  className=" mt-6 flex justify-center gap-2 items-center font-nunito text-base font-medium capitalize relative"
                  fullWidth
                  color="amber"
                            
                > 
                    <p>Create Group</p>
                  
                </Button>
                </div>
                :
              <GroupList handleGroupJoin={handleGroupJoin}></GroupList>
              }
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


