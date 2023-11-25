import { useState } from "react";
import { useLogin } from "../authentication/useLogin";
import { Form, Link, useNavigation } from "react-router-dom";
import axios from "axios";
import { useDarkContext } from "../App";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const { isDark } = useDarkContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabled1, setIsDisabled1] = useState(true);
  const [isDisabled2, setIsDisabled2] = useState(true);
  const [isDisabled3, setIsDisabled3] = useState(true);
  const [isDisabled4, setIsDisabled4] = useState(true);
  const [isDisabled5, setIsDisabled5] = useState(true);
  const [showError, setShowError] = useState("");
  const [showError1, setShowError1] = useState();
  const [showError2, setShowError2] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [goBackButton, setGoBackButton] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submittin";

  //   const isValidPhoneNumber = (str) => {
  //     /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/.test(str);
  //   };

  const req = async () => {
    setShowError('');
    setIsLoading(true);
    if (password !== passwordAgain) {
      setIsDisabled3(true);
      setShowError1(`Your Re-Password does not match with Your Password`);
    } else setShowError1("");
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/signup",
        {
          username: `${username}`,
          email: `${email}`,
          password: `#${password}`,
          mobile: `${mobile}`,
        }
      );
      console.log(data);
      setIsDisabled5(false);
      setShowError2("User Created");
      setGoBackButton(true);
    } catch (error) {
      console.log(`#${password}`);
      console.log(error.response.data);
      setIsDisabled5(true);
      setShowError(error.response.data.message);
    }
    setIsLoading(false);
  };

  function onChange(e) {
    e.preventDefault();
    if (e.target.value.trim().length < 1) {
      // Checking the length of the input
      setIsDisabled(true); // Disabling the button if length is < 1
    } else {
      setIsDisabled(false);
    }
  }
  function onChange1(e) {
    e.preventDefault();

    if (e.target.value.trim().length < 1) {
      // Checking the length of the input
      setIsDisabled1(true); // Disabling the button if length is < 1
    } else {
      setIsDisabled1(false);
    }
  }
  function onChange2(e) {
    e.preventDefault();

    if (e.target.value.trim().length < 1) {
      // Checking the length of the input
      setIsDisabled2(true); // Disabling the button if length is < 1
    } else {
      setIsDisabled2(false);
    }
  }
  function onChange3(e) {
    e.preventDefault();

    if (e.target.value.trim().length < 1) {
      // Checking the length of the input
      setIsDisabled3(true); // Disabling the button if length is < 1
    } else {
      setIsDisabled3(false);
    }
  }
  function onChange4(e) {
    e.preventDefault();

    if (e.target.value.trim().length < 1) {
      // Checking the length of the input
      setIsDisabled4(true); // Disabling the button if length is < 1
    } else {
      setIsDisabled4(false);
    }
  }


  return (
    <div className={`flex items-center flex-col pt-20 h-screen ${isDark ? "" : "bg-gray-200"}`}>
      <h4 className={`${isDark ? "" : "text-gray-900"} mb-5 text-lg`}>Sign Up Now!</h4>
      <Form
        method="POST"
        // onSubmit={handleSubmit}
        className="w-60 items-center flex flex-col gap-5 "
      >
        <div label="Email address">
          <input
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              onChange(e);
            }}
            disabled={isLoading}
            placeholder="E-Mail"
            className={`p-2 pr-4 pl-4 rounded ${
              isDark ? "" : "bg-gray-300 text-gray-700" 
            }`}
            required
          />
        </div>
        <div label="User name">
          <input
            type="username"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              onChange1(e);
            }}
            disabled={isLoading}
            placeholder="User Name"
            className={`p-2 pr-4 pl-4 rounded ${
              isDark ? "" : "bg-gray-300 text-gray-700" 
            }`}
            required
          />
        </div>

        <div label="Password">
          <input
            className={`p-2 pr-4 pl-4 rounded ${
              isDark ? "" : "bg-gray-300 text-gray-700" 
            }`}
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              onChange2(e);
            }}
            disabled={isLoading}
            required
          />
        </div>
        <div label="PasswordAgain">
          <input
            className={`p-2 pr-4 pl-4 rounded ${
              isDark ? "" : "bg-gray-300 text-gray-700" 
            }`}
            placeholder="Confirm Password"
            type="password"
            id="passwordAgain"
            value={passwordAgain}
            onChange={(e) => {
              setPasswordAgain(e.target.value);
              onChange3(e);
            }}
            disabled={isLoading}
            required
          />
        </div>
        <div label="mobile">
          <input
            className={`p-2 pr-4 pl-4 rounded ${
              isDark ? "" : "bg-gray-300 text-gray-700" 
            }`}
            placeholder="mobile"
            pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
              onChange4(e);
            }}
            disabled={isLoading}
            required
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-red-600">{showError}</p>
          <p className="text-red-600   ">{showError1}</p>
          <p className="text-green-600   ">{showError2}</p>
        </div>
        <div>
          {!goBackButton ? (
            <button
              size="large"
              disabled={
                isLoading ||
                isDisabled ||
                isDisabled1 ||
                isDisabled2 ||
                isDisabled3 ||
                isDisabled4 ||
                isSubmitting
              }
              type="submit"
              className={`border rounded-lg pr-2 pl-2 pt-1 pb-1 ${
                isDark ? "" : "bg-gray-400 text-gray-800 hover:bg-gray-300" 
              } transition`}
              onClick={req}
            >
              {!isLoading ? "Sign Up" : "Loading..."}
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="border rounded-lg pr-2 pl-2 pt-1 pb-1 bg-green-800">Go Back to Login</button>
            </Link>
          )}
        </div>
      </Form>
    </div>
  );
}

export default Signup;
