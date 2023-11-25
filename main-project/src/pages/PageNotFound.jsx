import { useNavigate } from "react-router-dom";
import { useDarkContext } from "../App";

function useMoveBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}

function PageNotFound() {
  const moveBack = useMoveBack();
  const { isDark } = useDarkContext();

  return (
    <div className={`${isDark ? "" : "bg-gray-300"} h-screen pt-20 pl-5`}>
      <h1 className={`bg-transparent ${isDark?'':'text-gray-900'}`}>The page you are looking for could not be found 😢</h1>
      <button onClick={moveBack} size="large" className="btn mt-5 border-none hover:bg-slate-500">
        &larr; Go back
      </button>
    </div>
  );
}

export default PageNotFound;
