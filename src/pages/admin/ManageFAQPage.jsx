import { useEffect, useState } from "react";
import { createFAQ, deleteFaq, getAllFaqList } from "../../utils/Axios";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

const ManageFAQPage = () => {
  const token = useSelector((state) => state.wallet.token);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [faqList, setFaqList] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const handleSubmitFaq = async () => {
    try {
      await createFAQ(token, faqs);
      setFaqs([{ question: "", answer: "" }]); // Reset the form after submission
      getFaqList(); // Refresh the FAQ list
    } catch (error) {
      console.error("Error submitting FAQ:", error);
    }
  };

  useEffect(() => {
    getFaqList();
  }, []);

  const getFaqList = async () => {
    try {
      const apiData = await getAllFaqList(token);
      setFaqList(apiData?.data || []);
    } catch (error) {
      console.error("Error fetching FAQ list:", error);
    }
  };

  const handleDeleteFaq = async (faqId) => {
    await deleteFaq(token, faqId);
    getFaqList();
  };

  return (
    <div>
      <p className="text-xl font-semibold text-white mt-7">Manage FAQ'S</p>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-xl mt-5 p-5 pb-8"
        >
          <p className="text-black text-lg font-bold">FAQ</p>
          <div className="mt-3">
            <p className="text-lg font-semibold">Question:</p>
            <input
              type="text"
              value={faq.question}
              onChange={(e) =>
                handleInputChange(index, "question", e.target.value)
              }
              placeholder="What is Lucky Star?"
              className="mt-2 bg-[#F3F3F3] w-full outline-none rounded-md py-3 p-2"
            />
          </div>
          <div className="mt-3">
            <p className="text-lg font-semibold">Answer:</p>
            <input
              type="text"
              value={faq.answer}
              onChange={(e) =>
                handleInputChange(index, "answer", e.target.value)
              }
              placeholder="Cryptocurrency lending platforms are like intermediaries that connect lenders to borrowers."
              className="mt-2 bg-[#F3F3F3] w-full outline-none rounded-md py-3 p-2"
            />
          </div>
        </div>
      ))}
      <div className="flex justify-center space-x-6">
        <button
          className="px-14 py-3 mt-12 bg-gradient-to-r from-[#FF4B00] to-[#CFC800] text-white font-semibold rounded-lg hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleSubmitFaq}
        >
          Submit
        </button>
      </div>
      <div className="mt-10">
        {faqList &&
          faqList.map((faq) => (
            <div key={faq._id} className="mb-8 flex items-center">
              <details className="group bg-gradient-to-r from-[#FF4B00] to-[#CFC800] rounded-lg w-full">
                <summary className="flex cursor-pointer items-center justify-between p-5 text-lg font-semibold text-white group-open:bg-gradient-to-r from-[#FF4B00] to-[#CFC800] rounded-t-lg">
                  <span>{faq.question}</span>
                  <span className="transition-transform group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="p-5 text-white bg-[#1B1B1B] rounded-b-lg">
                  {faq.answer}
                </p>
              </details>
              <button
                onClick={() => handleDeleteFaq(faq._id)}
                className="ml-4 focus:outline-none"
              >
                <MdDelete color="red" size={24} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageFAQPage;
