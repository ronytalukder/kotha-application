import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';


const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] =  useState([])
  const [friendRequestList, setFriendRequestList] =  useState([])
  
  const data = useSelector(state => state.userLoginInfo.userInfo)
  console.log(data.uid)

  useEffect(()=>{
    const starCountRef = ref(db, 'users');
    onValue(starCountRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item =>{
        if(data.uid != item.key){
          arr.push({...item.val(),userId:item.key})
        }
      })
      setUserList(arr)
    });
  },[])

  const handleFriendRequrest = (user) =>{
    set(push(ref(db, 'friendRequest')), {
      senderName: data.displayName,
      senderId: data.uid,
      reciverName:user.username,
      reciverId : user.userId
    });
  }

  useEffect(()=>{
    const friendRequestRef = ref(db, 'friendRequest');
    onValue(friendRequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item =>{
          arr.push(item.val().reciverId+item.val().senderId)
      })
      setFriendRequestList(arr)
    });
  },[])
 
    return (
        <div>

          {
            userList.map((user,i) => <div key={i} className="flex justify-between items-center border-b pb-3 mb-3">
            <div className="flex items-center">
              <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                <img src="images/profile.png" alt="" />
              </div>
              <div>
                <h3 className="text-base text-black font-bold font-nunito ">{user.username}</h3>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
            <div>
              {
                friendRequestList.includes(user.userId+data.uid) || friendRequestList.includes(data.uid+user.userId)
                ?
                <Button onClick={()=>handleFriendRequrest(user)} className="font-nunito capitalize" size="sm" color="green">Cancel Request </Button>
                :
                <Button onClick={()=>handleFriendRequrest(user)} className="font-nunito capitalize" size="sm" color="green"> Add Friend </Button>
              }

            </div>
          </div> )
          }
           
        </div>
    );
};

export default UserList;


