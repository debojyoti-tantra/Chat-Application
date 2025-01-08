import React from "react";
import OtherUser from "./OtherUser.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.jsx";
import { useSelector, useDispatch } from 'react-redux';

export default function OtherUsers() {
   // call my custom hook
   useGetOtherUsers();
   
   const {otherUsers} = useSelector(store=>store.user);
   if (!otherUsers) return; // early return
   
   return (
      <div className="h-[65vh] sm:h-[59vh] overflow-auto border border-white rounded-lg mr-2">
         {
            otherUsers?.map((user) => {
               return (
                  <OtherUser key={user._id} user={user} />
               )
            })
         }
      
      </div>
   );
}
