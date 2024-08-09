import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicketDetailsById, postAddTicketAnswer } from "../../utils/Axios";
import { useSelector } from "react-redux";
import { IoSendSharp } from "react-icons/io5";

const SupportDetailsPage = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.wallet.token);

  const [queryDetails, setQueryDetails] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchQueryDetails = async () => {
      const apiData = await getTicketDetailsById(token, id);
      console.log(apiData);
      setQueryDetails(apiData?.data);
    };
    fetchQueryDetails();
  }, [token, id]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    await postAddTicketAnswer(token, id, message);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-black bgimage text-white">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 shadow-lg bg-white rounded-lg">
        <div className="p-8">
          <h2 className="text-center lg:text-left text-black font-serif text-4xl font-semibold mb-9">
            Solve Query
          </h2>
          <form className="space-y-6" onSubmit={handleSubmitAnswer}>
            <p className="w-full h-14 shadow-sm text-black text-lg font-medium rounded-lg border border-gray-300 bg-gray-100 py-2 px-4 flex items-center">
              {queryDetails?.subject || "Loading..."}
            </p>

            <div className="relative">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                className="w-full min-h-[20px] shadow-sm resize-none text-black placeholder-gray-500 text-lg font-normal rounded-lg border border-gray-300 
                bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 pt-2 pr-12"
                placeholder="Write your message here..."
                value={message}
              />

              <button
                type="submit"
                className="absolute right-4 bottom-6 p-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 cursor-pointer hover:opacity-90"
              >
                <IoSendSharp size={24} color="white" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SupportDetailsPage;
