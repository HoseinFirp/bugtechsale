import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";
// import { useEffect, useMemo } from "react";

function CartItem({ data }) {
  const { productId, name, quantity, unitPrice, totalPrice } = data;
  const currentQuantity = useSelector(getCurrentQuantityById(productId));

  return (
    <li className="py-3 px-10 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">
          {formatCurrency(totalPrice ? totalPrice : unitPrice)}
        </p>

        <UpdateItemQuantity productId={productId} currentQuantity={quantity} />
        <DeleteItem productId={productId} />
      </div>
    </li>
  );
}

export default CartItem;
