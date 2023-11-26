import { useState } from "react";

import { Form, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { updateToken } from "../features/user/userSlice";
import Loading from "../alerts/Loading";
import { HiFingerPrint, HiKey, HiShoppingCart } from "react-icons/hi2";
import { useDarkContext } from "../App";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showError,setShowError]=useState(false)
  const[errorMessage,setErrorMessage]=useState('')
  const dispatch = useDispatch();
  const { isDark } = useDarkContext();
const navigate = useNavigate()
  const req = async () => {
    setIsLoading(true);
    setShowError(false)
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/login",
        {
          email: `${email}`,
          password: `#${password}`,
        }
      );
      dispatch(updateToken(data.user.token));

      console.log(data.user);

      setShowLogin(true);
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message)
      setShowError(true)
    }
    setIsLoading(false);
  };

  return (
    <Form className="w-90 items-center flex flex-col gap-5 ">
      {showError?(
        <div className="alert alert-error">
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
        <span>{errorMessage}</span>
      </div>
      ):null}
      {isLoading ? <Loading /> : null}
      {showLogin ? (
        <div className="alert alert-success">
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
          <span>Your login was successful!</span>
        </div>
      ) : null}
      <div label="Email address">
        <input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || showLogin}
          placeholder="E-Mail"
          className={`p-2 pr-4 pl-4 rounded ${
            isDark ? "" : "bg-gray-300 text-gray-700" 
          }`}
        />
      </div>

      <div label="Password">
        <input
          className={`p-2 pr-4 pl-4 rounded ${
            isDark ? "" : "bg-gray-300 text-gray-600" 
          }`}
          placeholder="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading || showLogin}
        />
      </div>
      {showLogin?(
        
        <button
          size="large"
          disabled={isLoading}
          className={`border rounded-lg pr-2 pl-2 pt-1 pb-1  flex items-center gap-1 ${
            isDark ? "" : "bg-gray-400 text-gray-800 hover:bg-gray-300" 
          } transition`}
          onClick={()=>navigate(-1)}
        >
          {!isLoading ? <HiShoppingCart /> : null}{!isLoading ? "Continue" : "Loading..."}
        </button>
      
      ):(
<div className="flex gap-8">
        
<button
  size="large"
  disabled={isLoading}
  className={`border rounded-lg pr-2 pl-2 pt-1 pb-1  flex items-center gap-2 ${
    isDark ? "" : "bg-gray-400 text-gray-800 hover:bg-gray-300" 
  } transition`}
  onClick={req}
  
>
  {!isLoading ? <HiKey /> : null}{!isLoading ? "Login" : "Loading..."}
</button>
<Link to={"/signup"}>
  <button
    size="large"
    disabled={isLoading}
    className={`border rounded-lg pr-2 pl-2 pt-1 pb-1  flex items-center gap-1 ${
      isDark ? "" : "bg-gray-400 text-gray-800 hover:bg-gray-300" 
    } transition`}
  >
    {!isLoading ? <HiFingerPrint /> : null}{!isLoading ? "Signup Now" : "Loading..."}
  </button>
</Link>
</div>
      )}
      
    </Form>
  );
}

export default LoginForm;
