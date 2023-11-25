import { Link, Outlet } from "react-router-dom";
import { useDarkContext } from "../App";

function SettingSidebar() {
  const { isDark } = useDarkContext();

  return (
    
      <div className={`drawer lg:drawer-open  ${isDark ? "" : "bg-gray-200"}`}>
         <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
         <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet/>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label> 
        </div> 
      
        <div className={`drawer-side ${isDark ? "" : "bg-gray-400"}`}>
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className={`${isDark ? "" : "bg-gray-300"} menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-5`}>
            {/* Sidebar content here */}
            <li>
              <Link to={"/settings/changeprofile"}><p className={`${isDark ? "" : "text-gray-600"}`}>Change Profile</p></Link>
            </li>
            <li>
              <Link to={"/settings/changepassword"}><p className={`${isDark ? "" : "text-gray-600"}`}>Change Password</p></Link>
            </li>
            <li>
              <Link to={"/settings/changeavatar"}><p className={`${isDark ? "" : "text-gray-600"}`}>Change Avatar</p></Link>
            </li>
          </ul>
        </div>
      
    </div>
  );
}

export default SettingSidebar;
