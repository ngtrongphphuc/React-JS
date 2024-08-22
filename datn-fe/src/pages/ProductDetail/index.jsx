import React, { useEffect, useState } from "react";
import WrapperContent from "../../components/WrapperContent/WrapperContent";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { formatPrice } from "../../utils";
import { useSelector } from "react-redux";
import { message } from "antd";
import { ROUTE_PATH } from "../../routes/route-path";

const ProductDetail = () => {
  const [data, setData] = useState();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { isLogged } = useSelector((state) => state.auth);

  useEffect(() => {
    id && fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id) => {
    try {
      const { data } = await apiClient.get(`/products/${id}`);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // add cart
  const onIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const onDecreaseQuantity = () => {
    const qnt = quantity - 1;

    setQuantity(qnt > 0 ? qnt : 1);
  };

  const onAddCart = async () => {
    if (!isLogged) {
      return message.info("Vui lòng đăng nhập tài khoản");
    }

    try {
      await apiClient.post("/carts", {
        productId: id,
        quantity,
      });

      message.success("Đã thêm SP vào giỏ hàng");
      setQuantity(1);
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
      console.log(error);
    }
  };

  return (
    <>
      <WrapperContent>
        <div className="grid grid-cols-2 gap-6 mt-12">
          <img
            src={data?.image}
            alt="Product thumbnail"
            className="block w-full object-cover h-[500px]"
          />

          <div>
            <h1 className="font-semibold text-2xl">{data?.name}</h1>

            <p className="my-3">{data?.description}</p>

            <p className="mt-2">
              <span>Giá: </span>
              <span className="text-xl font-medium">
                {formatPrice(data?.price)}
              </span>
            </p>

            <div className="flex items-center mt-6 mb-4 gap-x-3">
              <p>Số lượng:</p>

              <div className="flex bg-[#55CEF5]">
                <button
                  className="px-3 py-1 text-2xl"
                  onClick={onDecreaseQuantity}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  className="w-20 text-center bg-transparent outline-none"
                  readOnly
                />
                <button
                  className="px-3 py-1 text-2xl"
                  onClick={onIncreaseQuantity}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center py-6 border-y border-gray-300 gap-x-3">
              <button
                onClick={onAddCart}
                className="flex gap-x-2 items-center px-4 py-3 rounded-full bg-[#55CEF5] cursor-pointer"
              >
                <FaCartShopping />
                Thêm vào giỏ hàng
              </button>

              <button
              onClick={onAddCart}
              className="flex gap-x-2 items-center px-4 py-3 rounded-full bg-[#55CEF5] cursor-pointer">
                <Link to={ROUTE_PATH.CART}>
                Mua ngay
                </Link>
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Đảm bảo hoàn trả khi cá có vấn đề
            </p>
          </div>
        </div>

        <div className="mt-8 border-y border-black py-3">
          <p className="ml-12">Thông tin chi tiết</p>
        </div>

        <div className="flex gap-x-3 mt-4 mb-12">
          <table className="flex-1">
            <tbody>
              <tr>
                <td className="p-3 [&:first-child]:text-gray-400">Nguồn:</td>
                <td className="p-3 [&:first-child]:text-gray-400">
                  Từ {data?.original}
                </td>
              </tr>

              <tr>
                <td className="p-3 [&:first-child]:text-gray-400">
                  Kích thước:
                </td>
                <td className="p-3 [&:first-child]:text-gray-400">
                  {data?.size}
                </td>
              </tr>

              <tr>
                <td className="p-3 [&:first-child]:text-gray-400">
                  Tình trạng sức khoẻ:
                </td>
                <td className="p-3 [&:first-child]:text-gray-400">
                  {data?.health}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="flex-1">
            <tbody>
              <tr>
                <td className="p-3 [&:first-child]:text-gray-400">Gửi từ</td>
                <td className="p-3 [&:first-child]:text-gray-400">
                  {data?.original}
                </td>
              </tr>

              <tr>
                <td className="p-3 [&:first-child]:text-gray-400">
                  Điều kiện sống:
                </td>
                <td className="p-3 [&:first-child]:text-gray-400 whitespace-pre-line">
                  {data?.habitat}
                </td>
              </tr>

              <tr>
                <td className="p-3 [&:first-child]:text-gray-400">
                  Nguồn thức ăn:
                </td>
                <td className="p-3 [&:first-child]:text-gray-400 whitespace-pre-line">
                  {data?.foodSource}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </WrapperContent>
    </>
  );
};

export default ProductDetail;
