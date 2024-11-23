import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { callAPI } from "../utils/axioInstance";
import { ProductDetails } from "./ProductDetails";
import { GB_CURRENCY } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { ProductBadge } from "./ProductBadge";

export const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const { id } = useParams();
  const dispatch = useDispatch();

  const getProduct = () => {
    callAPI(`data/products.json`).then((product) => setProduct(product[id]));
  };

  const addQuantityToProduct = (e) => {
    setProduct((product.quantity = quantity));
    return product;
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) return <div>Loading...</div>;
  return (
    product && (
      <div className="h-screen bg-amazonClone-background">
        <div className="min-w-[1000px] max-w-[1500px] m-auto p-4">
          <div className="grid grid-cols-10 gap-2">
            {/* Left */}
            <div className="col-span-3 p-8 relative rounded bg-white">
              <img src={`${product.image}`} alt="" />
            </div>

            {/* Middle */}
            <div className="col-span-5 p-4 rounded bg-white divide-y divide-gray-400 ">
              <div className="mb-3">
                {" "}
                <ProductDetails product={product} ratings={true} />
              </div>
              <div className="text-base xl:text-lg mt-3">
                {product.description}
              </div>
            </div>

            {/* Right */}
            <div className="col-span-2 p-4 rounded bg-white">
              <div className="text-xl text-red-500 xl:text-2xl font-semibold text-right">
                {GB_CURRENCY.format(product.price)}
              </div>
              <div className="text-base  text-gray-500 xl:text-lg font-semibold text-right">
                RRP:
                <span className="line-through">
                  {GB_CURRENCY.format(product.oldPrice)}
                </span>
              </div>
              <div className="text-sm text-blue-500 xl:text-base font-semibold mt-3">
                FREE Returns
              </div>
              <div className="text-sm  text-blue-500 xl:text-base font-semibold mt-1">
                Free Delivery
              </div>
              <div className="text-sm text-green-500 xl:text-base mt-1">
                In Stock
              </div>
              <div className="text-sm xl:text-base">
                Quantity:{" "}
                <select
                  onChange={(e) => setQuantity(e.target.value)}
                  className="p-2 bg-white rounded-md border focus:border-indigo-600"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <Link to={"/checkout"}>
                <button
                  onClick={() => dispatch(addToCart(addQuantityToProduct()))}
                  className="btn"
                >
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
