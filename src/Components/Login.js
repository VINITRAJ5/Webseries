import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../Utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { LOGO, USER_AVATAR } from "../Utils/constants";
import { addUser } from "../Utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function Login() {
  const [isSignInForm, setIsSignInForm] = useState(true); // ✅ default is login
  const [errorMassage, setErrorMessage] = useState("");
  
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleButtonClick = () => {
  const emailVal = emailRef.current.value.trim();
  const passwordVal = passwordRef.current.value.trim();
  const nameVal = !isSignInForm && nameRef.current ? nameRef.current.value.trim() : '';

  const message = checkValidateData(emailVal, passwordVal, nameVal);
  setErrorMessage(message);
  if (message) return;

  if (isSignInForm) {
    // ✅ Login
    signInWithEmailAndPassword(auth, emailVal, passwordVal)
      .then(() => {
        emailRef.current.value = "";
        passwordRef.current.value = "";
         navigate("/browse"); 
      })
      .catch((error) => {
        setErrorMessage(`${error.code}: ${error.message}`);
      });
  } else {
    // ✅ Register
    createUserWithEmailAndPassword(auth, emailVal, passwordVal)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: nameRef.current.value,
          photoURL: USER_AVATAR,
        }).then(() => {
          const { uid, email, displayName } = auth.currentUser;
          dispatch(
            addUser({
              uid,
              email,
              displayName,
              photoURL: USER_AVATAR,
            })
          );

          // clear inputs
          emailRef.current.value = "";
          passwordRef.current.value = "";
          if (nameRef.current) nameRef.current.value = "";
        });
      })
      .catch((error) => {
        setErrorMessage(`${error.code}: ${error.message}`);
      });
  }
};


  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
    setErrorMessage("");
  };

  return (
    <div className="absolute">
      <Header />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4 text-white">
          {isSignInForm ? "Login" : "Create Account"}
        </h1>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg bg-opacity-40 text-white"
        />
        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-600 rounded-lg bg-opacity-40 text-white"
          />
        )}
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg bg-opacity-40 text-white"
        />
        <p className="text-red-500 py-2">{errorMassage}</p>
        <button
          type="button"
          className="p-2 my-2 bg-red-600 w-full text-white text-xl rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Login" : "Create Account"}
        </button>
        <p
          className="py-4 text-white underline cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Register"
            : "Already Registered? Login Now"}
        </p>
      </form>
      <div>
        <img alt="logo" src={LOGO} />
      </div>
    </div>
  );
}

export default Login;
