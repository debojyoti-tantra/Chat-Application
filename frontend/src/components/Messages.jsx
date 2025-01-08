import React from "react";
import Message from "./Message.jsx";
import useGetMessages from "../hooks/useGetMessages.jsx";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage.jsx";
import { useSelector, useDispatch } from 'react-redux';

export default function Messages() {
   useGetMessages();
   useGetRealTimeMessage();
   const {messages} = useSelector(store=>store.message);
   
   if (!messages) return;
   
   return (
      <div>
         
         {
            messages?.map((message) => {
               return (
                  <Message key={message._id} message={message} />
               )
            })
         }
         
      </div>
   );
}
