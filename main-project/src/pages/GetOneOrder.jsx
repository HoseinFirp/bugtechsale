import axios from "axios";
import { useUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkContext } from "../App";
import { useCart } from "../features/cart/cartSlice";
import Loading from "../alerts/Loading";
import Warning from "../alerts/Warning";
import CartItem from "../features/cart/CartItem";

function GetOneOrder() {
  const { isDark } = useDarkContext();

  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState();
  const [isMutate, setIsMutate] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const user = useUser();
  const cart = useCart();
  const params = useParams();
  const navigate = useNavigate();
  // test
  // const selecstedCart = cart.filter(c => c._id === params.cart_id)[0]
  useEffect(() => {
    const req = async () => {
      setShowWarning(false);

      setShowLoading(true);

      try {
        const { data } = await axios.get(
          `http://kzico.runflare.run/order/${params.cart_id}`,

          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(data);

        const cartData = data.orderItems.reduce((arr, c) => {
          if (arr.filter((_c) => _c.product.name === c.product.name).length)
            return arr;
          return [
            ...arr,
            {
              ...c,
              qty: data.orderItems
                .filter((i) => i.product.name === c.product.name)
                .reduce((acc, c) => acc + c.qty, 0),
            },
          ];
        }, []);

        console.log(data.orderItems);
        setMainData(cartData);
        setData(data);
      } catch (error) {
        console.log(error.response.data);
        setShowWarning(true);
      }
      setShowLoading(false);
    };
    req();
  }, []);
  console.log("data.orderItems : ", data.orderItems);
  console.log("main data : ", mainData);
  // console.log(mainData[1])

  return (
    <div
      className={`${
        isDark ? "" : "bg-gray-200"
      } h-screen pt-20 flex justify-center`}
    >
      {showLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : showWarning ? (
        <Warning />
      ) : !showProduct ? (
        // <div >{data.shippingAddress.address}</div>
        <button
          className={`${
            isDark
              ? ""
              : "bg-gray-300 text-gray-700 hover:bg-gray-400 border-none"
          } btn`}
          onClick={() => setShowProduct(true)}
        >
          show Order Details{" "}
        </button>
      ) : (
        <div className="flex flex-col gap-5 ">
          <div
            className={`${
              isDark ? "bg-base-200" : "bg-gray-300"
            } p-5 rounded-xl h-min max-w-md`}
          >
            {mainData.map((data) => (
              // <CartItem data={data} key={data._id}/>
              <div key={data._id}>
                <p
                  className={`${isDark ? "" : "text-gray-900"}`}
                  key={data._id}
                >
                  {data.qty} x {data.product.name}
                </p>
                <p className={`${isDark ? "" : "text-gray-900"}`}>
                  Description : {data.product.description}
                </p>
                <p>----------------</p>
              </div>
            ))}
            <p className={`${isDark ? "" : "text-gray-900"}`}>
              Address : {data.shippingAddress.city} -{" "}
              {data.shippingAddress.address}
            </p>
            <p className={`${isDark ? "" : "text-gray-900"}`}>
              Postal Code : {data.shippingAddress.postalCode}
            </p>
            <p className={`${isDark ? "" : "text-gray-900"}`}>
              Phone Number : {data.shippingAddress.phone}
            </p>
            {/* {data.orderItems.map((data) => (
            <div key={data._id}>
              <p>{data.orderItems.map(data=><p key={data.product._id}>{data.product.name}</p>)}</p>
            </div>
          ))} */}

            <p className={`${isDark ? "" : "text-gray-900"}`}>
              Total Price : <b>{data.totalPrice} € </b> ({data.paymentMethod})
            </p>
          </div>
          <button
            className={`${
              isDark
                ? ""
                : "bg-gray-300 text-gray-700 hover:bg-gray-400 border-none"
            } btn`}
            onClick={() => navigate(-1)}
          >
            {" "}
            Go back
          </button>
        </div>
      )}
    </div>
  );
}

export default GetOneOrder;
