import React, { useState } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,

} from "@material-tailwind/react";
import { ProfileInfoCard, CategoryCard, PlatformSettings } from "@/widgets/cards";
import { useUser } from "@/context/usercontext";
import { ToastContainer, toast } from 'react-toastify';
export function Profile() {
  const { user}  = useUser();
  






  


  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        
      </div>
      <Card className="mx-3 -mt-32 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
            <label className="relative cursor-pointer">
            <Avatar
              src={"/img/favicon1.png"}
              alt="Profile Avatar"
              size="xl"
              variant="rounded"
              className="rounded-lg shadow-lg shadow-blue-gray-500/40"
            />
           
          </label>
              <div>
                
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {user.name}
                </Typography>
              </div>
            </div>

          </div>

          <div className="grid-cols-1 mb-5 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
            <>
            <ProfileInfoCard
              title="Profile Information"
              details={{
                Name: user.name,
                Email: user.email,
              }}
              userid={user._id}
              
            />
             
              </>
            <div>
              
              <div>
                  <PlatformSettings/>
              </div>
            </div>
          </div>
          
        </CardBody>
      </Card>
      
      <ToastContainer />
    </>
  );
}

export default Profile;
  