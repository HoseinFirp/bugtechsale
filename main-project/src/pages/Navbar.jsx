import { Link } from "react-router-dom";
import {
  HiOutlineHome,
  HiUser,
  HiMiniCog6Tooth,
  HiMiniArrowLeftOnRectangle,
  HiMiniArrowRightOnRectangle,
  HiMiniChatBubbleLeftEllipsis,
  HiOutlineBugAnt,
  HiOutlineSquares2X2,
  HiArchiveBox,
  HiMoon,
  // HiSun,
  // HiMiniSun,
  HiOutlineSun,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from "../features/cart/cartSlice";
import { updateToken, useUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
// import store from "../store";
import { clearCart } from "./cart/CartSlice";
import { useDarkContext } from "../App";

export const Navbar = () => {
  const [userPic, setUserPic] = useState("");
  const user = useUser();

  const { isDark, setIsDark } = useDarkContext();

  useEffect(() => {
    setUserPic(user.data.image);
  }, [user.data.image]);
console.log(user.data.image)
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const dispatch = useDispatch();

  function ResetHandler() {
    dispatch(updateToken(""));
    dispatch(clearCart());
  }
  return (
    <div className={`navbar ${isDark?'bg-base-200':'bg-gray-300'} sticky top-0 z-10`}>
      <div className="navbar-start flex gap-2">
        <div className="dropdown">
          <label tabIndex={0} className={`btn ${isDark?'btn-ghost':'bg-gray-300 text-base-200 border-none hover:bg-indigo-300'} btn-circle`}>
            <HiOutlineSquares2X2 className="scale-150" />
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52   ${isDark?'bg-base-200':'bg-gray-300'} `}
          >
            <li>
              <Link to="/" className={`${isDark?'':'text-gray-600  hover:text-gray-950 hover:bg-gray-400'}`}>
                <HiOutlineHome />
                Homepage
              </Link>
            </li>
            <li>
              <Link to={"/aboutus"} className={`${isDark?'':'text-gray-600  hover:text-gray-950 hover:bg-gray-400'}`}>
                <HiMiniChatBubbleLeftEllipsis />
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <button className={`btn  ${isDark?'btn-ghost':'bg-gray-300 text-base-200 border-none hover:bg-indigo-300'}`} onClick={()=>setIsDark(cur=>!cur)}>
          {isDark?(
            <HiOutlineSun className="scale-150"/>
          ):(

            <HiMoon className="scale-150 " />
          )}
        </button>
      </div>
      <div className="navbar-center">
        <Link to="/" className={`btn ${isDark?'btn-ghost':'bg-gray-300 text-base-200 border-none hover:bg-indigo-300'} normal-case text-xl`}>
          <HiOutlineBugAnt className="scale-125" />
          BugTech Sale
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className={`btn ${isDark?'btn-ghost':'bg-gray-300 text-base-200 border-none hover:bg-indigo-300'} btn-circle mr-5`}>
            <div className="indicator ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item bg-cyan-950">
                {totalCartQuantity}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className={`card-body ${isDark?'bg-base-200':'bg-gray-300'} rounded-box`}>
              <span className={`font-bold text-lg ${isDark?'':'text-gray-900'}`}>
                {totalCartQuantity} Items
              </span>
              <span className={` ${isDark?'text-info':'text-gray-800'}`}>Total Price: ${totalCartPrice}</span>
              <div className="card-actions">
                <Link to={"/cart"}>
                  <button className={`btn btn-primary btn-block ${isDark?'':'bg-gray-600 hover:bg-gray-800 border-none'}`}>
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-ghost btn-circle">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className={` btn ${isDark?'btn-ghost':'bg-gray-300 text-base-200 border-none hover:bg-indigo-300'} btn-circle avatar`}>
              <div className="w-10 rounded-full">
                {user.token ? (
                  <img src={userPic} alt="" />
                ) : (
                  <img
                    className="bg-slate-200"
                    src="https://kzico.runflare.run/default/profileImage.png"
                    alt=""
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52  ${isDark?'bg-base-200':'bg-gray-300'}`}
            >
              {!user.token ? (
                <li>
                  <Link to="/login" className={`${isDark?'':'text-gray-600  hover:text-gray-950 hover:bg-gray-400'}`}>
                    <HiMiniArrowLeftOnRectangle />
                    Login
                  </Link>
                </li>
              ) : (
                <ul>
                  <li>
                    <Link to="/profile" className={`${isDark?'':'text-gray-600  hover:text-gray-950 hover:bg-gray-400'}`}>
                      <HiUser />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className={`${isDark?'':'text-gray-600  hover:text-gray-950 hover:bg-gray-400'}`}>
                      <HiArchiveBox />
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className={`${isDark?'':'text-gray-600  hover:text-gray-950 hover:bg-gray-400'}`}>
                      <HiMiniCog6Tooth />
                      Settings
                    </Link>
                  </li>
                  <li onClick={ResetHandler}>
                    <Link to="/" className={'text-red-600  hover:text-gray-950 hover:bg-red-600' }>
                      <HiMiniArrowRightOnRectangle />
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </button>
      </div>
    </div>
  );
};
