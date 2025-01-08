import React, { useRef } from "react";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Messages({message}) {
   const scroll = useRef();
   const {authUser, selectedUser} = useSelector(store=>store.user);
   
   useEffect(() => {  
      scroll.current?.scrollIntoView({behavior:"smooth"});
   }, [message]);
   
   // console.log(authUser);
   
   return (
      <>
         <div ref={scroll} className={`chat ${authUser?._id===message?.senderId ? "chat-end" : "chat-start"} `}>
           <div className="chat-image avatar">
             <div className="w-8 h-8 rounded-full">
               <img
                 alt="Tailwind CSS chat bubble component"
                 src={authUser?._id===message?.senderId ? authUser?.profilePhoto : selectedUser?.profilePhoto}
               />
             </div>
           </div>
           <div className="chat-header">
             <time className="text-xs text-white">{new Date(message.date || message.createdAt).toLocaleString()}</time>
           </div>
           <div className={`chat-bubble ${authUser?._id===message?.senderId ? "bg-green-950" : ""} text-sm`}>{message?.message}</div>
         </div>
      </>
   );
}
