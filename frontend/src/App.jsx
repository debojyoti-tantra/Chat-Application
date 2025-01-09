import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import { useSelector, useDispatch } from 'react-redux';
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice.js';

const router = createBrowserRouter([
   {
      path: "/",
      element: <HomePage />,
   },
   {
      path: "/register",
      element: <Signup />,
   },
   {
      path: "/login",
      element: <Login />,
   },
]);

function App() {
   // const [socket, setSocket] = useState(null);
   const {authUser} = useSelector(store=>store.user);
   const {socket} = useSelector(store=>store.socket);
   const dispatch = useDispatch();
   
   useEffect(() => {  
      if (authUser) {
         const socket = io(`https://chat-application-backend-green.vercel.app/`, {
            // we can pass query i.e, we can get this via backend
            query: {
               userId: authUser._id
            }
         });
         // setSocket(socket);
         dispatch(setSocket(socket));
         
         //recive data from backend
         socket.on('getOnlineUsers', (onlineUsers) => {
            dispatch(setOnlineUsers(onlineUsers));
            // console.log(dispatch(setOnlineUsers(onlineUsers)));
         });
         
         return ()=> socket.close();
         
      } else {
         if (socket) {
            socket.close();
            dispatch(setSocket(null));
         }
      }
   }, [authUser]);
   
   return (
      <div className="min-h-[90vh] sm:min-h-[86vh] flex justify-center">
         <RouterProvider router={router} />
      </div>
   )
}

export default App
