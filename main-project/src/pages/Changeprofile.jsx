import axios from "axios";
import { useEffect, useState } from "react";
import {
  updateAddress,
  updateAge,
  updateCity,
  updateData,
  updateFirstname,
  updateGender,
  updateLastname,
  updatePhoneNumber,
  updatePostalCode,
  useUser,
} from "../features/user/userSlice";
import Loading from "../alerts/Loading";
import { useDarkContext } from "../App";
import { useDispatch } from "react-redux";

function Changeprofile() {
  const user = useUser();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState(`${user.data.lastname}`);
  const [gender, setGender] = useState(`${user.data.gender}`);
  const [age, setAge] = useState(`${user.data.age}`);
  const [city, setCity] = useState(`${user.data.city}`);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showWarningText, setShowWarningText] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);
  const { isDark, setRender, render } = useDarkContext();
  const dispatch = useDispatch();
  // Fix this
  // const { firstname, lastname, gender, age, city } = user;

  const req = async () => {
    setRender(true);
    setIsLoading(true);
    setShowWarning(false);
    try {
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-profile",
        {
          firstname: `${firstName}`,
          lastname: `${lastName}`,
          gender: `${gender}`,
          age: `${age}`,
          city: `${city}`,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setChangeSuccess(true);
      const req = async () => {
        try {
          const data = await axios.get(
            "http://kzico.runflare.run/user/profile",
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          dispatch(updateData(data.data.user));
        } catch (error) {
          console.log(error.response.data);
        }
      };
      req();
    } catch (error) {
      console.log(error.response.data);
      setShowWarning(true);
      setShowWarningText(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <div className=" flex flex-col items-center z-20">
      {isLoading ? (
        <div className="mt-5">
          <Loading />
        </div>
      ) : null}
      {showWarning ? (
        <div className="alert alert-error mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {showWarningText.map((data) => (
              <p key={data}>{data}</p>
            ))}
          </span>
        </div>
      ) : null}
      {changeSuccess ? (
        <div className="alert alert-success mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your profile changed successfuly!</span>
        </div>
      ) : null}
      <div className="ml-14 mt-10 mb-5 flex flex-col gap-5  items-center ">
        <div className="flex items-center gap-5 w-full">
          <label className={`sm:basis-40 ${isDark ? "" : "text-gray-700"}`}>
            First name
          </label>
          <input
            className={`p-2 z-20 pr-4 pl-4 rounded ${
              isDark ? "" : "bg-gray-300 text-gray-800"
            }`}
            id="one"
            type="text"
            defaultValue={user.data.firstname}
            // onChange={(e) => setFirstname(e.target.value)}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-5 w-full">
          <label className={`sm:basis-40 ${isDark ? "" : "text-gray-700"}`}>
            Last name
          </label>
          <input
            className={`p-2 pr-4 pl-4 rounded ${
              isDark ? "" : "bg-gray-300 text-gray-700"
            }`}
            id="two"
            type="text"
            defaultValue={user.data.lastname}
            // onChange={(e) => setLastname(e.target.value)}
            onChange={(e) => {
                setLastname(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-5 w-full">
          <label className={`sm:basis-40 ${isDark ? "" : "text-gray-700"}`}>
            Gender
          </label>
          <input
            className={`p-2 pr-4 pl-4 rounded ${
              isDark ? "" : "bg-gray-300 text-gray-700"
            }`}
            id="three"
            type="text"
            defaultValue={user.data.gender}
            // onChange={(e) => setGender(e.target.value)}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-5 w-full">
          <label className={`sm:basis-40 ${isDark ? "" : "text-gray-700"}`}>
            Age
          </label>
          <input
            className={`p-2 pr-4 pl-4 rounded ${
              isDark ? "" : "bg-gray-300 text-gray-700"
            }`}
            id="four"
            type="text"
            defaultValue={user.data.age}
            // onChange={(e) => setAge(e.target.value)}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-5 w-full">
          <label className={`sm:basis-40 ${isDark ? "" : "text-gray-700"}`}>
            City
          </label>
          <input
            className={`p-2 pr-4 pl-4 rounded ${
              isDark ? "" : "bg-gray-300 text-gray-700"
            }`}
            id="five"
            type="text"
            defaultValue={user.data.city}
            // onChange={(e) => setCity(e.target.value)}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>
        <button onClick={req} className={`btn mr-14 ${isDark ? "" : "bg-gray-300 text-gray-700 hover:bg-gray-400 border-none"}`}>
          Save your changes
        </button>
      </div>
    </div>
  );
}

export default Changeprofile;
