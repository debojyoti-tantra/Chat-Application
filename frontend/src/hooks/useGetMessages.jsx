import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { setSelectedUser } from "../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const useGetMessages = () => {
   const { selectedUser } = useSelector(store=>store.user);
   const dispatch = useDispatch();
   
   useEffect(() => { 
      const fetchMessages = async () => {
         try {
            axios.defaults.withCredentials=true;
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/v1/message/${selectedUser?._id}`);
            dispatch(setMessages(res.data));
         } catch (error) {
            console.log(error);
         }
      };
      fetchMessages();
   }, [selectedUser]);
};

export default useGetMessages;
