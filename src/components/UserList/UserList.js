import { Button } from '@material-tailwind/react';
import React from 'react';
import { FaPlus } from "react-icons/fa";

const UserList = () => {
    return (
        <div>
            <div className="flex justify-between items-center border-b pb-3 mb-3">
            <div className="flex items-center">
              <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                <img src="images/profile.png" alt="" />
              </div>
              <div>
                <h3 className="text-base text-black font-bold font-nunito ">Name</h3>
                <p className="text-sm">10:45:10</p>
              </div>
            </div>
            <div>
            <Button className="font-nunito" size="sm" color="green"> <FaPlus className='text-base'></FaPlus> </Button>
            </div>
          </div>
            <div className="flex justify-between items-center border-b pb-3 mb-3">
            <div className="flex items-center">
              <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                <img src="images/profile.png" alt="" />
              </div>
              <div>
                <h3 className="text-base text-black font-bold font-nunito ">Name</h3>
                <p className="text-sm">10:45:10</p>
              </div>
            </div>
            <div>
            <Button className="font-nunito" size="sm" color="green"> <FaPlus className='text-base'></FaPlus> </Button>
            </div>
          </div>
            <div className="flex justify-between items-center border-b pb-3 mb-3">
            <div className="flex items-center">
              <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                <img src="images/profile.png" alt="" />
              </div>
              <div>
                <h3 className="text-base text-black font-bold font-nunito ">Name</h3>
                <p className="text-sm">10:45:10</p>
              </div>
            </div>
            <div>
            <Button className="font-nunito" size="sm" color="green"> <FaPlus className='text-base'></FaPlus> </Button>
            </div>
          </div>
            <div className="flex justify-between items-center border-b pb-3 mb-3">
            <div className="flex items-center">
              <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                <img src="images/profile.png" alt="" />
              </div>
              <div>
                <h3 className="text-base text-black font-bold font-nunito ">Name</h3>
                <p className="text-sm">10:45:10</p>
              </div>
            </div>
            <div>
            <Button className="font-nunito" size="sm" color="green"> <FaPlus className='text-base'></FaPlus> </Button>
            </div>
          </div>
        </div>
    );
};

export default UserList;