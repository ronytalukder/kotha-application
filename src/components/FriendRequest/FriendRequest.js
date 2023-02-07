import React from 'react';
import { Button } from "@material-tailwind/react";
const FriendRequest = () => {
    return (
        <div>
          
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <div className="flex items-center">
              <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                <img src="images/profile.png" alt="" />
              </div>
              <div>
                <h3 className="text-base text-black font-bold font-nunito ">Name</h3>
                <p className="text-sm">Lorem, ipsum dolor.</p>
              </div>
            </div>
            <div>
            <Button className="font-nunito" size="sm" color="green">Accept</Button>
            </div>
          </div>
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <div className="flex items-center">
              <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                <img src="images/profile.png" alt="" />
              </div>
              <div>
                <h3 className="text-base text-black font-bold font-nunito ">Name</h3>
                <p className="text-sm">Lorem, ipsum dolor.</p>
              </div>
            </div>
            <div>
            <Button className="font-nunito" size="sm" color="green">Accept</Button>
            </div>
          </div>
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <div className="flex items-center">
              <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                <img src="images/profile.png" alt="" />
              </div>
              <div>
                <h3 className="text-base text-black font-bold font-nunito ">Name</h3>
                <p className="text-sm">Lorem, ipsum dolor.</p>
              </div>
            </div>
            <div>
            <Button className="font-nunito" size="sm" color="green">Accept</Button>
            </div>
          </div>
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <div className="flex items-center">
              <div className="w-14 h-14 mr-5 rounded-full overflow-hidden">
                <img src="images/profile.png" alt="" />
              </div>
              <div>
                <h3 className="text-base text-black font-bold font-nunito ">Name</h3>
                <p className="text-sm">Lorem, ipsum dolor.</p>
              </div>
            </div>
            <div>
            <Button className="font-nunito" size="sm" color="green">Accept</Button>
            </div>
          </div>
    
          
        </div>
      );
};

export default FriendRequest;