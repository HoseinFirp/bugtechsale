import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ data }) {
  const { productId, name, quantity, unitPrice } = data;

  return (
    <li className="py-3 px-10 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">
          {formatCurrency( unitPrice*quantity)}
        </p>

        <UpdateItemQuantity productId={productId} currentQuantity={quantity} />
        <DeleteItem productId={productId} />
      </div>
    </li>
  );
}

export default CartItem;
