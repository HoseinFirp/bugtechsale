import axios from "axios";
import { useUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import ProductRow from "../Products/ProductRow";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useDarkContext } from "../App";
import { useCart } from "../features/cart/cartSlice";

function GetOneOrder() {
  const user = useUser();
  const cart = useCart();
  const params = useParams();
  const navigate = useNavigate();
  // test
  // const selecstedCart = cart.filter(c => c._id === params.cart_id)[0]
  const req = async () => {
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
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <button onClick={req}>get one order</button>
    </div>
  );
}

export default GetOneOrder;
