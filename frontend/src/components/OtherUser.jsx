import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice.js";
import { setResponsive } from "../redux/responsiveSlice.js";

export default function OtherUser({user}) {
   const {responsive} = useSelector(store=>store.responsive)
   const dispatch = useDispatch();
   
   const { selectedUser, onlineUsers } = useSelector(store=>store.user);
   
   const isOnline = onlineUsers?.includes(user._id);
   
   const selectedUserHandler = () => { 
      dispatch(setSelectedUser(user));
      // console.log(dispatch(setSelectedUser(user)));
      dispatch(setResponsive(!responsive))
   };
   
   return (
      <>
         <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id===user?._id ? "bg-slate-900" : ""} m-2 flex flex-row gap-3 active:bg-zinc-200 active:text-black rounded cursor-pointer p-1`}>
            <div className={`avatar ${isOnline ? "online" : ""} flex justify-center items-center`}>
               <div className="w-9 h-9 rounded-full">
                  <img src={user?.profilePhoto} alt="user profile photo" />
               </div>
            </div>
            <div className="">
               <p className="font-bold">{user.fullName}</p>
               <p className="text-xs">&lt;{user.username}/&gt;</p>
            </div>
         </div>
         
         <div className="border border-gray-500 m-2"></div>
      </>
   );
}
