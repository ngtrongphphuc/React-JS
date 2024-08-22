import React from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/route-path";
import { formatPrice } from "../../utils";

const ProductItem = ({ data }) => {
  return (
    <div>
      <Link
        to={ROUTE_PATH.PRODUCT_DETAIL(data._id)}
        className="relative pt-[100%] border border-gray-300 block"
      >
        <img
          src={data.image}
          alt="Product thumbnail"
          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover"
        />
      </Link>

      <div className="p-3 text-center">
        <Link
          to={ROUTE_PATH.PRODUCT_DETAIL(data._id)}
          className="font-semibold uppercase text-lg"
        >
          {data.name}
        </Link>
        <p>Giá: {formatPrice(data.price)}</p>
        <p>Size: {data.size}</p>
      </div>
    </div>
  );
};

export default ProductItem;
