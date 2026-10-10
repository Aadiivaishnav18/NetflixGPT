
import Header from "./Header";
import { useRef, useState } from "react";
import { validationData } from "../utils/validationData";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firsebase";
import { BACK_LOGO, USER_AVTAR } from "../utils/constant";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = validationData(
      isSignInForm ? "" : name.current.value,
      email.current.value,
      password.current.value
    );

    setErrorMessage(message);

    if (message) return;

    try {
      if (!isSignInForm) {
        // Sign Up Logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name.current.value,
          photoURL: USER_AVTAR,
        });

        // Updated profile ko Redux mein bhejo
        const updatedUser = auth.currentUser;

        dispatch(
          addUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
          })
        );

        navigate("/browse");
      } else {
        // Sign In Logic
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        const user = userCredential.user;

        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );

        navigate("/browse");
      }
    } catch (error) {
      setErrorMessage(error.code + " - " + error.message);
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
        src={BACK_LOGO}
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
          {isSignInForm ? "SignIn" : "SignUp"}
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