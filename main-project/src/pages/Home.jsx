import { useDarkContext } from "../App";
import GetAllProduct from "../Products/GetAllProduct";

function Home() {
  const { isDark } = useDarkContext();
  return (
    <div className={`${isDark?'':'bg-gray-200'} pt-10 h-full`}>
      <div className="flex flex-col items-center gap-6  ">
        <p className={`text-4xl ${isDark?'':'text-gray-900'}`}>Technology is our vision</p>
        <p className={`${isDark?'':'text-gray-900'}`}>' Find your product below to follow your dream '</p>
      </div>
      <GetAllProduct />
    </div>
  );
}

export default Home;
