import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicketDetailsById, postAddTicketAnswer } from "../../utils/Axios";
import { useSelector } from "react-redux";
import { IoSendSharp } from "react-icons/io5";
import moment from "moment";

const SupportDetailsPage = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.wallet.token);
  const currentUserId = useSelector((state) => state.wallet.userId); 

  const [queryDetails, setQueryDetails] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchQueryDetails = async () => {
      const apiData = await getTicketDetailsById(token, id);
      setQueryDetails(apiData?.data);
    };
    fetchQueryDetails();
  }, [token, id]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    const response = await postAddTicketAnswer(token, id, message);
    if (response) {
      const newReply = {
        _id: currentUserId,
        message: message,
        createdAt: new Date().toISOString(),
      };
      setQueryDetails((prev) => ({
        ...prev,
        replies: [...prev.replies, newReply],
      }));
      setMessage(""); 
    }
  };

  const formatTime = (timestamp) => {
    const now = moment();
    const time = moment(timestamp);
    const diff = now.diff(time, "hours");

    if (diff < 1) return `${now.diff(time, "minutes")} minutes ago`;
    if (diff < 24) return `${diff} hours ago`;
    if (diff < 48) return `Yesterday`;
    return time.format("MMM DD, YYYY");
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-black bgimage text-white pb-12">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 shadow-lg bg-white rounded-lg overflow-y-scroll">
        <div className="p-8">
          <h2 className="text-center lg:text-center text-black font-serif text-4xl font-semibold mb-2">
            Solve Query
          </h2>
          <form className="" onSubmit={handleSubmitAnswer}>
            <div className="flex flex-row items-center space-x-4 mb-4">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="user-image"
                className="h-10"
              />
              <p className="text-black font-semibold">
                {queryDetails?.email}
              </p>
            </div>
            <p className="w-full h-14 shadow-sm text-black text-lg font-medium rounded-lg border border-gray-300 bg-gray-100 py-2 px-4 flex items-center mb-4">
              {queryDetails?.subject || "Loading..."}
            </p>
            {queryDetails?.replies &&
              queryDetails?.replies.map((reply) => {
                const isCurrentUser = reply?._id === currentUserId;
                return (
                  <div
                    key={reply?._id}
                    className={`flex mb-4 ${
                      isCurrentUser ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-sm p-4 rounded-lg text-white ${
                        isCurrentUser
                          ? "bg-gray-300 text-black rounded-bl-none"
                          : " bg-gradient-to-r from-orange-500 to-yellow-500 rounded-br-none"
                      }`}
                    >
                      <p>{reply?.message}</p>
                      <p className="text-xs mt-2 text-gray-200 text-right">
                        {formatTime(reply?.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}

            <div className="relative">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                className="w-full min-h-[50px] shadow-sm resize-none text-black placeholder-gray-500 text-lg font-normal rounded-lg border border-gray-300 
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
