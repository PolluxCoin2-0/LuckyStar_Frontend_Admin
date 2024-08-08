/* eslint-disable react/prop-types */
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserById } from "../../utils/Axios";

const UserUpdateForm = ({ setUpdateDetailOfUser, updateDetailOfUser, currentUserId }) => {
  const token = useSelector((state) => state.wallet.token);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    userDetailsById(currentUserId);
  }, [currentUserId]);

  const userDetailsById = async (id) => {
    const apiData = await getUserById(id, token);
    setUserData(apiData?.data);
  };

  console.log(userData)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUpdateUser = async () => {
    // Call an update API here with updated userData
    setUpdateDetailOfUser(!updateDetailOfUser);
    console.log("Updated Data:", userData);
  };

  return (
    <div className="fixed overflow-y-auto z-10 backdrop-blur-sm min-h-screen w-full inset-0 flex justify-center items-center">
      <div className="w-full md:w-full lg:w-3/5 xl:w-3/5 2xl:w-3/5">
        <div className="bg-white rounded-xl px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-2xl tracking-wider pb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B00] to-[#CFC800]">
              UPDATE USER INFORMATION
            </p>
            <RxCross2
              color="black"
              size={24}
              className="rounded-full bg-gray-100 p-1 cursor-pointer"
              onClick={() => setUpdateDetailOfUser(!updateDetailOfUser)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {[
              { label: "Email", name: "email", type: "email" },
              { label: "Phone No", name: "phone", type: "tel" },
              { label: "City", name: "city", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "Pincode", name: "zipCode", type: "text" },
              { label: "Referral", name: "referredBy", type: "text" },
              { label: "Blocked", name: "isBlocked", type: "checkbox" },
              { label: "Verified Email", name: "isEmailVerify", type: "checkbox" },
              { label: "Wallet Address", name: "walletAddress", type: "text", isWide: true },
              { label: "Referral Code", name: "referralCode", type: "text" },
              { label: "Referral Amount", name: "referralAmount", type: "text" },
            ].map(({ label, name, type, isWide }) => (
              <div className={`mb-4 ${isWide ? 'col-span-1 sm:col-span-2' : ''}`} key={name}>
                <p className="font-semibold text-black text-xl pb-2">{label}</p>
                {type === "checkbox" ? (
                  <input
                    type={type}
                    name={name}
                    checked={userData[name] || false}
                    onChange={handleChange}
                    className="h-6 w-6 text-[#a5a5a5] border-2 border-[#c2c2c2] rounded-lg"
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={userData[name] || ""}
                    onChange={handleChange}
                    className="text-[#a5a5a5] font-medium border-2 border-[#c2c2c2] px-6 py-2 rounded-lg w-full"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleUpdateUser}
              className="px-6 py-2 bg-gradient-to-r from-[#FF4B00] to-[#CFC800] text-white font-semibold rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateForm;
