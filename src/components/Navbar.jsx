import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Search } from "./";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const Navbar = () => {
  const cart = useSelector((state) => state.cart.productNumber);

  useEffect(() => {}, [cart.productNumber, cart.quantity]);

  return (
    <header className="min-w-[1000px]">
      <div className="flex bg-amazonClone-default text-white h-[60px]">
        <div className="flex items-center m-4">
          <Link to={"/"}>
            <img
              src="../images/amazon.png"
              className="h-[35px] w-[100px] m-2"
              alt=""
            />
          </Link>

          <div className="pr-4 pl-4">
            <div className="text-xs xl:text-sm">Deliver to</div>
            <div className="text-sm xl:text-base font-bold">United Kingdom</div>
          </div>
        </div>
        <div className="flex grow relative items-center">
          <Search />
        </div>
        <div className="flex items-center m-4">
          <div className="pr-4 pl-4">
            <div className="text-xs xl:text-sm">Hello, sign in</div>
            <div className="text-sm xl:text-base font-bold">
              Accounts & Lists
            </div>
          </div>
          <div className="pr-4 pl-4">
            <div className="text-xs xl:text-sm">Returns</div>
            <div className="text-sm xl:text-base font-bold">& Orders</div>
          </div>
          <Link to={"/checkout"}>
            <div className="flex pr-3 pl-3">
              <ShoppingCartIcon className="h-[48px] w-[48px]" />
              <div className="relative">
                <div className="absolute right-2 font-bold  m-2 text-orange-500">
                  {cart}
                </div>
              </div>
              <div className="mt-7 text-xs xl:text-sm font-bold">Cart</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex bg-amazonClone-light_blue text-white space-x-3 text-xs xl:text-sm p-2 pl-6">
        <div>Today's Deals</div>
        <div>Customer Service</div>
        <div>Registry</div>
        <div>Gift Cards</div>
        <div>Sell</div>
        <div>Today's Deals</div>
      </div>
    </header>
  );
};
