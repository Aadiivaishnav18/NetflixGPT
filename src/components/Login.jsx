import Header from "./Header";
import { useRef, useState } from "react";
import { validationData } from "../utils/validationData";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firsebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = validationData(
      isSignInForm ? "" : name.current.value,
      email.current.value,
      password.current.value
    );

    setErrorMessage(message);
  if(message) return;

  if(!isSignInForm){

    // Sign up Logic 
createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
// it will return promise -----------
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
     console.log(user);
     navigate("/browse");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+ "-" + errorMessage);
  });
  }

  else{
    // Sign in Logic
    signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    navigate("/browse");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   setErrorMessage(errorCode+ "-" + errorMessage);
  });


  }
  
 


  }; 

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/ab1fe332-993a-44d1-b60b-cd4f8d11b96e/web/IN-en-20260928-TRIFECTA-perspective_85aef51c-94d6-41ea-a1ea-1e77199158f1_large.jpg"
        alt="background-img"
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Header */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="w-3/12 absolute p-8 bg-black/70 my-32 mx-auto right-0 left-0 text-white bg-opacity-90"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Full Name - Only for Sign Up */}
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-4 bg-gray-700 rounded-lg outline-none w-full"
          />
        )}

        {/* Email */}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-3 my-4 bg-gray-700 rounded-lg outline-none w-full"
        />  

        {/* Password */}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 my-4 bg-gray-700 rounded-lg outline-none w-full"
        />

        {/* Error Message */}
        <div>
          {errorMessage && (
            <p className="text-sm font-medium leading-5 text-red-500">
              {errorMessage}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 font-bold p-4 my-5 rounded-lg transition w-full"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle Sign In / Sign Up */}
        <p
          className="p-2 cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now..."
            : "Already registered? Sign In Now..."}
        </p>
      </form>
    </div>
  );
};

export default Login;

