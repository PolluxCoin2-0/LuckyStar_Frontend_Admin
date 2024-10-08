/* eslint-disable react/prop-types */
import { RxCross2 } from "react-icons/rx";

const UserDetails = ({ data, setShowDetailOfUser, showDetailOfUser }) => {
  return (
    <div className="fixed overflow-y-auto z-10 backdrop-blur-sm min-h-screen w-full inset-0 flex justify-center items-center top-8 md:top-4 px-4 md:px-4 lg:px-0">
      <div className="w-full md:w-full lg:w-3/5 xl:w-3/5 2xl:w-3/5">
        <div className="bg-white rounded-xl px-8 py-4 pt-[700px] md:pt-12 lg:pt-12 xl:pt-8 pb-8">
          <div className="flex justify-between items-center">
            <p className="font-bold text-2xl tracking-wider pb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B00] to-[#CFC800]">
              USER INFORMATION
            </p>
            <RxCross2
              color="black"
              size={24}
              className="rounded-full bg-gray-100 p-1 cursor-pointer"
              onClick={() => setShowDetailOfUser(!showDetailOfUser)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
      </div>
    </div>
  );
};

export default UserDetails;
