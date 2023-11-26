// import LinkButton from '../../ui/LinkButton';
// import Button from '../../ui/Button';
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import { Link } from "react-router-dom";
import { useUser } from "../user/userSlice";
import { useDarkContext } from "../../App";

function Cart() {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const user = useUser();
  const { isDark } = useDarkContext();

  // const cartData = cart.map((c, index) => ({
  //   count: cart.filter(i => i.name === c.name).length,
  //   isFirst: cart.findIndex(_c => _c.name === c.name) === index,
  //   ...c
  // })).filter(c => c.isFirst);

  // const cartData2 = [];
  // for (let c in cart) {
  //   if (cartData2.filter(_c => _c.name === c.name).length) continue;
  //   cartData2.push({
  //     ...c,
  //     quantity: 2
  //   })
  // }

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

  if (!cart.length) return <EmptyCart />;
  return (
    <div className={`${isDark ? "" : "bg-gray-200"} px-4 py-3 h-screen `}>
      <Link to="/">
        <button
          className={`btn  ${
            isDark
              ? ""
              : "bg-gray-400 hover:bg-gray-500 border-none text-gray-600 hover:text-gray-900"
          }`}
        >
          &larr; Back to menu
        </button>
      </Link>

      <h2
        className={`${
          isDark ? "" : "text-gray-900"
        } mt-7 text-xl font-semibold`}
      >
        Your cart <span className={`font-extrabold`}>{user.data.firstname}</span> :
      </h2>

      <ul
        className={`${
          isDark ? "" : "text-gray-900"
        } mt-3 divide-y divide-stone-200 border-b`}
      >
        {cartData.map((data) => (
          <CartItem data={data} key={data.productId} />
        ))}
      </ul>

      <div className="ml-5 mt-10 space-x-2 flex gap-10">
        <Link to={user.token ? "/address" : "/login"}>
          <button
            type="primary"
            className={`btn btn-primary ${
              isDark ? "" : "bg-green-600 hover:bg-green-800 border-none"
            }`}
          >
            Complete Your Buy
          </button>
        </Link>

        <button
          type="secondary"
          className={`btn btn-secondary bg-red-600 hover:bg-red-800 border-none`}
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
