import { useDarkContext } from "../App";

export const Settings = () => {
  const { isDark } = useDarkContext();
  return (
    <div className={` h-screen ${isDark ? "" : "bg-gray-200"}`}>
      
    </div>
  );
};
