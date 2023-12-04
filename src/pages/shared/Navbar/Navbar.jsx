import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ThemeChanger from "../../../components/SharedComponents/ThemeChanger";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";


const Navbar = ({ children, links }) => {
  const {user, logOut} = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard");
  // console.log(isDashboard);

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        {isDashboard ? (
          <></>
        ) : (
          <>
            {" "}
            <div className="w-full navbar bg-base-300">
              {/* For hamburger */}
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              {isDashboard ? (
                ""
              ) : (
                <>
                  <div className="flex-1 px-2 mx-2">Mediscan</div>
                  <div className="flex-none hidden lg:block">
                    <ul className="menu menu-horizontal">
                      {/* Navbar menu content here */}
                      {links}
                      <ThemeChanger></ThemeChanger>
                      {user?.email? <button onClick={logOut} className="btn btn-sm">Sign Out</button>
                      : <Link to='/login' className="btn btn-sm">Login</Link>
                    }
                    </ul>
                  </div>
                </>
              )}
            </div>
          </>
        )}
        {/* Page content here */}
        {children}
      </div>
      
      {isDashboard ? (
        <>
          <div className="drawer md:drawer-open ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              {/* <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button md:hidden"
              >
                Open drawer
              </label> */}
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="drawer-side ">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>

              {/* This is the dashboard side panel */}
              <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                {links}
                
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="drawer-side ">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200">
              {/* Sidebar content here */}
              {links}
              {user?.email? <button onClick={logOut} className="btn btn-sm">Sign Out</button>
                      : <Link to='/login' className="btn btn-sm">Login</Link>
                    }
            </ul>
          </div>
        </>
      )}
      
    </div>
  );
};

export default Navbar;
