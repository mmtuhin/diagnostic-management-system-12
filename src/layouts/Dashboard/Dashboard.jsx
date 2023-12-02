import { Outlet } from "react-router-dom";
import Navbar from "../../pages/shared/Navbar/Navbar";
import useDashboardLinks from "../../hooks/Links/useDashboardLinks";

const Dashboard = () => {
    const links = useDashboardLinks()
  return (
    <div>
      <Navbar links={links}>
        <Outlet></Outlet>
      </Navbar>
    </div>
  );
};

export default Dashboard;
