import { Link } from "react-router-dom";
import { useDarkContext } from "../../App";

function EmptyCart() {
  const { isDark} = useDarkContext();
  return (
    <div className={`px-4 py-3 ${isDark?'':'bg-gray-200'} h-screen `}>
      <Link to="/"><button className={`btn  ${isDark?'':'bg-gray-400 hover:bg-gray-500 border-none text-gray-600 hover:text-gray-900'}`}>&larr; Back to home</button></Link>

      <p className={`${isDark?'':'text-gray-900'} mt-7 font-semibold`}>
        Your cart is still empty.
      </p>
    </div>
  );
}

export default EmptyCart;
