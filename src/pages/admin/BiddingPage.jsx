import { useSelector } from "react-redux";
import {
  endBidding,
  getApproval,
  setMultiplier,
  startBidding,
  stimulateWinningNumber,
  submitWinningNumber,
} from "../../utils/Axios";
import { useState } from "react";
import { toast } from "react-toastify";

const BiddingPage = () => {
  const walletAddress = useSelector((state) => state.wallet.address);
  const token = useSelector((state) => state.wallet.token);
  const [winningNo, setWinningNo] = useState(0);
  const [stimulateWinningNumberData, setStimulateWinningNumberData] =
    useState(0);
  const [digit, setDigit] = useState(0);
  const [multiplierValue, setMultiplierValue] = useState(0);

  const handleStartBidding = async () => {
    const apiData = await startBidding(token, walletAddress);

    const signedTransaction1 = await window.pox.signdata(
      apiData?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
    );
  };

  const handleEndBidding = async () => {
    const apiData = await endBidding(walletAddress, token);

    const signedTransaction1 = await window.pox.signdata(
      apiData?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
    );
  };

  const fetchStimulateNumber = async () => {
    // length should be 5 of winning no.
    if (winningNo.length < 5) {
      toast.error("Enter at least 5 digit number");
      return;
    }
    const apiData = await stimulateWinningNumber(winningNo, token);
    setStimulateWinningNumberData(apiData?.data);
    console.log(apiData);
  };

  const handleWinningNumber = async () => {
    const transaction = await getApproval(walletAddress, winningNo);

    const signedTransaction1 = await window.pox.signdata(
      transaction?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
    );

    const apiDataWinningNumber = await submitWinningNumber(
      winningNo,
      walletAddress,
      token
    );
    console.log("submitWinningNumber", apiDataWinningNumber);

    const signedTransaction2 = await window.pox.signdata(
      apiDataWinningNumber?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction2[1]))
    );
  };

  const handleSetmultiplier = async () => {
    const apiData = await setMultiplier(
      digit,
      multiplierValue,
      walletAddress,
      token
    );

    const signedTransaction1 = await window.pox.signdata(
      apiData?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
    );

    setDigit(0);
    setMultiplierValue(0);
  };

  return (
    <div className="px-24 bg-black min-h-screen bgimage">
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

      <div className="flex flex-row justify-between items-center bg-white rounded-xl p-10 mt-5 shadow-lg space-x-10">
        <div className="w-full">
          <p className="text-lg font-semibold text-gray-700 pb-2">
            Stimulation No
          </p>
          <input
            type="number"
            id="winningNo"
            className="w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 p-4 text-gray-700 placeholder-gray-400"
            placeholder="Enter Stimulation Number"
            value={winningNo}
            onChange={(e) => setWinningNo(e.target.value)}
          />
          <button
            className="w-full py-3 font-semibold mt-5 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-lg hover:from-orange-600 hover:to-yellow-500 transition-all focus:outline-none focus:ring-2 focus:ring-orange-300"
            onClick={fetchStimulateNumber}
          >
            Start Stimulation
          </button>
        </div>

        <div className="w-full">
          <p className="text-lg font-semibold text-gray-700 pb-2">Winning No</p>
          <div className="flex justify-center items-center bg-gray-100 border-gray-200 border rounded-lg h-[45px] text-center text-xl text-gray-700">
            {stimulateWinningNumberData ? stimulateWinningNumberData : "0"}
          </div>
          <button
            className="w-full py-3 font-semibold mt-5 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-lg hover:from-orange-600 hover:to-yellow-500 transition-all focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={handleWinningNumber}
          >
            Submit Winning Number
          </button>
        </div>
      </div>

      {/* SET MULTIPLIER */}
      <div className="mt-5 pt-6 pb-12 ">
        <p className="text-white text-3xl font-semibold">Set Multiplier</p>
        <div className="flex flex-row items-center space-x-10 bg-white p-8 rounded-lg shadow-lg  mt-10 w-full">
          <div className="w-full mb-6">
            <label
              className="block text-slate-500 text-lg font-semibold mb-2"
              htmlFor="digit"
            >
              Digit
            </label>
            <input
              type="number"
              id="digit"
              className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter digit"
              value={digit}
              onChange={(e) => setDigit(e.target.value)}
            />
          </div>

          <div className="w-full mb-6">
            <label
              className="block text-slate-500 text-lg font-semibold mb-2"
              htmlFor="multiplier"
            >
              Multiplier
            </label>
            <input
              type="number"
              id="multiplier"
              className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter multiplier"
              value={multiplierValue}
              onChange={(e) => setMultiplierValue(e.target.value)}
            />
          </div>

          <button
            onClick={handleSetmultiplier}
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gradient-to-r from-[#FF4B00] to-[#CFC800] rounded-md hover:from-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;
