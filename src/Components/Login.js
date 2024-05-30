import React, { useState } from 'react'
import Header from './Header'

function Login  () {
  const [isSignInForm, setIsSignInForm] = useState();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="absolute">
      <Header />
      <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4 text-white">
          {isSignInForm ? "Sign in" : "Sign Up"}
        </h1>
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg bg-opacity-40 "
        ></input>

          {isSignInForm && (
          <input
          type="text"
          placeholder="Full Name"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg bg-opacity-40"
        ></input>
          )}
        <input
          type="Password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg bg-opacity-40"
        ></input>
        <button className="p-2 my-2 bg-red-600  w-full text-white text-xl rounded-lg">
          {isSignInForm ? "Sign in" : "Sign Up"}
        </button>
        <p
          className="py-4 text-white underline cursor-pointer "
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix,Sign In"
            : "Already Registerd,Login In Now"}
        </p>
      </form>
      <div>
        <img
          alt=""
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a99688ca-33c3-4099-9baa-07a2e2acb398/ca15fd28-b624-4852-8bfe-9cdd5c88475d/IN-en-20240520-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        />
      </div>
    </div>
  );
}

export default Login
