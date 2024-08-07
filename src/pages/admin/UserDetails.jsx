/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const UserDetails = ({ data }) => {
  return (
    <div className="bgimage bg-black text-white min-h-screen px-6 md:px-24 py-12 flex flex-col items-center">
      <div className="w-full md:w-full lg:w-3/5 xl:w-3/5 2xl:w-3/5">
        <p className="font-bold text-2xl tracking-wider pb-8 text-center">
          USER INFORMATION
        </p>

        <div className="bg-white rounded-xl px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">Email</p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg">
                {data?.email}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">Phone No</p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg">
                +{data?.phone.slice(0, 2)}{" "}
                {data?.phone.slice(2, data?.phone?.length)}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">City</p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg">
                {data?.city}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">State</p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg">
                {data?.state}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">Pincode</p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg">
                {data?.zipCode}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">Referral</p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg h-[43px]">
                {data?.referredBy}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">Blocked</p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg">
                {data?.isBlocked ? "False" : "True"}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">
                Verified Email
              </p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg">
                {data?.isEmailVerify ? "True" : "False"}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">City</p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg">
                {data?.city}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">State</p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg">
                {data?.state}
              </p>
            </div>

            <div className="col-span-1 sm:col-span-2 mb-4">
              <p className="font-semibold text-black text-xl pb-2">
                Wallet Address
              </p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg break-words">
                {data?.walletAddress}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">
                Referral Code
              </p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg">
                {data?.referralCode}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-black text-xl pb-2">
                Referral Amount
              </p>
              <p className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg">
                {data?.referralAmount}
              </p>
            </div>
          </div>
        </div>

        <Link to="/" className="text-center">
          <button
            type="button"
            className="bg-gradient-to-r from-[#FF4B00] to-[#CFC800] py-3 px-4 text-center whitespace-nowrap font-bold rounded-xl text-xl text-white focus:outline-none my-6 w-full"
          >
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
