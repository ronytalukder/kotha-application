import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

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

  return (
    <div>
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
            <Button className="font-nunito" size="sm" color="green">
              {" "}
              unblock
            </Button>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockedUsers;
