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
    setMessage(""); // Clear the message input after submission
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-black text-gray-900 py-12 px-4 md:px-8 lg:px-0 bgimage">
      <div className="w-full max-w-4xl p-0 sm:p-10 lg:p-12 shadow-xl bg-white rounded-xl">
        <div className="p-6 sm:p-8 lg:p-10">
          <h2 className="text-center text-gray-800 font-serif text-4xl font-semibold mb-8">
            Solve Query
          </h2>
          <form onSubmit={handleSubmitAnswer}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="user"
                className="h-16 w-16 rounded-full shadow-md"
              />
              <div className="text-center sm:text-left w-full">
                <p className="text-gray-800 font-bold text-xl">
                  {queryDetails?.email || "Loading..."}
                </p>
                <p className="text-gray-600 text-lg break-words">
                  {queryDetails?.subject || "Loading..."}
                </p>
              </div>
            </div>

            <div className="mb-8">
              {queryDetails?.replies &&
                queryDetails?.replies.map((reply, index) => (
                  <div
                    key={index}
                    className="flex justify-end items-start mb-6"
                  >
                    <div className="bg-yellow-100 text-yellow-900 p-4 rounded-lg max-w-lg shadow-md">
                      <p className="font-medium">{reply?.message}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="relative">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                className="w-full min-h-[120px] shadow-sm resize-none text-gray-800 placeholder-gray-500 text-lg font-normal rounded-lg border border-gray-300 
                bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 pt-4 pr-16"
                placeholder="Write your message here..."
                value={message}
              />
              <button
                type="submit"
                className="absolute right-4 bottom-4 p-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
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
