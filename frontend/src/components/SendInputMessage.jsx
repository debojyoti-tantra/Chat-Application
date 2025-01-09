import React from "react";
import { IoSend } from "react-icons/io5";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import toast from "react-hot-toast";

export default function SendInputMessage() {
   const [message, setMessage] = useState("");
   const dispatch = useDispatch();
   const {selectedUser} = useSelector(store=>store.user)
   
   const {messages} = useSelector(store=>store.message);
   
   const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
         if (message.trim()==="") {
            toast.error("Message can't be empty")
         } else {
            const res = await axios.post(`https://chat-application-p97k.onrender.com/api/v1/message/send/${selectedUser?._id}`, {message}, {
               headers:{
                  'Content-Type':'application/json'
               },
               withCredentials:true
            });
            console.log(res);
            dispatch(setMessages([...messages, res?.data?.newMessage]));
         }
      } catch (error) {
         console.log(error);
      }
      
      setMessage("");
   };
   
   return (
      <>
         <form onSubmit={onSubmitHandler} className="flex flex-row justify-center items-center">
            <input
               value={message}
               onChange={(e)=>setMessage(e.target.value)}
               type="text"
               placeholder="send a message..." 
               className="border text-base rounded-lg w-full p-2 border-slate-200 bg-green-950 text-white h-10" 
            />
            <button type="submit" className="border border-slate-200 rounded-lg p-2 m-2 bg-green-950 h-10 w-12 flex justify-center items-center">
               <IoSend className="text-2xl" />
            </button>
         </form>
      </>
   );
}
