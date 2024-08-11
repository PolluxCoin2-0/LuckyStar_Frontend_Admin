import { useState } from "react";
import DashboardPage from "./DashboardPage";
import ManageUsersPage from "./ManageUsersPage";
import ManageFAQPage from "./ManageFAQPage";
import ManageSupport from "./ManageSupport";

const Dashboard = () => {
  const [isRender, setIsRender] = useState("Dashboard");

  const renderItemComponent = () => {
    switch (isRender) {
      case "Dashboard":
        return <DashboardPage />;
      case "Manage User":
        return <ManageUsersPage />;
      case "Manage FAQ's":
        return <ManageFAQPage />;
      case "Manage Support":
        return <ManageSupport />;
      default:
        return null;
    }
  };
  return (
    <div className="px-4 md:px-4 lg:px-12 xl:px-24 2xl:px-24 bg-black min-h-screen bgimage">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 pt-12 max-w-screen-md">
        {[
          { label: "Dashboard", key: "Dashboard" },
          { label: "Manage User", key: "Manage User" },
          { label: "Manage FAQ's", key: "Manage FAQ's" },
          { label: "Manage Support", key: "Manage Support" },
        ].map((item) => (
          <p
            key={item.key}
            className={`px-0 py-3 rounded-lg font-semibold whitespace-nowrap text-center ${
              isRender === item.key
                ? "bg-gradient-to-r from-[#FF4B00] to-[#CFC800] text-white"
                : "bg-white text-slate-500"
            } `}
            onClick={() => setIsRender(item.key)}
          >
            {item.label}
          </p>
        ))}
      </div>

      <div>{renderItemComponent()}</div>
    </div>
  );
};

export default Dashboard;
