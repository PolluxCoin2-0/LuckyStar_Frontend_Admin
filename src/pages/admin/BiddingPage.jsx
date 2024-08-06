import { useSelector } from "react-redux";
import {
  endBidding,
  getApproval,
  startBidding,
  stimulateWinningNumber,
} from "../../utils/Axios";
import { useState } from "react";

const BiddingPage = () => {
  const walletAddress = useSelector((state) => state.wallet.address);
  const token = useSelector((state) => state.wallet.token);
  const [winningNo, setWinningNo] = useState(0);

  const handleStartBidding = async () => {
    const apiData = await startBidding(token);
    console.log("startBidding", apiData);

    const signedTransaction1 = await window.pox.signdata(
      apiData?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
    );
  };

  const handleEndBidding = async () => {
    const apiData = await endBidding(walletAddress, token);
    console.log("startBidding", apiData);
  };

  const handleWinningNumber = async () => {
    // length 5
    const apiData = await stimulateWinningNumber(winningNo, token);
    console.log(apiData);

    const transaction = await getApproval(walletAddress, apiData?.amount);

    const signedTransaction1 = await window.pox.signdata(
      transaction?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
    );
  };

  return (
    <div className="px-24 bg-black min-h-screen">
      <div>
        <p className="text-white text-3xl font-semibold pt-16">Bidding</p>
      </div>

      <div className="flex flex-row justify-between items-center space-x-12  bg-white rounded-xl p-10 mt-5 ">
        <button
          className="bg-gradient-to-r from-[#FF4B00] to-[#CFC800] rounded-lg w-full py-4 text-xl font-bold text-white"
          onClick={handleStartBidding}
        >
          Start Bidding
        </button>
        <button
          className="bg-gradient-to-r from-[#FF4B00] to-[#CFC800] rounded-lg w-full py-4 text-xl font-bold text-white"
          onClick={handleEndBidding}
        >
          End Bidding
        </button>
      </div>

      <div className="mt-5 pt-12">
        <p className="text-white text-3xl font-semibold">Submit Winning No</p>
      </div>

      <div className="flex flex-row justify-start items-center space-x-20 bg-white rounded-xl p-10 mt-5 ">
        <div>
          <p className="text-lg font-semibold text-slate-500 pb-4">
            Winning No
          </p>
          <input
            type="number"
            id="winningNo"
            className="w-96 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 p-2"
            placeholder="123456"
            value={winningNo}
            onChange={(e) => setWinningNo(e.target.value)}
          />
        </div>

        <div>
          <button
            className="w-96 py-3 font-semibold mt-10 bg-black text-white rounded-md hover:bg-[#1d1d1d] focus:outline-none"
            onClick={handleWinningNumber}
          >
            Start Bidding
          </button>
        </div>

        <div>
          <p className="font-semibold text-xl mt-10 w-64 bg-gray-100 border-gray-200 border-[1px] rounded-md py-[10px] px-2 text-center text-gray-600">
            Stimulate
          </p>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;
