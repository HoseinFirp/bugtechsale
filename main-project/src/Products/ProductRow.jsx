import {  useState } from "react";
import ProductById from "./ProductById";
import { useDarkContext } from "../App";

function ProductRow({ data, opened, onPress }) {
  const [short, setShort] = useState(false);
  const { isDark } = useDarkContext();
  
  return (
    <>
      {opened ? (
        <ProductById data={data} />
      ) : (
        <div
          onClick={onPress}
          className={`flex flex-col gap-1 justify-center content-center	items-center  ${
            isDark ? "bg-slate-800" : "bg-gray-300"
          } w-60 cursor-pointer rounded-lg`}
        >
          <div className="w-full h-52 flex relative justify-center items-center bg-white rounded-t-lg">
            <img src={`${data.image}`} className=" max-h-52 absolute" />
          </div>
          <p className={`mt-3 font-bold ${isDark ? "" : "text-gray-600  "}`}>
            {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
          </p>
          <div>
            {data.name.length > 20 ? (
              <p className={`${isDark ? "" : "text-gray-600  "}`}>
                {!short ? data.name.slice(0, 15) + " " : data.name + " "}
                <button
                  onClick={() => setShort(!short)}
                  className="text-sm text-gray-500"
                >
                  {!short ? <p> Show more...</p> : <p> Show less</p>}
                </button>
              </p>
            ) : (
              <p className={`${isDark ? "" : "text-gray-600  "}`}>data.name</p>
            )}
          </div>
          <p className={`${isDark ? "" : "text-gray-600  "}`}>
            Brand : {data.brand}
          </p>
          <p className={`${isDark ? "" : "text-gray-600  "}`}>
            Color : {data.color}
          </p>
          <p className={`${isDark ? "" : "text-gray-600  "}`}>
            Count in stock: {data.countInStock }
          </p>
          <p className={`${isDark ? "" : "text-gray-600  "}`}>
            Price : ${data.price}
          </p>
          <p className={`${isDark ? "" : "text-gray-600  "} mb-3`}>
            Rating : {data.rating} / 5
          </p>
        </div>
      )}
    </>
  );
}

export default ProductRow;
