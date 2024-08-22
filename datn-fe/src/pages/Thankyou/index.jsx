import React from "react";
import WrapperContent from "../../components/WrapperContent/WrapperContent";
import CartNav from "../../components/CartNav";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { ROUTE_PATH } from "../../routes/route-path";

const ThankYouPage = () => {
  return (
    <WrapperContent>
      <div className="my-12 min-h-[400px]">
        <CartNav />

        <div className="mt-12 mx-auto">
          <h1 className="text-center mt-4 font-semibold text-2xl uppercase">
            Đặt hàng thành công
          </h1>
          <p className="text-center mt-2">
            Cảm ơn bạn đã đặt hàng của Channa Fish. Nhân viên sẽ gọi điện từ số
            điện thoại bạn đã cung cấp để Confirm (Xác nhận) lại với bạn trong
            thời gian sớm nhất để xác nhận đơn hàng.
          </p>
          <div className="flex items-center justify-center mt-2">
            <button className="uppercase flex items-center gap-x-1 h-8 text-[#55CEF5] font-semibold text-sm border-[#55CEF5] border-2 px-3 transition ease-linear duration-300 hover:bg-[#55CEF5] hover:text-white">
            <FaArrowLeftLong />
              <span>
                Tiếp tục mua hàng
                </span>
            </button>
            <div className="ml-2">
              <button className="uppercase flex items-center gap-x-1 h-8 text-[#55CEF5] font-semibold text-sm border-[#55CEF5] border-2 px-3 transition ease-linear duration-300 hover:bg-[#55CEF5] hover:text-white">
                <span>Kiểm tra đơn hàng</span>

                <FaArrowRightLong />
              </button>
            </div>
          </div>
        </div>
      </div>
    </WrapperContent>
  );
};

export default ThankYouPage;
