import {createBrowserRouter } from "react-router-dom";
import Login from './Login';
import Browse from './Browse';
import { RouterProvider } from "react-router-dom";
import React, { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { addUser, removeUser } from "../Utils/userSlice";
import { useDispatch } from "react-redux";



const Body = () => {

  const dispatch = useDispatch();

        const appRouter=createBrowserRouter([
            {
                path: "/",
                element: <Login/>,
            },
            {
                path: "/browse",
                element: <Browse/>,
            },
        ]);

        useEffect(() => {
          onAuthStateChanged(auth, (user) => {
            if(user) {
              const {uid,email,displayName} = user;
              dispatch(addUser({uid:uid,email:email,displayName:displayName}));
            
            } else {
              dispatch(removeUser());
            }
          });
        },[]);
      

  return (
    <div>
    <RouterProvider router={appRouter}/>
    </div>
  );
};

export default Body;
