import { useEffect, useState } from "react";
import { ToggleButton } from "../../components";
import Pagination from "../../components/Pagination";
import { ManageUserData } from "../../data/ManageUserData";
import {
  MdClose,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { getAllUsers } from "../../utils/Axios";
import { useSelector } from "react-redux";

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
  const token = useSelector((state) => state.wallet.token);
  const [userArrayList, setUserArrayList] = useState([]);
  const [showDetailOfUser, setShowDetailOfUser] = useState(false);
  const [updateDetailOfUser, setUpdateDetailOfUser] = useState(false);
  const [blockUnblockUser, setBlockUnblockUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const apiData = await getAllUsers(token);
      setUserArrayList(apiData?.data?.user);
    };
    fetchDataFromApi();
  }, [token]);

  const handleUser = (userId) => {
    setCurrentUserId(userId);
    setShowDetailOfUser(!showDetailOfUser);
  };

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

      {
        // userArrayList && userArrayList
        ManageUserData.map((data, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row justify-between items-center p-5 transition-all duration-300 bg-white  ${
                currentUserId === index
                  ? "z-50 drop-shadow-lg transform scale-100 bg-[#f3f3f3] font-bold"
                  : ""
              } `}
              onClick={() => handleUser(index)}
            >
              <p className="text-black w-[20%] text-center  ">{data?.SNo}</p>
              <p className="text-black  w-[20%] text-center ">
                {data?.PhoneNumber}
              </p>
              <p className="text-black  w-[20%] text-center  ">{data?.Email}</p>
              <div className="text-black  w-[20%] flex flex-row items-center justify-center space-x-4">
                <Tooltip content="View Details">
                  <MdOutlineRemoveRedEye size={24} className="cursor-pointer" />
                </Tooltip>
                <Tooltip content="Delete User">
                  <MdOutlineDelete size={24} className="cursor-pointer" onClick={() => setDeleteUser(true)}/>
                </Tooltip>
                <Tooltip content="Edit Details">
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
        })
      }

      <div className="bg-white rounded-b-xl">
        <Pagination />
      </div>

      {deleteUser && (
        <div className="fixed flex items-center justify-center z-10 backdrop-blur-[1px] h-screen w-full inset-0">
          <div className="max-w-lg max-h-fit m-auto bg-white rounded-lg">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-200">
              <h3  className="font-bold text-gray-800">
                Modal title
              </h3>
              <button 
                type="button" 
                className="size-6 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-200
                 text-gray-800 hover:bg-gray-200 " 
                aria-label="Close" 
                onClick={() => setDeleteUser(false)}
              >
                <span className="sr-only">Close</span>
                <MdClose size={20} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="mt-1 text-gray-800 dark:text-neutral-400">
                This is a wider card with supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
              <button 
                type="button" 
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 
                bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 
                dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" 
                onClick={() => setDeleteUser(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#FBBE2F]
                 text-black hover:bg-[#fad06e] focus:outline-none focus:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
          </div>
      )}
    </div>
  );
};

export default ManageUsersPage;
