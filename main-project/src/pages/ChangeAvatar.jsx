import axios from "axios";
import { useState } from "react";
import { updateData,  useUser } from "../features/user/userSlice";
import Loading from "../alerts/Loading";
import { useDispatch } from "react-redux";
import { useDarkContext } from "../App";

function ChangeAvatar() {
  const { isDark } = useDarkContext();

  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pic, setPic] = useState(null);
  const user = useUser();
  const dispatch = useDispatch();
  const formData = new FormData();
  formData.append("profile-image", pic);
  const req = async () => {
    setShowWarning(false);
    setError("");
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);

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

      setChangeSuccess(true);
    } catch (error) {
      console.log(error.response.data);
      setShowWarning(true);
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };
  return (
    <div>
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
          <span>Your profile picture changed successfuly!</span>
        </div>
      ) : null}
      <div className="flex items-center">
        <form>
          <input onChange={(e) => setPic(e.target.files[0])} type="file" />
        </form>
        <button type="submit" onClick={req} className={`${isDark ? "" : "bg-gray-300 text-gray-700 hover:bg-gray-400 border-none"} btn`}>
          Change avatar
        </button>
      </div>
    </div>
  );
}

export default ChangeAvatar;
