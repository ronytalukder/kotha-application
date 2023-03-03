import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const db = getDatabase();
  const [friendRequestList, setFriendRequestList] = useState([]);
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().reciverId === data.uid) {
          arr.push({
            ...item.val(),
            id: item.key,
          });
        }
      });
      setFriendRequestList(arr);
    });
  }, []);

  const handleFriendAccept = (item) => {
    console.log(item);
    set(push(ref(db, 'friend')), {
     ...item
    }).then(()=>{
      remove(ref(db, 'friendRequest/'+item.id))
    })
  };

  return (
    <div>
      {friendRequestList.map((item) => (
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <div className="flex items-center">
            <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
              <img src="images/profile.png" alt="" />
            </div>
            <div>
              <h3 className="text-base text-black font-bold font-nunito ">
                {item.senderName}
              </h3>
              <p className="text-sm">Lorem, ipsum dolor.</p>
            </div>
          </div>
          <div>
            <Button
              onClick={()=>handleFriendAccept(item)}
              className="font-nunito"
              size="sm"
              color="green"
            >
              Accept
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;


