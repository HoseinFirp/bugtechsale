import { Link, Outlet } from "react-router-dom";
import { useDarkContext } from "../App";

function SettingSidebar() {
  const { isDark } = useDarkContext();

  return (
    <div className={`drawer  lg:drawer-open  ${isDark ? "" : "bg-gray-200"}`}>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="h-screen drawer-content flex flex-col items-center justify-center md:mb-20">
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className={`mt-5 btn z-20 drawer-button lg:hidden ${
            isDark
              ? ""
              : "bg-gray-400 text-gray-100 hover:bg-gray-500 border-none"
          }`}
        >
          Open drawer
        </label>
      </div>

      <div className={`z-20 drawer-side  md:mt-16 sm:mt-16 mt-16 lg:mt-0`}>
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className={`drawer-overlay `}
        ></label>
        <ul
          className={`${
            isDark ? "" : "bg-gray-300"
          } menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-5 `}
        >
          {/* Sidebar content here */}
          <li>
            <Link to={"/settings/changeprofile"}>
              <p className={`${isDark ? "" : "text-gray-600"} `}>
                Change Profile
              </p>
            </Link>
          </li>
          <li>
            <Link to={"/settings/changepassword"}>
              <p className={`${isDark ? "" : "text-gray-600"}`}>
                Change Password
              </p>
            </Link>
          </li>
          <li>
            <Link to={"/settings/changeavatar"}>
              <p className={`${isDark ? "" : "text-gray-600"}`}>
                Change Avatar
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingSidebar;
