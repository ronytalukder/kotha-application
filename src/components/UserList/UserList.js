import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue} from "firebase/database";
import { useSelector } from 'react-redux';


const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] =  useState([])
  
  const data = useSelector(state => state.userLoginInfo.userInfo)
  console.log(data.uid)

  useEffect(()=>{
    const starCountRef = ref(db, 'users');
    onValue(starCountRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item =>{
        if(data.uid != item.key){
          arr.push(item.val())
        }
      })
      setUserList(arr)
    });
  },[])

    return (
        <div>

          {
            userList.map(user => <div className="flex justify-between items-center border-b pb-3 mb-3">
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
            <Button className="font-nunito capitalize" size="sm" color="green"> Add Friend</Button>
            </div>
          </div> )
          }
           
        </div>
    );
};

export default UserList;