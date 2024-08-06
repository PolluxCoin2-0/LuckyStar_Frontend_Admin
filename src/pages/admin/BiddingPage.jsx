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

const BiddingPage = () => {
  const walletAddress = useSelector((state) => state.wallet.address);
  const token = useSelector((state) => state.wallet.token);
  const [winningNo, setWinningNo] = useState(0);
  const [stimulateWinningNumberData, setStimulateWinningNumberData] = useState(0);
  const [digit, setDigit] = useState(0);
  const [multiplierValue, setMultiplierValue] = useState(0);

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
    setStimulateWinningNumberData(apiData?.data);
    console.log(apiData);

    const transaction = await getApproval(walletAddress, apiData?.data);

    const signedTransaction1 = await window.pox.signdata(
      transaction?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
    );

    const apiDataWinningNumber = await submitWinningNumber(winningNo, walletAddress, token)
    console.log("submitWinningNumber", apiDataWinningNumber);
    const signedTransaction2 = await window.pox.signdata(
      apiDataWinningNumber?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction2[1]))
    );
  };

  const handleSetmultiplier = async ()=>{
    const apiData = await setMultiplier(digit, multiplierValue, walletAddress, token)
    setDigit(0);
    setMultiplierValue(0);
  }

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
            Submit Winning Number
          </button>
        </div>

        <div className="w-full">
          <p className="font-semibold text-xl mt-10 w-[40%] whitespace-nowrap bg-gray-100 border-gray-200 border-[1px] rounded-md py-[10px] px-2 text-center text-gray-600">
          {stimulateWinningNumberData && stimulateWinningNumberData}
          </p>
        </div>
      </div>
      <div className="mt-5 pt-6 pb-12">
        <p className="text-white text-3xl font-semibold">Set Multiplier</p>
        <div className="flex flex-col items-start bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <div className="w-full mb-6">
        <label className="block text-white text-lg font-semibold mb-2" htmlFor="digit">Digit</label>
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
        <label className="block text-white text-lg font-semibold mb-2" htmlFor="multiplier">Multiplier</label>
        <input
          type="number"
          id="multiplier"
          className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter multiplier"
          value={multiplierValue}
          onChange={(e) => setMultiplierValue(e.target.value)}
        />
      </div>
      
      <button onClick={handleSetmultiplier}
      className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gradient-to-r from-[#FF4B00] to-[#CFC800] rounded-md hover:from-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
        Submit
      </button>
    </div>
      </div>
    </div>
  );
};

export default BiddingPage;
