import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";

const BlockedUsers = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [blockLIst, setBlockList] = useState([]);
  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (item.val().blockById === data.uid) {
          arr.push({
            id: item.key,
            block: item.val().block,
            blockId: item.val().blockId,
          });
        } else {
          arr.push({
            id: item.key,
            blockById: item.val().blockById,
            blockBy: item.val().blockBy,
          });
        }
      });
      setBlockList(arr);
    });
  }, []);

  const handleUnBlock = (item) => {
    set(push(ref(db, 'friend')), {
      senderName:item.block,
      senderId:item.blockId,
      reciverId:data.uid,
      reciverName:data.displayName
     })
     .then(()=>{
       remove(ref(db, 'block/'+item.id))
     })
  }

  return (
    <div>
      {
        blockLIst.length===0
        ?
        <h2 className="text-3xl mb-10 text-center font-bold font-nunito text-primary-headding ">
        No Block User Available !!
      </h2>
        :
        <>
         {blockLIst.map((item,i) => (
        <div key={i} className="flex justify-between items-center border-b pb-3 mb-3">
          <div className="flex items-center">
            <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
              <img src="images/profile.png" alt="" />
            </div>
            <div>
            <h3 className="text-base text-black font-bold font-nunito ">
                {item.blockBy}
              </h3>
              <h3 className="text-base text-black font-bold font-nunito ">
                {item.block}
              </h3>
              
              <p className="text-sm">Lorem, ipsum dolor</p>
            </div>
          </div>
          <div>
            {!item.blockById &&
            <Button onClick={()=>handleUnBlock(item)} className="font-nunito" size="sm" color="green">
              unblock
            </Button>
            }
          </div>
        </div>
      ))}</>
      }
     
    </div>
  );
};

export default BlockedUsers;
