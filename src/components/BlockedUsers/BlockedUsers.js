import { Button } from '@material-tailwind/react';
import React from 'react';

const BlockedUsers = () => {
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
            <Button className="font-nunito" size="sm" color="green"> unblock</Button>
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
            <Button className="font-nunito" size="sm" color="green"> unblock</Button>
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
            <Button className="font-nunito" size="sm" color="green"> unblock</Button>
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
            <Button className="font-nunito" size="sm" color="green"> unblock</Button>
            </div>
          </div>
        </div>
    );
};

export default BlockedUsers;