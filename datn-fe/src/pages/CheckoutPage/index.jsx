import React, { useEffect, useState } from "react";
import WrapperContent from "../../components/WrapperContent/WrapperContent";
import CartNav from "../../components/CartNav";
import apiClient from "../../api/apiClient";
import { formatPrice } from "../../utils";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/route-path";

const CheckoutPage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (values) => {
    try {
      await apiClient.post("/orders", values);
      message.success("Đặt hàng thành công");
      navigate(ROUTE_PATH.THANK_YOU);
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <WrapperContent>
      <div className="my-12 min-h-[400px]">
        <CartNav />

        <form
          action=""
          className="mx-auto px-3 mt-10 mb-9 grid grid-cols-12 gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-12 lg:col-span-8 border-t-2 pt-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="uppercase text-gray-500 font-semibold text-lg">
                Thông tin thanh toán
              </h3>
            </div>
            <div className="grid grid-cols-12 gap-x-4">
              <div className="col-span-6 mb-3">
                <label htmlFor="" className="font-semibold mb-1 block">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  {...register("customerName", {
                    required: "Vui lòng nhập họ tên",
                  })}
                  className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
                  placeholder="Nhập đầy đủ họ tên"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm">
                    {errors.customerName.message}
                  </p>
                )}
              </div>
              <div className="col-span-6 mb-3">
                <label htmlFor="" className="font-semibold mb-1 block">
                  Số điện thoại *
                </label>
                <input
                  {...register("customerPhone", {
                    required: "Vui lòng nhập số điện thoại",
                    pattern: {
                      value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                      message: "Số điện thoại không đúng định dạng",
                    },
                  })}
                  type="text"
                  className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
                  placeholder="Nhập số điện thoại"
                />
                {errors.customerPhone && (
                  <p className="text-red-500 text-sm">
                    {errors.customerPhone.message}
                  </p>
                )}
              </div>
              <div className="col-span-12 mb-3">
                <label htmlFor="" className="font-semibold mb-1 block">
                  Email *
                </label>
                <input
                  type="email"
                  {...register("customerEmail", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Email không đúng định dạng",
                    },
                  })}
                  className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
                  placeholder="Email"
                />
                {errors.customerEmail && (
                  <p className="text-red-500 text-sm">
                    {errors.customerEmail.message}
                  </p>
                )}
              </div>
              <div className="col-span-12 mb-3">
                <label htmlFor="" className="font-semibold mb-1 block">
                  Địa chỉ *
                </label>
                <input
                  type="text"
                  {...register("address", {
                    required: "Vui lòng nhập địa chỉ",
                  })}
                  className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
                  placeholder="Địa chỉ"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
            <h3 className="uppercase text-gray-500 font-semibold my-2 text-lg">
              Thông tin bổ sung
            </h3>
            <div className="grid grid-cols-12">
              <div className="col-span-12 mb-3">
                <label htmlFor="" className="font-semibold mb-1 block">
                  Ghi chú đơn hàng
                </label>
                <textarea
                  {...register("message")}
                  id=""
                  className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border p-2 text-sm outline-none"
                  placeholder="Ghi chú (tuỳ chọn)"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 border-l p-4 border-2 border-[#55CEF5] min-h-40">
            <h3 className="uppercase text-gray-500 font-semibold mb-3 text-lg">
              Đơn hàng của bạn
            </h3>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="uppercase text-gray-500 text-sm pb-1.5 border-b-2">
                    Sản phẩm
                  </th>
                  <th className="uppercase text-gray-500 text-sm pb-1.5 border-b-2 text-right">
                    Tổng
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.map((it) => (
                  <tr className="border-b" key={it._id}>
                    <td className="text-sm leading-5 py-3 text-gray-500 pr-1">
                      <p className="text-base">
                        <span>{it.product.name}</span>
                        <strong> x {it.quantity}</strong>
                      </p>
                    </td>
                    <td className="py-3 font-semibold text-right pl-1">
                      {formatPrice(it.quantity * it.product.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-b">
                  <td className="font-semibold text-sm py-2">Tạm tính</td>
                  <td className="font-semibold text-right">
                    {formatPrice(data?.totalPrice)}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold text-sm py-2">Tổng</td>
                  <td className="font-semibold text-right">
                    {formatPrice(data?.totalPrice)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <button className="mt-4 px-3 py-2 bg-[#55CEF5] font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
              Đặt hàng
            </button>
          </div>
        </form>
      </div>
    </WrapperContent>
  );
};

export default CheckoutPage;
