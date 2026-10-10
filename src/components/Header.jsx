import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firsebase";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addUser, removeUser} from "../utils/userSlice"
import { LOGO } from "../utils/constant";

const Header = () => {

  const [isSignOut, setIsSignOut] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        setIsSignOut(true);

      })
      .catch((error) => {
        // An error happened
        console.log(error);
        navigate("/error");
      });
  };

  //-------------------OnAuthStateChanged(Complete Routing is handle from here now whenever the user SignIn or SignOut)-----------------//

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Firebase se latest profile data reload karo
      await user.reload();

      const updatedUser = auth.currentUser;

      dispatch(
        addUser({
          uid: updatedUser.uid,
          email: updatedUser.email,
          displayName: updatedUser.displayName,
          photoURL: updatedUser.photoURL,
        })
      );
    } else {
      dispatch(removeUser());
      navigate("/");
    }
  });

  return () => unsubscribe();
}, []);


  return (
    <div className="absolute top-0 left-0 z-10 w-full bg-gradient-to-b from-black to-transparent px-6 py-5 sm:px-10 sm:py-6 flex items-center justify-between">
      
      {/* Netflix Logo */}
      <img
        className="w-28 sm:w-36 md:w-40 lg:w-44 h-auto"
        src={LOGO}
        alt="Netflix Logo"
      />

      {/* Right Side */}
     {user && (
      <div className="flex items-center gap-4">

        <img
          className="w-9 h-9 sm:w-10 sm:h-10 object-cover"
          alt="user icon"
          src= {user?.photoURL}
        />

        <button
          onClick={handleSignOut}
          className="font-bold text-white hover:text-gray-300 transition cursor-pointer"
        >
    SignOut
        </button>

      </div>
     )} 
         </div>
  );
};

export default Header;