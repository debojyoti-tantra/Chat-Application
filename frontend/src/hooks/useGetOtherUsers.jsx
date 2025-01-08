import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setOtherUsers } from "../redux/userSlice.js"

const useGetOtherUsers = () => {
   const dispatch = useDispatch();
   
   useEffect(() => {  
      const fetchOtherUsers = async () => {
         try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/v1/user/`, { withCredentials: true });
            // store in store
            dispatch(setOtherUsers(res.data));
         } catch (error) {
            console.log(error);
         }
      };
      fetchOtherUsers();
   }, []);
};

export default useGetOtherUsers;