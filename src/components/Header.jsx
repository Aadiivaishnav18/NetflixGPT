import { signOut } from "firebase/auth";
import { auth } from "../utils/firsebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {

  const [isSignOut, setIsSignOut] = useState(false);

  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        setIsSignOut(true);
        navigate("/");

      })
      .catch((error) => {
        // An error happened
        console.log(error);
        navigate("/error");
      });
  };

  return (
    <div className="absolute top-0 left-0 z-10 w-full bg-gradient-to-b from-black to-transparent px-6 py-5 sm:px-10 sm:py-6 flex items-center justify-between">
      
      {/* Netflix Logo */}
      <img
        className="w-28 sm:w-36 md:w-40 lg:w-44 h-auto"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAQ4TXm1OaapkwYRGseWYrT2HFpAFV7IX9bgV76BxLOD_049HTkgqZ6zq3enQ0gxU1b-868yGZj1I99Ak9oRykNILYsbpT_0d-be9QKbwkD8OfaEdWL-FHZBiORJ9ppzVCM1-mVn63afS.svg"
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