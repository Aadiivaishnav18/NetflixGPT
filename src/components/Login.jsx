import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
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

      {/* Content */}
      <div className="relative z-10">
        <Header />
      </div>

      <form className="w-3/12 absolute p-10 bg-black/70 my-36 mx-auto right-0 left-0 text-white bg-opacity-90 ">
        <h1 className="font-bold text-3xl py-4">
          {" "}
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Only show the Full Name input field if it's not the sign-in form */}
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 my-4 bg-gray-700 rounded-lg outline-none w-full"
          />
        )}

        <input
          type="text"
          placeholder="Email Address"
          className="p-3 my-4 bg-gray-700 rounded-lg outline-none w-full"
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 my-4 bg-gray-700 rounded-lg outline-none w-full"
        />

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 font-bold p-4 my-6 rounded-lg transition w-full "
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className=" p-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? " New to Netflix? Sign Up Now..."
            : "Already registered ? Sign In Now..."}
        </p>
      </form>
    </div>
  );
};

export default Login;
