import axios from "axios";
import { useUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../alerts/Loading";
import Warning from "../alerts/Warning";
import { useDarkContext } from "../App";
import { updateProducts } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

function GetAllOrders() {
  const { isDark } = useDarkContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useUser();
  
  
  const [products, setProducts] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  //   const [openedProductId, setOpenedProductId] = useState(undefined);
  useEffect(() => {
    async function req() {
      setShowWarning(false);
      setShowLoading(true);
      try {
        const { data } = await axios.get(
          "http://kzico.runflare.run/order/",

          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );


        console.log(data);
        setProducts(data);
        dispatch(updateProducts(data))
        setShowLoading(false);
      } catch (error) {
        console.log(error.response.data);
        setShowLoading(false);
        setShowWarning(true);
      }
    }
    req();
    
  }, [user.token, setProducts,dispatch ]);
  console.log(products);
  return (
    <div className={`${isDark ? "" : "bg-gray-200"} h-full pt-20`}>
      {showLoading ? (
        <div className="flex justify-center mt-10">
          <Loading />
        </div>
      ) : showWarning ? (
        <Warning />
      ) : (
        <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center justify-center mr-10 ml-10 gap-x-5 gap-y-10">
          {products.map((data) => (
            <div
              className={`${
                isDark ? "bg-base-200" : "bg-gray-300"
              } p-5 rounded-xl cursor-pointer w-full flex flex-col`}
              key={data._id}
              onClick={() => navigate(`${data._id}`)}
            >
              <p className={`${isDark ? "" : "text-gray-900"}`}>
                Product name : {data.orderItems[0].product.name}
              </p>
              <p className={`${isDark ? "" : "text-gray-900"}`}>
                Payment Method : {data.paymentMethod}
              </p>
              <p className={`text-2xl ${isDark ? "" : "text-gray-900"} `}>
                Total Price : {data.totalPrice} €
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetAllOrders;
