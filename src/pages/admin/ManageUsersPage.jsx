import { useEffect, useState } from "react";
import { ToggleButton } from "../../components";
import Pagination from "../../components/Pagination";
import {
  MdClose,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import {
  getAllUsers,
  getUserBlockAndUnblock,
  getUserById,
  getUserDelete,
} from "../../utils/Axios";
import { useSelector } from "react-redux";
import UserDetails from "./UserDetails";
import UserUpdateForm from "./UserUpdateForm";

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
  const [userArrayList, setUserArrayList] = useState({});
  const [showDetailOfUser, setShowDetailOfUser] = useState(false);
  const [updateDetailOfUser, setUpdateDetailOfUser] = useState(false);
  const [blockUnblockUser, setBlockUnblockUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const apiData = await getAllUsers(token);
      setUserArrayList(apiData?.data);
    };
    fetchDataFromApi();
  }, [token]);

  const handleUserDetails = (userId) => {
    setCurrentUserId(userId);
  };

  const handleDeleteUser = async () => {
    await getUserDelete(currentUserId, token);
    setDeleteUser(!deleteUser);
    window.location.reload();
  };

  const handleBlockUnblockUser = async () => {
    await getUserBlockAndUnblock(currentUserId, token);
    setBlockUnblockUser(!blockUnblockUser);
  };

    const userDetailsById = async (id) => {
    const apiData = await getUserById(id, token);
    setUserData(apiData?.data);
    setShowDetailOfUser(!showDetailOfUser);
  };

  return (
    <div className="pb-12">
      <div className="flex flex-row justify-around items-center w-full p-5 bg-[#FFBE2E] rounded-t-xl mt-10">
        <p className="text-black text-lg font-bold w-[25%]  text-center   ">
          User Address
        </p>
        <p className="text-black text-lg font-bold  w-[15%] text-center ">
          Phone Number
        </p>
        <p className="text-black text-lg font-bold  w-[25%] text-center ">
          Email
        </p>
        <p className="text-black text-lg font-bold  w-[20%] text-center  ">
          Action
        </p>
        <p className="text-black text-lg font-bold  w-[15%] text-center   ">
          Account Status
        </p>
      </div>

      {userArrayList?.user &&
        userArrayList?.user.map((data, index) => {
          return (
            <div
              key={data?._id}
              className={`flex flex-col md:flex-row justify-between items-center p-5   ${
                index % 2 !== 0 ? "bg-white" : "bg-slate-50"
              } `}
              onClick={() => handleUserDetails(data?._id)}
            >
              <p className="text-black w-[25%] text-center  ">
                {data?.walletAddress}
              </p>
              <p className="text-black  w-[15%] text-center ">
                +{data?.phone.slice(0, 2)}{" "}
                {data?.phone.slice(2, data?.phone?.length)}
              </p>
              <p className="text-black w-[25%] text-center">{data?.email}</p>
              <div className="text-black  w-[20%] flex flex-row items-center justify-center space-x-5">
                <Tooltip content="View Details">
                  <MdOutlineRemoveRedEye
                    size={24}
                    className="cursor-pointer"
                    onClick={() => userDetailsById(data?._id)}
                  />
                </Tooltip>
                <Tooltip content="Delete User">
                  <MdOutlineDelete
                    size={24}
                    className="cursor-pointer"
                    onClick={() => setDeleteUser(true)}
                  />
                </Tooltip>
                <Tooltip content="Edit Details">
                  <MdOutlineEdit
                    size={24}
                    className="cursor-pointer"
                    onClick={() => setUpdateDetailOfUser(!updateDetailOfUser)}
                  />
                </Tooltip>
                <Tooltip content="Block/Unblock">
                  <ToggleButton
                    size={24}
                    className="cursor-pointer"
                    button={handleBlockUnblockUser}
                    isBlocked={data?.isBlocked}
                  />
                </Tooltip>
              </div>
              <p
                className={`text-black w-[15%] text-center ${
                  data?.isBlocked
                    ? "text-red-500 font-semibold"
                    : "text-green-500 font-semibold"
                }`}
              >
                {data?.isBlocked ? "INACTIVE" : "ACTIVE"}
              </p>
            </div>
          );
        })}

      <div className="bg-white rounded-b-xl">
        <Pagination totalPages={userArrayList?.userCount} />
      </div>

      {deleteUser && (
        <div className="fixed flex items-center justify-center z-10 backdrop-blur-sm h-screen w-full inset-0 ">
          <div className="max-w-lg max-h-fit m-auto bg-white rounded-lg drop-shadow-2xl">
            <div className="flex justify-end items-center py-3 px-4 ">
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
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 ">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 
                bg-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 "
                onClick={() => setDeleteUser(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#FBBE2F]
                 text-black hover:bg-[#fad06e] "
                onClick={handleDeleteUser}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailOfUser && (
        <UserDetails
          data={userData && userData}
          setShowDetailOfUser={setShowDetailOfUser}
          showDetailOfUser={showDetailOfUser}
        />
      )}

      {updateDetailOfUser && <UserUpdateForm setUpdateDetailOfUser={setUpdateDetailOfUser} updateDetailOfUser={updateDetailOfUser} currentUserId={currentUserId}/>}
    </div>
  );
};

export default ManageUsersPage;
