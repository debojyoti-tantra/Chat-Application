import React from "react";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers.jsx";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { IoPeople } from "react-icons/io5";

export default function Sidebar() {
   const [profileHidden, setProfileHidden] = useState(false);
   const [search, setSearch] = useState("");
   const navigate = useNavigate();
   const {otherUsers, authUser} = useSelector(store=>store.user);
   const {responsive} = useSelector(store=>store.responsive)
   const dispatch = useDispatch();
   
   const logoutHandler = async () => {
      try {
         const res = await axios.get(`https://chat-application-p97k.onrender.com/api/v1/user/logout`);
         // localStorage.removeItem("authUser");
         navigate("/login")
         toast.success(res.data.message);
         dispatch(setAuthUser(null));
         dispatch(setSelectedUser(null));
      } catch (error) {
         console.log(error);
      }
   };
   
   const searchSubmitHandler = (e) => {
      e.preventDefault();
      const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
      if (conversationUser) {
         dispatch(setOtherUsers([conversationUser]));
      } else {
         toast.error("User not found!");
      }
   };
   
   return (
      <div className={`sm:border-r ${responsive ? "hidden" : ""} sm:block`}>
         <form action="" onSubmit={searchSubmitHandler} className="flex justify-between items-center pr-2">
            <div className="flex flex-row gap-3 m-2">
               <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text" 
                  className="input input-bordered rounded-md p-1 h-8 text-black w-[80%]" 
                  placeholder="search..." 
               />
               <button type="submit" className="border border-white h-8 w-8 flex justify-center items-center bg-zinc-600 active:bg-zinc-800 rounded-lg"><FaSearch className="text-lg" /></button>
            </div>
            <div onClick={() => setProfileHidden(!profileHidden)} className="flex justify-center items-center active:text-blue-400 mr-2 p-1 bg-slate-700 rounded-lg">
               <IoPeople className="text-2xl" />
            </div>
         </form>
         
         <div className="border border-white m-2"></div>
         
         <div className="">
            {/*display all the users*/}
            <OtherUsers />
         </div>
         
         <div>
            <button onClick={logoutHandler} className="btn btn-sm mt-2">Logout</button>
         </div>
         
         <div className={` ${profileHidden ? "" : "hidden"} fixed bg-violet-700 min-w-40 min-h-40 right-12 top-16 z-10 flex justify-center items-center flex-col p-5 rounded-lg gap-1`}>
            <p className="underline text-lg">Your Profile</p>
            <img src={authUser?.profilePhoto} className="w-32 h-32 border-2 border-black rounded-full" alt="" />
            <p>Name: {authUser?.fullName}</p>
            <p>Username: {authUser?.username}</p>
         </div>
      </div>
   );
}
