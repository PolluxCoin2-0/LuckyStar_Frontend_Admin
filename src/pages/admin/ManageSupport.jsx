import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { AiOutlineEye } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { deleteTicket, getAllTickets } from "../../utils/Axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageSupport = () => {
  const token = useSelector((state) => state.wallet.token);

  const [queryList, setQueryList] = useState({});

  useEffect(() => {
    const fetchQueryList = async () => {
      try {
        const response = await getAllTickets(token);
        setQueryList(response.data);
      } catch (error) {
        console.error("Error fetching query list", error);
      }
    };
    fetchQueryList();
  }, []);

  const handleDeleteTicket = async(id)=>{
    const apiData = await deleteTicket(token, id);
    if(apiData?.statusCode===200){
      toast.success("Query deleted successfully.")
      return;
    }
  }

  return (
    <div className="pb-12">
      <div className="flex flex-row justify-around items-center w-full p-5 bg-[#FFBE2E] rounded-t-xl mt-10">
        <p className="text-black text-lg font-bold w-[20%]  text-center ">ID</p>
        <p className="text-black text-lg font-bold  w-[40%] text-center ">
          SUBJECT
        </p>
        <p className="text-black text-lg font-bold  w-[20%] text-center ">
          EMAIL
        </p>
        <p className="text-black text-lg font-bold  w-[10%] text-center  ">
          ACTION
        </p>
        <p className="text-black text-lg font-bold  w-[10%] text-center ">
          ACCOUNT STATUS
        </p>
      </div>

      {queryList &&
        queryList?.ticket?.map((data, index) => {
          return (
            <>
                <div
                  key={index}
                  className={`flex flex-row justify-around items-center cursor-pointer p-5  ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <p className="text-black w-[20%] text-center  ">
                    {data?._id}
                  </p>
                  <p className="text-black  w-[40%] text-center ">
                    {data?.subject}
                  </p>
                  <p className="text-black  w-[20%] text-center  ">
                    {data?.email}
                  </p>
                  <div className="text-black  w-[10%] flex justify-center items-center space-x-4">
              <Link to={`/admin/dashboard/supportdetailspage/${data?._id}`}>
                    <AiOutlineEye size={20} className="cursor-pointer" />
                    </Link>
                    <MdDeleteOutline size={20} className="cursor-pointer" onClick={()=>handleDeleteTicket(data?._id)} />
                  </div>
                  <p className="text-black w-[10%] text-center ">
                    {data?.status}
                  </p>
                </div>
           
            </>
          );
        })}

      <div className="bg-white rounded-b-xl">
        <Pagination totalPages={queryList?.ticketCount} />
      </div>
    </div>
  );
};

export default ManageSupport;
