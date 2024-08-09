import UserImg from "../../assets/Group.png";
import UserGraphImg from "../../assets/UserGraph.png";
import { FaArrowUpLong } from "react-icons/fa6";
import DailyUserGraph from "../../assets/DailyUserGraph.png";
import BidGraph from "../../assets/BidGraph.png";
import BidImage from "../../assets/BidImg.png";
import { useEffect, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import LineChartComp from "../../components/LineChartComp";
import { getDashboardData } from "../../utils/Axios";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const token = useSelector((state) => state.wallet.token);
  const [isShow, setIsShow] = useState(false);
  const [interval, setInterval] = useState("daily");
  const [dashBoardData, setDashBoardData] = useState({});
  const [chartData, setChartData] = useState([]);

  const toggleDropdown = () => {
    setIsShow(!isShow);
  };

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    setIsShow(false); // Close the dropdown after selection
  };

  useEffect(() => {
    const fetchDashBoardData = async () => {
      const apiData = await getDashboardData(token, interval);
      setDashBoardData(apiData?.data);
      let preparedData = [];
      let xAxisKey = '';
      // Prepare data and set the correct xAxisKey based on the interval
      if (interval === "monthly") {
        preparedData = [
          { month: "Jan", value: apiData?.data?.jan || 0 },
          { month: "Feb", value: apiData?.data?.feb || 0 },
          { month: "Mar", value: apiData?.data?.mar || 0 },
          { month: "Apr", value: apiData?.data?.apr || 0 },
          { month: "May", value: apiData?.data?.may || 0 },
          { month: "Jun", value: apiData?.data?.jun || 0 },
          { month: "Jul", value: apiData?.data?.jul || 0 },
          { month: "Aug", value: apiData?.data?.aug || 0 },
          { month: "Sep", value: apiData?.data?.sep || 0 },
          { month: "Oct", value: apiData?.data?.oct || 0 },
          { month: "Nov", value: apiData?.data?.nov || 0 },
          { month: "Dec", value: apiData?.data?.dec || 0 },
        ];
        xAxisKey = 'month';
      } else if (interval === "weekly") {
        preparedData = [
          { week: "Week 1", value: apiData?.data?.week1 || 0 },
          { week: "Week 2", value: apiData?.data?.week2 || 0 },
          { week: "Week 3", value: apiData?.data?.week3 || 0 },
          { week: "Week 4", value: apiData?.data?.week4 || 0 },
        ];
        xAxisKey = 'week';
      } else if (interval === "daily") {
        preparedData = [
          { day: "Mon", value: apiData?.data?.mon || 0 },
          { day: "Tue", value: apiData?.data?.tue || 0 },
          { day: "Wed", value: apiData?.data?.wed || 0 },
          { day: "Thu", value: apiData?.data?.thu || 0 },
          { day: "Fri", value: apiData?.data?.fri || 0 },
          { day: "Sat", value: apiData?.data?.sat || 0 },
          { day: "Sun", value: apiData?.data?.sun || 0 },
        ];
        xAxisKey = 'day';
      }

      setChartData(preparedData);
    };
    fetchDashBoardData();
  }, [interval]); // Re-fetch data when interval changes

  console.log("interval", interval)

  return (
    <div className="bg-black min-h-screen">
      <div className="flex flex-row mt-10 space-x-12">
        {/* Total User */}
        <div className="bg-white h-auto p-5 rounded-xl shadow-xl px-5 w-[20%]">
          <div className="flex flex-row justify-between space-x-10 items-center">
            <div>
              <img src={UserImg} alt="user image" />
              <p className="text-2xl font-semibold pt-2">
                {dashBoardData && dashBoardData?.totalUser}
              </p>
            </div>
            <div>
              <img src={UserGraphImg} alt="user graph" />
            </div>
          </div>
          <p className="text-[#808080] font-semibold mt-2">Total User</p>
          <div className="flex flex-row mt-2">
            <p className="pt-1 text-[#2E8626]">
              <FaArrowUpLong size={14} />
            </p>
            <p>
              <span className="text-[#2E8626] font-semibold">6%</span>{" "}
              <span className="text-[#B5B5B5]">increase in today</span>
            </p>
          </div>
        </div>

        {/* Daily New User */}
        <div className="bg-white h-auto p-5 rounded-xl shadow-xl px-5 w-[20%]">
          <div className="flex flex-row justify-between space-x-10 items-center">
            <div>
              <img src={UserImg} alt="daily user " />
              <p className="text-2xl font-semibold pt-2">
                {dashBoardData && dashBoardData?.newUsers}
              </p>
            </div>
            <div>
              <img src={DailyUserGraph} alt="" />
            </div>
          </div>

          <p className="text-[#808080] font-semibold mt-2">Daily New User</p>
          <div className="flex flex-row mt-2">
            <p className="pt-1 text-[#2E8626]">
              <FaArrowUpLong size={14} />
            </p>
            <p>
              <span className="text-[#2E8626] font-semibold">13%</span>{" "}
              <span className="text-[#B5B5B5]">increase in today</span>
            </p>
          </div>
        </div>

        {/* Total Bid */}
        <div className="bg-white h-auto p-5 rounded-xl shadow-xl px-4 w-[20%]">
          <div className="flex flex-row justify-between space-x-10 items-center">
            <div>
              <img src={BidImage} alt="user image" />
              <p className="text-2xl font-semibold pt-2">
                {dashBoardData && dashBoardData?.totalBids}
              </p>
            </div>
            <div>
              <img src={BidGraph} alt="user graph" />
            </div>
          </div>
          <p className="text-[#808080] font-semibold mt-2">Total Bid</p>
          <div className="flex flex-row mt-2">
            <p className="pt-1 text-[#2E8626]">
              <FaArrowUpLong size={14} />
            </p>
            <p>
              <span className="text-[#2E8626] font-semibold">27%</span>{" "}
              <span className="text-[#B5B5B5]">increase in today</span>
            </p>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div>
        <div className="flex flex-row relative justify-between mt-10">
          <p className="text-white text-2xl font-semibold">Total User</p>
          <div>
            <button
              type="button"
              className="inline-flex justify-center items-center px-8 rounded-xl py-2 bg-white text-md text-[#808080] font-medium text-light-gray hover:bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent"
              onClick={toggleDropdown}
            >
              {interval.charAt(0).toUpperCase() + interval.slice(1)}
              <HiOutlineChevronDown
                className="-mr-1 ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </button>
          </div>

          {isShow && (
            <div
              className="origin-top-right absolute right-0 top-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleIntervalChange("daily")}
                >
                  Daily
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleIntervalChange("weekly")}
                >
                  Weekly
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleIntervalChange("monthly")}
                >
                  Monthly
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-xl mt-6 h-[610px] w-full">
          <div className="flex items-center px-16 py-10 h-[600px] pt-16">
            <LineChartComp data={chartData} xAxisKey={interval === "monthly" ? "month" : interval === "weekly" ? "week" : "day"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
