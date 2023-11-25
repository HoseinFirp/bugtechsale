import { useDarkContext } from "../App";
import LoginForm from "../authentication/LoginForm";

function Login() {
  const { isDark } = useDarkContext();
  return (
    <div className={`flex items-center flex-col pt-20 h-screen ${isDark ? "" : "bg-gray-200"}`}>
      <h4 className={`mb-5 text-lg ${isDark ? "" : "text-gray-900"}`}>Log in to your account</h4>
      <LoginForm />
    </div>
  );
}

export default Login;
