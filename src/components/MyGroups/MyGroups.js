import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
const MyGroups = () => {
  const [show, setShow] = useState(false);
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const db = getDatabase();

  const [groupList, setGroupList] = useState([]);

  const [requestList, setRequestList] = useState([]);

  


  useEffect(() => {
    const groupRef = ref(db, "group");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().adminId) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);


const handleGroupRequestShow =(gitem)=>{
  setShow(true)
console.log(gitem);
const groupRef = ref(db, "groupJoinRequest");
  onValue(groupRef, (snapshot) => {
    let arr = [];
    snapshot.forEach((item) => {
      if (data.uid === item.val().adminId && item.val().groupid === gitem.key  ) {
        arr.push({ ...item.val(), key: item.key });
      }
    });
    setRequestList(arr);
  });
}




  return (
    <div className="w-full lg:w-[31%] md:w-[450%] relative  rounded-lg shadow-lg ">
      <div className="flex justify-between items-center mb-5 px-5 ">
        <h1 className="text-lg font-bold text-black font-nunito ">My Groups</h1>

        

        {show && (
          <h1
            onClick={() => setShow(!show)}
            className="text-lg font-bold text-green-600 font-nunito cursor-pointer "
          >
            
            🡴 Go Back
          </h1>
        )}
      </div>
      <div className=" h-[250px] overflow-y-scroll p-5 ">
        <div>
          {groupList.length === 0 ? (
            <h2 className="text-3xl mb-10 text-center font-bold font-nunito text-primary-headding ">
              No Group Available !!
            </h2>
          ) : show ? (
            requestList.map((item, i)=>
              <div
                  key={i}
                  className="flex justify-between items-start border-b pb-3 mb-3"
                >
                  <div className="flex items-center">
                    <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                      <img src="images/profile.png" alt="" />
                    </div>
                    <div>
                      <h3 className="text-base text-black font-bold font-nunito ">
                        {item.username}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <Button className="font-nunito" size="sm" color="green">
                      Accept
                    </Button>
                    <Button
                      
                      className="font-nunito ml-1 bg-red"
                      size="sm"
                      color="green"
                    >
                      Reject
                    </Button>
                  </div>
                </div> )
          ) : (
            <div>
              {groupList.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-start border-b pb-3 mb-3"
                >
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
                    <p className="text-sm mb-1 text-secondary-headding">
                      Admin : {item.adminName}
                    </p>

                    <Button className="font-nunito" size="sm" color="green">
                      Info
                    </Button>
                    <Button
                      onClick={()=>handleGroupRequestShow(item)}
                      className="font-nunito ml-1 relative"
                      size="sm"
                      color="green"
                    >
                      Request 
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
