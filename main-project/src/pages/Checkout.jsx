import { useDispatch, useSelector } from "react-redux";
import { useDarkContext } from "../App";
import { getCart, getTotalCartPrice } from "../features/cart/cartSlice";
import CartCheckout from "../features/cart/CartCheckout";
import { Link } from "react-router-dom";
import { clearCart } from "./cart/CartSlice";
import { useState } from "react";
import { useUser } from "../features/user/userSlice";
import axios from "axios";

function Checkout() {
  const [showDone, setShowDone] = useState(false);
  const { isDark } = useDarkContext();
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const user = useUser();
  


  const req = async () => {
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/order/submit",
        {
          orderItems: cart.map((data) =>{ return{product:data.productId, qty:data.quantity}}),
          shippingAddress: {
            address: `${user.address}`,
            city: `${user.city}`,
            postalCode: `${user.postalCode}`,
            phone: `${user.phoneNumber}`,
          },
          paymentMethod: "ship",
          shippingPrice: "5",
          totalPrice: Number(totalCartPrice),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  function doneFunction() {
    dispatch(clearCart());
    setShowDone(true);
    req()
  }
  const cartData = cart.reduce((arr, c) => {
    if (arr.filter((_c) => _c.name === c.name).length) return arr;
    return [
      ...arr,
      {
        ...c,
        quantity: cart
          .filter((i) => i.name === c.name)
          .reduce((acc, c) => acc + c.quantity, 0),
      },
    ];
  }, []);
console.log(cart)
  return (
    <div className={`pt-5 h-screen ${isDark ? "" : "bg-gray-200"}`}>
      {showDone ? (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your buy completed successfuly!</span>
        </div>
      ) : (
        <div>
          <ul
            className={`${
              isDark ? "" : "text-gray-900"
            } mt-3 divide-y  divide-stone-200 border-b`}
          >
            {cartData.map((data) => (
              <CartCheckout data={data} key={data.productId} />
            ))}
          </ul>

            <p className={`${
              isDark ? "" : "text-gray-900"
            } mt-10 divide-y  divide-stone-200 ml-10`}>Address : {user.address}</p>
          <div className="flex gap-5 ml-5 mt-10 items-center">
            <Link to={"/cart"}>
              <button
                className={`btn btn-secondary text-gray-800 bg-yellow-400 hover:bg-yellow-600 border-none`}
              >
                Edit
              </button>
            </Link>
            <button
              className={`btn btn-primary ${
                isDark ? "" : "bg-green-600 hover:bg-green-800 border-none"
              }`}
              onClick={doneFunction}
            >
              Done
            </button>
            <p className={`${isDark?'':'text-gray-800'} text-xl `}>Your Total Price : <span className={"font-bold"}> €{totalCartPrice}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
