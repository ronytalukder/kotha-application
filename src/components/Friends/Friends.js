import React, { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import profile from '../../images/profile.png'
const Friends = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  let [friends, setFriends] = useState([]);
  useEffect(() => {
    const friendRef = ref(db, "friend");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        if (
          data.uid === item.val().reciverId ||
          data.uid === item.val().senderId
        ) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setFriends(arr);
    });
  }, []);

  const handleBlock = (item) => {
    if(data.uid===item.senderId){
      set(push(ref(db,'block')), {
        block: item.reciverName,
        blockId:item.reciverId,
        blockBy:item.senderName,
        blockById:item.senderId
      }).then(()=>{
        remove(ref(db,'friend/'+item.key))
      })
    }
    else{
      set(push(ref(db,'block')), {
        block: item.senderName,
        blockId:item.senderId,
        blockBy:item.reciverName,
        blockById:item.reciverId
      }).then(()=>{
        remove(ref(db,'friend/'+item.key))
      })
    }
  };

  return (
    <div>
      {
        friends.length===0 
        ?
        <h2 className="text-3xl mb-10 text-center font-bold font-nunito text-primary-headding ">
          No Friend Available !!
        </h2>
        :
        <>{friends.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-start border-b pb-3 mb-3"
          >
            <div className="flex items-center">
              <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                <img src={profile} alt="" />
              </div>
              <div>
                <h3 className="text-base text-black font-bold font-nunito ">
                  {data.uid === item.senderId
                    ? item.reciverName
                    : item.senderName}
                </h3>
                <p className="text-sm">Lorem, ipsum dolor</p>
              </div>
            </div>
            <div>
              <Button
                className="font-nunito bg-red"
                size="sm"
                onClick={() => handleBlock(item)}
              >
                Block
              </Button>
            </div>
          </div>
        ))}</>
      }
      
    </div>
  );
};

export default Friends;
