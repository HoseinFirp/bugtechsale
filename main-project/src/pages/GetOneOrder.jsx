import axios from "axios";
import { useUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import ProductRow from "../Products/ProductRow";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useDarkContext } from "../App";
import { getCart, useCart } from "../features/cart/cartSlice";
import Loading from "../alerts/Loading";
import Warning from "../alerts/Warning";
import { useSelector } from "react-redux";

function GetOneOrder() {
  const { isDark } = useDarkContext();

  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState();

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
          if (arr.filter((_c) => _c.name === c.name).length) return arr;
          return [
            ...arr,
            {
              ...c,
              qty: data.orderItems
                .filter((i) => i.name === c.name)
                .reduce((acc, c) => acc + c.qty, 0),
            },
          ];
        }, []);

        setMainData(data);
        setData(cartData);
      } catch (error) {
        console.log(error.response.data);
        setShowWarning(true);
      }
      setShowLoading(false);
    };
    req();
  }, []);
  console.log(data);
  console.log(mainData);
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
        <button className={`${isDark ? "" : "bg-gray-300 text-gray-700 hover:bg-gray-400 border-none"} btn` } onClick={() => setShowProduct(true)}>
          show Order Details{" "}
        </button>
      ) : (
        <div className="flex flex-col gap-5">

        <div
          className={`${
            isDark ? "bg-base-200" : "bg-gray-300"
          } p-5 rounded-xl h-min`}
        >
          <p className={`${isDark ? "" : "text-gray-900"}`}>
            Address : {mainData.shippingAddress.city} -{" "}
            {mainData.shippingAddress.address}
          </p>
          <p className={`${isDark ? "" : "text-gray-900"}`}>
            Postal Code : {mainData.shippingAddress.postalCode}
          </p>
          <p className={`${isDark ? "" : "text-gray-900"}`}>
            Phone Number : {mainData.shippingAddress.phone}
          </p>
          {/* {data.orderItems.map((data) => (
            <div key={data._id}>
              <p>{data.orderItems.map(data=><p key={data.product._id}>{data.product.name}</p>)}</p>
            </div>
          ))} */}
          {data.map((data) => (
            <p className={`${isDark ? "" : "text-gray-900"}`} key={data._id}>
              {data.qty} x {data.product.name}
            </p>
          ))}
          <p className={`${isDark ? "" : "text-gray-900"}`}>
            Total Price : <b>{mainData.totalPrice} € </b> (
            {mainData.paymentMethod})
          </p>
        </div>
          <button className={`${isDark ? "" : "bg-gray-300 text-gray-700 hover:bg-gray-400 border-none"} btn`} onClick={()=>navigate(-1)}> Go back</button>
        </div>

      )}
    </div>
  );
}

export default GetOneOrder;
