import { HiMiniShoppingCart } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../pages/cart/CartSlice";
import { getCurrentQuantityById } from "../features/cart/cartSlice";
import UpdateItemQuantity from "../features/cart/UpdateItemQuantity";
import DeleteItem from "../features/cart/DeleteItem";
import { useDarkContext } from "../App";

function ProductById({ data }) {
  const dispatch = useDispatch();
  const { _id, unitPrice,countInStock } = data;
  const currentQuantity = useSelector(getCurrentQuantityById(_id));
  const isInCart = currentQuantity > 0;
  const { isDark } = useDarkContext();
  function handleAddToCart() {
    const newItem = {
      productId: data._id,
      name: data.name,
      quantity: 1,
      unitPrice: data.price,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <div
      id="main-div"
      className=" card card-compact w-96 bg-base-300 shadow-xl  transition ease-in "
      style={{ zIndex: 1 }}
    >
      <figure className="w-full h-52 flex relative justify-center items-center bg-white rounded-t-lg">
        <img src={data.image} alt="Shoes" className="max-h-52 absolute" />
      </figure>
      <div
        className={`card-body bg ${isDark ? "bg-slate-800" : "bg-gray-400"}`}
      >
        <h2 className={`card-title ${isDark ? "" : "text-gray-600  "}`}>{data.category}</h2>
        <p className={`${isDark ? "" : "text-gray-600  "}`}>-----------------</p>
        <p className={`${isDark ? "" : "text-gray-600  "}`}>
          Brand : <b>{data.brand}</b>
        </p>
        <p className={`${isDark ? "" : "text-gray-600  "}`}>
          Name : <b>{data.name}</b>
        </p>
        <p className={`${isDark ? "" : "text-gray-600  "}`}>
          Price :<b> ${data.price}</b>
        </p>
        <div className="card-actions justify-end items-center gap-5">
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                productId={_id}
                currentQuantity={currentQuantity}
                countInStock={countInStock}
              />
              <DeleteItem productId={_id} />
            </div>
          )}
          {!isInCart && (
            <button className={`btn btn-primary ${isDark?'':'bg-gray-600 hover:bg-gray-800 border-none'}`} onClick={handleAddToCart}>
              Add to cart <HiMiniShoppingCart />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductById;
