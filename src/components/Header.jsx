import React from 'react';

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full  bg-gradient-to-b from-black z-10  p-10">
      <img
        className="w-32 sm:w-40 md:w-45 lg:w-50 h-auto"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAQ4TXm1OaapkwYRGseWYrT2HFpAFV7IX9bgV76BxLOD_049HTkgqZ6zq3enQ0gxU1b-868yGZj1I99Ak9oRykNILYsbpT_0d-be9QKbwkD8OfaEdWL-FHZBiORJ9ppzVCM1-mVn63afS.svg"
        alt="Netflix Logo"
      />
    </div>
  );
};

export default Header;