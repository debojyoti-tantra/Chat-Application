import React from "react";
import SendInputMessage from "./SendInputMessage.jsx";
import Messages from "./Messages.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {setSelectedUser} from "../redux/userSlice.js";
import { IoPeople } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { setResponsive } from "../redux/responsiveSlice.js";

export default function MessageContainer() {
   const [profileHidden, setProfileHidden] = useState(false);
   const {selectedUser, authUser, onlineUsers, user} = useSelector(store=>store.user);
   const {responsive} = useSelector(store=>store.responsive)
   const dispatch = useDispatch();
   
   const isOnline = onlineUsers?.includes(selectedUser?._id);
   
   // useEffect(() => {  
   //    return () => dispatch(setSelectedUser(null));
   // }, []);
   
   const responsiveHandler = () => {
      dispatch(setResponsive(!responsive))
   };
   
   return (
      <div className={`${responsive ? "" : "hidden sm:block"}`}>
         {
            selectedUser!==null ? (
               <div className="ml-2">
                  <div className="flex flex-row gap-3 bg-slate-800 rounded cursor-pointer p-2 justify-between px-4">
                     <div className="flex flex-row gap-3 justify-center items-center">
                        <div className="avatar">
                           <div className="w-8 h-8 rounded-full">
                              <img src={selectedUser?.profilePhoto} alt="user profile photo"/>
                           </div>
                        </div>
                        <div className="">
                           <p className="font-bold text-md">{selectedUser?.fullName}</p>
                           <p className="text-xs">
                             {isOnline ? (<span className="text-green-400">online</span>) : (<span>offline</span>)}
                           </p>
                        </div>
                     </div>
                     <div onClick={() => setProfileHidden(!profileHidden)} className="hidden sm:flex justify-center items-center active:text-blue-400 px-1 bg-slate-700 rounded-lg">
                        <IoPeople className="text-3xl" />
                     </div>
                     <div onClick={responsiveHandler} className="flex sm:hidden justify-center items-center active:text-blue-400">
                        <RxCross2 className="text-3xl" />
                     </div>
                  </div>
                  
                  <div className={` ${profileHidden ? "" : "hidden"} fixed bg-violet-700 min-w-40 min-h-40 right-16 top-20 z-10 flex justify-center items-center flex-col p-5 rounded-lg gap-1`}>
                     <p className="underline text-lg">Your Profile</p>
                     <img src={authUser?.profilePhoto} className="w-32 h-32 border-2 border-black rounded-full" alt="" />
                     <p>Name: {authUser?.fullName}</p>
                     <p>Username: {authUser?.username}</p>
                  </div>
                  
                  <div className="border border-white rounded-lg w-full h-[59vh]  my-2 p-2 overflow-y-auto">
                     <Messages />
                  </div>
                  <SendInputMessage />
               </div>
            ) : (
               <div className="ml-2">
                  <div className="flex flex-row gap-3 bg-slate-800 rounded cursor-pointer p-2 justify-between px-4">
                     <div className="flex flex-row gap-3">
                        <div className="avatar">
                           <div className="w-10 h-10 rounded-full">
                              <img src={authUser?.profilePhoto} alt="user profile photo"/>
                           </div>
                        </div>
                        <div className="">
                           <p className="font-bold">Select a user</p>
                        </div>
                     </div>
                     
                     <div onClick={() => setProfileHidden(!profileHidden)} className="flex justify-center items-center active:text-blue-400 ">
                        <IoPeople className="text-4xl" />
                     </div>
                  </div>
                  
                  <div className="border border-white rounded-lg w-full h-[390px] my-2 p-2 overflow-y-auto flex justify-center flex-col items-center text-3xl font-bold">
                     <p>Hii, {authUser?.fullName}</p>
                     <p>Let's Start the Conversation...</p>
                  </div>
                  
                  <div className={` ${profileHidden ? "" : "hidden"} fixed bg-violet-700 min-w-40 min-h-40 right-16 top-20 z-10 flex justify-center items-center flex-col p-5 rounded-lg gap-1`}>
                     <p className="underline text-lg">Your Profile</p>
                     <img src={authUser?.profilePhoto} className="w-32 h-32 border-2 border-black rounded-full" alt="" />
                     <p>Name: {authUser?.fullName}</p>
                     <p>Username: {authUser?.username}</p>
                  </div>
               </div>
            )
         }
      </div>
      
   );
}
