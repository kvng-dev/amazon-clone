import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProductDetails } from "./ProductDetails";
import { GB_CURRENCY } from "../utils/constant";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "../redux/cartSlice";
export const Checkout = () => {
  const products = useSelector((state) => state.cart.products);
  const itemsNumber = useSelector((state) => state.cart.productNumber);

  const dispatch = useDispatch();
  const subTotal = useSelector((state) =>
    state.cart.products.reduce(
      (subtotal, product) => subtotal + product.price * product.quantity,
      0
    )
  );
  return (
    <div className="h-screen bg-amazonClone-background">
      <div className="min-w-[100px] max-w-[1500px] m-auto pt-8">
        <div className="md:grid px-8 xl:px-0 grid-cols-8 gap-10">
          <div className="col-span-6 bg-white">
            <div className="text-2xl xl:text-3xl m-4">Shopping Cart</div>
            {products.map((product, index) => (
              <div key={index}>
                <div className="grid grid-cols-12 divide-y mr-4 divide-gray-400">
                  <div className="col-span-10 grid grid-cols-8 divide-y divide-gray-400">
                    <div className="col-span-2">
                      <Link to={`/product/${product.id}`}>
                        <img
                          className="p-4 m-auto"
                          src={product.image_small}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="col-span-6">
                      <div className="font-medium text-black mt-2">
                        <Link to={`/product/${product.id}`}>
                          <ProductDetails product={product} ratings={false} />
                        </Link>
                      </div>
                      <div>
                        <button
                          className="text-sm xl:text-base xl:ml-[90%] font-semibold rounded bg-red-500 mt-2 px-2 py-0.5 text-white mb-4 xl:w-[200px]"
                          onClick={() => dispatch(removeFromCart(product.id))}
                        >
                          Remove from Cart
                        </button>
                      </div>
                      <div className="grid grid-cols-3 w-20 text-center">
                        <div
                          onClick={() => dispatch(decreaseQuantity(product.id))}
                          className="text-xl xl:text-2xl bg-amazonClone-yellow hover:bg-yellow-500 hover:text-white cursor-pointer rounded"
                        >
                          -
                        </div>
                        <div className="text-lg xl:text-xl">
                          {product.quantity}
                        </div>
                        <div
                          onClick={() => dispatch(increaseQuantity(product.id))}
                          className="text-xl cursor-pointer xl:text-2xl bg-amazonClone-yellow rounded hover:bg-yellow-500 hover:text-white"
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-lg xl:text-xl mt-2 mr-4 font-semibold">
                      {GB_CURRENCY.format(product.price)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-lg text-right xl:text-xl mb-4 mr-4 ">
              Subtotal ({itemsNumber} items):{" "}
              <span className="font-semibold">
                {GB_CURRENCY.format(subTotal)}
              </span>
            </div>
          </div>

          <div className="col-span-2 bg-white rounded h-[250px] p-7">
            <div className="text-xs xl:text-sm text-green-800 mb-2">
              Your order qualifies for{" "}
              <span className="font-bold">FREE DELIVERY</span>. Delivery Details
            </div>
            <div className="text-base xl:text-lg mb-4 mr-4 ">
              Subtotal ({itemsNumber} items):{" "}
              <span className="font-semibold">
                {GB_CURRENCY.format(subTotal)}
              </span>
            </div>
            <button className="btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};
