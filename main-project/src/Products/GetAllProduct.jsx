import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import ProductRow from "./ProductRow";
import Warning from "../alerts/Warning";
import Loading from "../alerts/Loading";
import { useDarkContext } from "../App";

// const ProductContext = createContext()

const GetAllProduct = () => {
  const [products, setProducts] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [openedProductId, setOpenedProductId] = useState(undefined);
  const [showLoading, setShowLoading] = useState(false);
  const { isDark } = useDarkContext();
  
  useEffect(function () {
    async function req() {
      setShowLoading(true);
      try {
        const { data } = await axios.get("http://kzico.runflare.run/product/");
        setProducts(data);
      } catch (error) {
        setShowWarning(true);
      }
      setShowLoading(false);
    }
    req();
  }, []);
  return (
    <div className="mt-20">
      {showLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : showWarning ? (
        <Warning />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center justify-center mr-10 ml-10 gap-x-10 gap-y-10">
          {products.map((data) => (
            <ProductRow
              key={data._id}
              data={data}
              products={products}
              opened={data._id === openedProductId}
              onPress={() => setOpenedProductId(data._id)}
            >
              {data.name}
            </ProductRow>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllProduct;
