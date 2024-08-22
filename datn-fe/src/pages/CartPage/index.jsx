import React, { useEffect, useState } from "react";
import WrapperContent from "../../components/WrapperContent/WrapperContent";
import CartNav from "../../components/CartNav";
import { FaTrash } from "react-icons/fa";
import { Image, message, Popconfirm } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import apiClient from "../../api/apiClient";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/route-path";
import { formatPrice } from "../../utils";

const CartPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const { data } = await apiClient.get("/carts/my-carts");
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteProduct = async (productId) => {
    try {
      await apiClient.delete(`/carts/${productId}`);
      message.success("Xoá thành công");
      fetchCarts();
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      onDeleteProduct(productId);
      return;
    }

    try {
      await apiClient.put("/carts", {
        productId,
        quantity,
      });

      message.success("Cập nhật số lượng thành công");
      fetchCarts();
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  if (!data) {
    return (
      <div className="min-h-[400px] text-center">
        <p className="text-center mt-12">
          Không có sản phẩm nào trong giỏ hàng!
        </p>

        <Link
          to={ROUTE_PATH.HOME}
          className="inline-flex mt-4 items-center gap-x-2 select-none uppercase h-8 font-semibold text-sm border-[#55CEF5] border-2 px-3 transition ease-linear duration-300 hover:bg-[#55CEF5] hover:text-white"
        >
          <FaArrowLeft />

          <span> Tiếp tục xem sản phẩm</span>
        </Link>
      </div>
    );
  }

  return (
    <WrapperContent>
      <div className="my-12 min-h-[400px]">
        <CartNav />

        <section className="container max-w-6xl mx-auto px-3 mt-10 grid grid-cols-12 mb-9">
          <div className="col-span-12 lg:col-span-8 lg:pr-6">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="uppercase border-b-2">
                  <th></th>
                  <th className="pb-1 uppercase text-sm text-gray-500">
                    Sản phẩm
                  </th>
                  <th className="pb-1 uppercase text-sm text-gray-500">Giá</th>
                  <th className="pb-1 uppercase text-sm text-gray-500">
                    Số lượng
                  </th>
                  <th className="pb-1 uppercase text-sm text-gray-500 text-right">
                    Tạm tính
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.products?.map((it) => (
                  <tr className="border-b" key={it._id}>
                    <td>
                      <Popconfirm
                        title="Xoá SP"
                        description="Xác nhận xoá SP khỏi giỏ hàng"
                        onConfirm={() => onDeleteProduct(it.product._id)}
                      >
                        <button
                          type="button"
                          className="p-2 text-gray-400 text-xl transition ease-linear duration-200 hover:text-black"
                        >
                          <FaTrash />
                        </button>
                      </Popconfirm>
                    </td>

                    <td className="p-2">
                      <div className="flex items-center gap-x-2">
                        <Image
                          src={it.product.image}
                          width={100}
                          height={100}
                          className="object-cover rounded"
                        />

                        <Link
                          className="font-semibold"
                          href={ROUTE_PATH.PRODUCT_DETAIL(it.product._id)}
                        >
                          {it.product.name}
                        </Link>
                      </div>
                    </td>

                    <td className="font-bold">
                      {formatPrice(it.product.price)}
                    </td>

                    <td className="p-2">
                      <div className="inline-flex bg-[#55CEF5]">
                        <button
                          className="px-3 py-1 text-2xl"
                          onClick={() =>
                            onUpdateQuantity(it.product._id, it.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={it.quantity}
                          className="w-14 text-center bg-transparent outline-none"
                          readOnly
                        />
                        <button
                          className="px-3 py-1 text-2xl"
                          onClick={() =>
                            onUpdateQuantity(it.product._id, it.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="font-bold text-right">
                      {formatPrice(it.quantity * it.product.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="flex mt-6 items-center">
              <li>
                <Link
                  to={ROUTE_PATH.HOME}
                  className="flex items-center gap-x-2 select-none uppercase h-8 font-semibold text-sm border-[#55CEF5] border-2 px-3 transition ease-linear duration-300 hover:bg-[#55CEF5] hover:text-white"
                >
                  <FaArrowLeft />

                  <span> Tiếp tục xem sản phẩm</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-8 lg:mt-0 col-span-12 lg:col-span-4 lg:border-l lg:pl-6">
            <table className="table-fixed w-full text-left">
              <thead>
                <tr className="uppercase border-b-2">
                  <th className="pb-1 text-sm text-gray-500" colSpan={2}>
                    Cộng giỏ hàng
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td>Tạm tính</td>
                  <td className="py-2 text-right font-semibold">
                    {formatPrice(data?.totalPrice)}
                  </td>
                </tr>
                <tr className="border-b">
                  <td>Tổng</td>
                  <td className="py-2 text-right font-semibold">
                    {formatPrice(data?.totalPrice)}
                  </td>
                </tr>
              </tbody>
            </table>
            <Link
              to={ROUTE_PATH.CHECKOUT}
              className="block mt-4 w-full text-center px-3 py-2 bg-[#55CEF5] font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]"
            >
              Tiến hành thanh toán
            </Link>
          </div>
        </section>
      </div>
    </WrapperContent>
  );
};

export default CartPage;
