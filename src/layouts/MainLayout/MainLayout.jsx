import { Outlet } from "react-router-dom";
import Navbar from "../../pages/shared/Navbar/Navbar";
import useLinks from "../../hooks/Links/useLinks";

const MainLayout = () => {
  const links = useLinks();
  return (
    <div>
      <Navbar links={links} >
        <Outlet></Outlet>
      </Navbar>
    </div>
  );
};

export default MainLayout;
