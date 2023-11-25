import { useState } from "react";
import { useUser } from "../features/user/userSlice";
import axios from "axios";
import Loading from "../alerts/Loading";
import { useDarkContext } from "../App";

function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassAgain, setNewPassAgain] = useState("");
  const [error, setError] = useState("");
  const user = useUser();
  const { isDark } = useDarkContext();
  const req = async () => {
    setIsLoading(true);
    setShowWarning(false);
    setError("");
    if(newPassAgain===newPass){try {
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-password",
        {
          old_password: `#${oldPass}`,
          new_password: `#${newPass}`,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setChangeSuccess(true);
    } catch (error) {
      console.log(error.response.data);
      setShowWarning(true);
      setError(error.response.data.message);
    }}else{
      setShowWarning(true);
      setError("Your new password does not match with confirm password!");
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-5 items-center ">
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
          <span>{error}</span>
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
          <span>Your password changed successfuly!</span>
        </div>
      ) : (
        <div  className="flex flex-col gap-5 items-center ">

      
        <div className="flex items-center gap-15 w-full">
          <label className={`sm:basis-40 ${isDark ? "" : "text-gray-700"}`}>Old Password</label>
          <input
          className={`p-2 pr-4 pl-4 rounded ${
            isDark ? "" : "bg-gray-400 text-gray-700"
          }`}
            id="one"
            type="password"
            onChange={(e) => setOldPass(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-15 w-full">
          <label className={`sm:basis-40 ${isDark ? "" : "text-gray-700"}`}>New Password</label>
          <input
          className={`p-2 pr-4 pl-4 rounded ${
            isDark ? "" : "bg-gray-400 text-gray-700"
          }`}
            id="two"
            type="password"
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-15 w-full">
          <label className={`sm:basis-40 ${isDark ? "" : "text-gray-700"}`}>Confirm Password</label>
          <input
          className={`p-2 pr-4 pl-4 rounded ${
            isDark ? "" : "bg-gray-400 text-gray-700"
          }`}
            id="three"
            type="password"
            onChange={(e) => setNewPassAgain(e.target.value)}
          />
        </div>
  
        <button className="btn" onClick={req}>
          ChangePassword
        </button>
        </div>
      )}

    </div>
  );
}

export default ChangePassword;
