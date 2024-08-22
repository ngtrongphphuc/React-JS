import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/route-path";
import classNames from "classnames";

const CartNav = () => {
  const location = useLocation();

  return (
    <ul className="flex justify-center items-center">
      <li className="text-2xl px-2">
        <Link
          to={ROUTE_PATH.CART}
          className={classNames(
            "text-gray-400 cursor-pointer uppercase transition ease-linear duration-200 hover:text-black",
            {
              "text-black": location.pathname === ROUTE_PATH.CART,
            }
          )}
        >
          SHOPPING CART
        </Link>
      </li>
      <li className="text-md text-gray-400 px-2 hidden md:block">
        <FaChevronRight />
      </li>
      <li className="text-2xl px-2">
        <Link
          to={ROUTE_PATH.CHECKOUT}
          className={classNames(
            "text-gray-400 cursor-pointer uppercase transition ease-linear duration-200 hover:text-black",
            {
              "text-black": location.pathname === ROUTE_PATH.CHECKOUT,
            }
          )}
        >
          Checkout details
        </Link>
      </li>
      <li className="text-md text-gray-400 px-2 hidden md:block">
        <FaChevronRight />
      </li>
      <li className="text-2xl px-2">
        <Link
          to={ROUTE_PATH.THANK_YOU}
          className={classNames(
            "text-gray-400 cursor-pointer uppercase transition ease-linear duration-200 hover:text-black",
            {
              "text-black": location.pathname === ROUTE_PATH.THANK_YOU,
            }
          )}
        >
          Order Complete
        </Link>
      </li>
    </ul>
  );
};

export default CartNav;
