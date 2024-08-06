import { useState } from "react";
import { ToggleButton } from "../../components";
import Pagination from "../../components/Pagination";
import { ManageUserData } from "../../data/ManageUserData";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute whitespace-nowrap z-10 px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg shadow-sm tooltip -top-10 left-1/2 transform -translate-x-1/2">
          {content}
        </div>
      )}
    </div>
  );
};

const ManageUsersPage = () => {
  return (
    <div className="pb-12">
      <div className="flex flex-row justify-around items-center w-full p-5 bg-[#FFBE2E] rounded-t-xl mt-10">
        <p className="text-black text-lg font-bold w-[20%]  text-center   ">
          #
        </p>
        <p className="text-black text-lg font-bold  w-[20%] text-center ">
          Phone Number
        </p>
        <p className="text-black text-lg font-bold  w-[20%] text-center ">
          Email
        </p>
        <p className="text-black text-lg font-bold  w-[20%] text-center  ">
          Action
        </p>
        <p className="text-black text-lg font-bold  w-[20%] text-center   ">
          Account Status
        </p>
      </div>

      {ManageUserData.map((data, index) => {
        return (
          <div
            key={index}
            className={`flex flex-row justify-around items-center p-5  ${
              index % 2 === 0 ? "bg-white" : "bg-slate-50"
            }`}
          >
            <p className="text-black w-[20%] text-center  ">{data?.SNo}</p>
            <p className="text-black  w-[20%] text-center ">
              {data?.PhoneNumber}
            </p>
            <p className="text-black  w-[20%] text-center  ">{data?.Email}</p>
            <div className="text-black  w-[20%] flex flex-row items-center justify-center space-x-4">
              <Tooltip content="Delete user">
                <MdOutlineDelete size={24} className="cursor-pointer" />
              </Tooltip>
              <Tooltip content="Edit details">
                <MdOutlineEdit size={24} className="cursor-pointer" />
              </Tooltip>
              <Tooltip content="Block/Unblock">
                <ToggleButton size={24} className="cursor-pointer" />
              </Tooltip>
            </div>
            <p className="text-black w-[20%] text-center ">
              {data?.AccountStatus}
            </p>
          </div>
        );
      })}

      <div className="bg-white rounded-b-xl">
        <Pagination />
      </div>
    </div>
  );
};

export default ManageUsersPage;
