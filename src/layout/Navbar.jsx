import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo_lucky.png";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setSignup, setToken, setWalletAddress } from "../redux/slice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(false);
  const isUserSignup = useSelector((state)=>state.wallet.signup);
  const mobileSignup = isUserSignup ? "true" : "false";
  const walletAddress = useSelector((state)=>state.wallet.address)

  function truncateString(str, startChars = 6, endChars = 6, separator = '...') {
    if (str.length <= startChars + endChars) {
      return str;
    }
  
    const start = str.substring(0, startChars);
    const end = str.substring(str.length - endChars);
  
    return `${start}${separator}${end}`;
  }

  const handleSignupAndSignup = async () => {
    if (isUserSignup) {
      try {
        dispatch(setToken(""));
        dispatch(setWalletAddress(""));
        dispatch(setEmail(""));
        dispatch(setSignup(!isUserSignup));
        navigate("/wallet");
      } catch (error) {
        console.error("Error during signout:", error);
      }
    } else {
      navigate("/signup");
    }
  };

  return (
    <>
      {/* For md, xl, 2xl Navbar */}
      <div className="hidden md:flex bg-black py-2 flex-row items-center justify-between px-4 lg:px-24">
        <Link to="/">
          <div>
            <img
              src={Logo}
              alt="lucky-star-logo"
              className="w-[127.6px] h-[69.21px]"
            />
          </div>
        </Link>
        <div className="flex flex-row items-center space-x-8">
          <Link to="/admin/dashboard">
            <p className="text-white font-bold cursor-pointer">Dashboard</p>
          </Link>
            <button
              type="button"
              className="bg-white py-2 px-4 w-full text-center font-bold rounded-xl text-black focus:outline-none"
              onClick={handleSignupAndSignup}
            >
              {isUserSignup ? "Sign out" : "Signup"}
            </button>

            <Link to="/wallet">
            <button
              type="button"
              className="bg-[#FBBE2F] py-2 px-4 w-full text-center whitespace-nowrap font-bold rounded-xl text-black focus:outline-none"
            >
              {walletAddress.length>0 ? truncateString(walletAddress):"Connect Wallet"}
            </button>
            </Link>
        </div>
      </div>

      {/* For mobile screen */}
      <div className="md:hidden bg-black py-2 flex flex-row items-center justify-between px-4">
        <Link to="/">
          <img
            src={Logo}
            alt="lucky-star-logo"
            className="w-[127.6px] h-[69.21px]"
          />
        </Link>

        <div
          className="cursor-pointer relative"
          onClick={() => setShowNavbar(!showNavbar)}
        >
          <HiMenu color="white" size={24} />
        </div>

        {showNavbar && (
          <div className="flex flex-col w-[200px] bg-white text-black py-4 space-y-4 absolute top-16 right-4 z-20 rounded-lg shadow-lg">
            <Link
              to="/admin/dashboard"
              className="px-4 py-2 font-semibold hover:bg-gray-200 rounded-lg transition"
            >
              Balance
            </Link>
            <p
              to="/signup"
              className="px-4 py-2 font-semibold hover:bg-gray-200 rounded-lg transition"
              onClick={handleSignupAndSignup}
            >
              {mobileSignup ? "Sign out" : "Signup"}
            </p>
            <Link
              to="/wallet"
              className="px-4 py-2 font-semibold hover:bg-gray-200 rounded-lg transition"
            >
            {walletAddress.length>0 ? truncateString(walletAddress):"Connect Wallet"}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
