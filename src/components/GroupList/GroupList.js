import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const GroupList = ({handleGroupJoin}) => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const db = getDatabase();
  const [groupList, setGroupList] = useState([]);
  const groupRef = ref(db, "group");

  useEffect(() => {
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.val().adminId) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);

 

  return (
    <div>
      {groupList.length === 0 ? (
        <h2 className="text-3xl mb-10 text-center font-bold font-nunito text-primary-headding ">
          No Group Available !!
        </h2>
      ) : (
        <>
          {groupList.map((item) => (
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <div className="flex items-center">
                <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                  <img src="images/profile.png" alt="" />
                </div>
                <div>
                  <h3 className="text-base text-black font-bold font-nunito ">
                    {item.groupName}
                  </h3>
                  <p className="text-sm">{item.groupTagLine}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-secondary-headding">
                  Admin : {item.adminName}
                </p>
                <Button
                  onClick={()=>handleGroupJoin(item)}
                  className="font-nunito"
                  size="sm"
                  color="green"
                >
                  Join
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default GroupList;
