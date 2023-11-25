import axios from "axios";
import { Link } from "react-router-dom";
import { updateData, useUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDarkContext } from "../App";

function Profile() {
  const { isDark ,setRender,render} = useDarkContext();
const [firstname,setFirstname]=useState('')

  const user = useUser();



  return (
    <div
      className={`flex flex-col gap-10 justify-center items-center h-screen ${
        isDark ? "" : "bg-gray-200"
      }`}
    >
      {/* <h1 className="bg-transparent">here is setting</h1> */}

      <div className="relative w-28 h-28 avatar mt-10">
        <img
          className={`rounded-full border-2 ${
            isDark ? "border-gray-100" : "border-gray-500"
          }  shadow-sm `}
          src={user.data.image}
          alt="user image"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className={`${isDark ? "" : "text-gray-600"}`}>
          Email : {user.data.email}
        </p>
        <p className={`${isDark ? "" : "text-gray-600"}`}>
          Username : {user.data.username}
        </p>
        <p className={`${isDark ? "" : "text-gray-600"}`}>
          Mobile : {user.data.mobile}
        </p>
        <p className={`${isDark ? "" : "text-gray-600"}`}>
          First Name : {user.data.firstname}
        </p>
        <p className={`${isDark ? "" : "text-gray-600"}`}>
          Last Name : {user.data.lastname}
        </p>
        <p className={`${isDark ? "" : "text-gray-600"}`}>
          Gender : {user.data.gender}
        </p>
        <p className={`${isDark ? "" : "text-gray-600"}`}>
          Age : {user.data.age}
        </p>
        <p className={`${isDark ? "" : "text-gray-600"}`}>
          City : {user.data.city}
        </p>
      </div>
    </div>
  );
}

export default Profile;
