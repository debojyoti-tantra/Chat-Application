import React from "react";
import Sidebar from './Sidebar.jsx';
import MessageContainer from './MessageContainer.jsx'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function Homepage() {
   const navigate = useNavigate();
   
   const {authUser} = useSelector(store=>store.user);
   
   useEffect(() => {  
      if (!authUser) {
         navigate("/login");
      }
   }, []);
   
   return (
      <div className="rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100 p-3 flex-col h-fit m-4 h-[85vh] w-[90vw]">
         <div className="text-white sm:grid sm:grid-cols-[1fr_3fr]">
            <Sidebar />
            <MessageContainer />
         </div>
      </div>
   );
}
