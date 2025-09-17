import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { checkValidateData } from '../Utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Utils/firebase';

function Login() {
  const [isSignInForm, setIsSignInForm] = useState(false);
  const [errorMassage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleButtonClick = () => {
    const emailVal = emailRef.current.value.trim();
    const passwordVal = passwordRef.current.value.trim();
    const nameVal = nameRef.current ? nameRef.current.value.trim() : '';

    console.log('Attempting auth with:', { emailVal, passwordVal, nameVal });

    const message = checkValidateData(emailVal, passwordVal, nameVal);
    setErrorMessage(message);
    if (message) return;

    if (isSignInForm) {
    console.log('Signing in with:', { emailVal, passwordVal });

    signInWithEmailAndPassword(auth, emailVal, passwordVal)
      .then((userCredential) => {
        console.log('User successfully signed in:', userCredential.user);
        navigate('/browse');
      })
      .catch((error) => {
        console.error('Sign In Error:', error.code, error.message);
        setErrorMessage(`${error.code}: ${error.message}`);
      });
} else {
    console.log('Signing up with:', { emailVal, passwordVal });

    createUserWithEmailAndPassword(auth, emailVal, passwordVal)
      .then((userCredential) => {
        console.log('User successfully registered:', userCredential.user);
        navigate('/browse');
      })
      .catch((error) => {
        console.error('Sign Up Error:', error.code, error.message);
        setErrorMessage(`${error.code}: ${error.message}`);
      });
}

  };

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
    setErrorMessage('');
  };

  return (
    <div className="absolute">
      <Header />
      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4 text-white">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg bg-opacity-40 text-white"
        />
        {isSignInForm && (
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
        <button type="button" className="p-2 my-2 bg-red-600 w-full text-white text-xl rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className="py-4 text-white underline cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? 'New to Netflix? Sign Up' : 'Already Registered? Sign In Now'}
        </p>
      </form>
      <div>
        <img
          alt=""
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_small.jpg"
        />
      </div>
    </div>
  );
}

export default Login;
