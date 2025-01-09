import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import toast from "react-hot-toast"

export default function Signup() {
   const navigate = useNavigate()

   const {authUser} = useSelector(store=>store.user);

   useEffect(() => {  
      if (authUser) {
         navigate("/");
      }
   }, [authUser]);
   
   const [user, setUser] = useState({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
   }); 
   const handelCheckbox = (gender) => {
      setUser({...user, gender})
   };
   
   const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post(`https://chat-application-p97k.onrender.com/api/v1/user/register`, user, {
            header: {
               'Content-Type': 'application/json'
            },
            withCredentials:true
         })
         if (res.data.success) {
            navigate("/login");
            toast.success(res.data.message);
         }
      } catch (error) {
         toast.error(error.response.data.message)
         console.log(error);
      }
      setUser({
         fullName: "",
         username: "",
         password: "",
         confirmPassword: "",
         gender: "",
      })
   };
   
   return (
      <div className="min-h-screen">
      <div className="rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100 p-3 flex justify-center items-center flex-col h-fit my-16 sm:m-16">
         <h1 className="underline text-2xl text-white font-bold">Signup</h1>
         <form action="" onSubmit={onSubmitHandler} className="">
            <div className="flex flex-col my-2">
               <label htmlFor="name" className="label-text text-white">Full Name:</label>
               <input type="text" id="name" className="input input-bordered rounded-md text-sm h-8 w-full" placeholder="Enter your full name" value={user.fullName} onChange={(e) => setUser({...user,fullName:e.target.value})} />
            </div>
            <div className="flex flex-col my-2">
               <label htmlFor="username" className="label-text text-white">Username:</label>
               <input type="text" id="username" className="input input-bordered rounded-md text-sm h-8 w-full" placeholder="Enter your username" value={user.username} onChange={(e) => setUser({...user,username:e.target.value})} />
            </div>
            <div className="flex flex-col my-2">
               <label htmlFor="password" className="label-text text-white">Password:</label>
               <input type="password" id="password" className="input input-bordered rounded-md text-sm h-8 w-full" placeholder="Enter your password" value={user.password} onChange={(e) => setUser({...user,password:e.target.value})} />
            </div>
            <div className="flex flex-col my-2">
               <label htmlFor="confirmPassword" className="label-text text-white">Confirm Password:</label>
               <input type="Password" id="confirmPassword" className="input input-bordered rounded-md text-sm h-8 w-full" placeholder="Enter your password" value={user.confirmPassword} onChange={(e) => setUser({...user,confirmPassword:e.target.value})} />
            </div>
            <div className="form-control flex flex-row gap-3">
              <label className="label cursor-pointer gap-1">
                <span className="label-text text-white">Male</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" checked={user.gender === "male"} onChange={() => handelCheckbox("male")} />
              </label>
              <label className="label cursor-pointer gap-1">
                <span className="label-text text-white">Female</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" checked={user.gender === "female"} onChange={() => handelCheckbox("female")} />
              </label>
            </div>
            <div className="label-text text-white">
               Already have an account?
               <NavLink to="/login" className="text-purple-700 underline"> Login</NavLink>
            </div>
            <button type="submit" className="btn btn-block btn-sm md-1 mt-2">Sign Up</button>
            
         </form>
      </div>
      </div>
   );
}
