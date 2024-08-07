import { useState } from "react";
import DashboardPage from "./DashboardPage";
import ManageUsersPage from "./ManageUsersPage";
import ManageFAQPage from "./ManageFAQPage";
import AboutUsPage from "./AboutUsPage";
import ManageSupport from "./ManageSupport";

const Dashboard = () => {
    const [isRender, setIsRender] = useState("Dashboard");

    const renderItemComponent = () => {
      switch (isRender) {
        case "Dashboard":
          return <DashboardPage />;
        case "Manage User":
          return <ManageUsersPage/>;
        case "Manage FAQ's":
            return <ManageFAQPage/>;
        case "About Us":
            return <AboutUsPage />;
        case "Manage Support":
              return <ManageSupport />;
        default:
          return null;
      }
    };
  return (
    <div  className="px-24 bg-black min-h-screen bgimage">

      <div className="flex flex-row items-center pt-12 space-x-5 ">
        <p className={`  px-10 py-3 rounded-lg font-semibold whitespace-nowrap
        ${isRender === "Dashboard"
        ? "bg-gradient-to-r from-[#FF4B00] to-[#CFC800] text-white"
        : "bg-white text-slate-500"}`}
          onClick={() => setIsRender("Dashboard")}>Dashboard
          </p>

        <p className={`  px-10 py-3 rounded-lg font-semibold whitespace-nowrap
        ${isRender === "Manage User"
        ? "bg-gradient-to-r from-[#FF4B00] to-[#CFC800] text-white "
        : "bg-white text-slate-500"}`}
          onClick={() => setIsRender("Manage User")}>Manage User</p>

        <p  className={`  px-10 py-3 rounded-lg font-semibold whitespace-nowrap
        ${isRender === "Manage FAQ's"
        ? "bg-gradient-to-r from-[#FF4B00] to-[#CFC800] text-white"
        : "bg-white text-slate-500"}`}
          onClick={() => setIsRender("Manage FAQ's")}>Manage FAQ's</p>

        <p className={`  px-10 py-3 rounded-lg font-semibold whitespace-nowrap
        ${isRender === "About Us"
        ? "bg-gradient-to-r from-[#FF4B00] to-[#CFC800] text-white"
        : "bg-white text-slate-500"}`}
          onClick={() => setIsRender("About Us")}>About Us</p>
          
          <p className={`  px-10 py-3 rounded-lg font-semibold whitespace-nowrap
        ${isRender === "Manage Support"
        ? "bg-gradient-to-r from-[#FF4B00] to-[#CFC800] text-white"
        : "bg-white text-slate-500"}`}
          onClick={() => setIsRender("Manage Support")}>Manage Support</p>
      </div>

      <div>{renderItemComponent()}</div>
    </div>
  )
}

export default Dashboard
