import { Outlet } from "react-router-dom";
import Navbar from "../../pages/shared/Navbar/Navbar";
import useLinks from "../../hooks/Links/useLinks";
import Footer from "../../pages/shared/Footer/Footer";

const MainLayout = () => {
  const links = useLinks();
  return (
    <div>
      <Navbar links={links} >
        <Outlet></Outlet>
        <Footer></Footer>
      </Navbar>
    </div>
  );
};

export default MainLayout;
