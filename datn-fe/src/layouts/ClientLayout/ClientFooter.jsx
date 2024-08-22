import React from "react";
import WrapperContent from "../../components/WrapperContent/WrapperContent";
import { Link } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

const ClientFooter = () => {
  return (
    <>
      <footer className="bg-[#55CEF5] py-10 mt-3">
        <WrapperContent>
          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <img
                src="/logo/logo.png"
                alt="Logo"
                className="block h-40 mx-auto"
              />

              <p className="uppercase font-semibold text-lg">Channa Fish</p>

              <p className="mt-3">
                Shop chuyên cung cấp các dòng cá lóc cảnh (lóc lạnh, vảy rồng),
                hướng dẫn cách nuôi và chăm sóc cá lóc, mọi vấn đề liên hệ cho
                CHANNA FISH
              </p>
            </div>

            <div className="mt-8">
              <p className="font-semibold mb-5 text-lg">
                Hướng dẫn bạn chăm cá
              </p>

              <ul>
                <li className="my-2">
                  <Link>Hướng dẫn bạn trị bệnh</Link>
                </li>
                <li className="my-2">
                  <Link>Cách chăm cá</Link>
                </li>
                <li className="my-2">
                  <Link>Giải đáp thắc mắc</Link>
                </li>
                <li className="my-2">
                  <Link>Các vấn đề cá có thể mắc phải</Link>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <p className="font-semibold mb-5 text-lg">Thông tin liên hệ</p>

              <ul>
                <li className="my-2 flex items-center gap-x-2">
                  <div>
                    <IoMdMail />
                  </div>
                  <Link to="mailto:ChannaFish@gmail.com" target="_blank">
                    ChannaFish@gmail.com
                  </Link>
                </li>

                <li className="my-2 flex items-center gap-x-2">
                  <div>
                    <FaPhoneAlt />
                  </div>
                  <Link to="tel:0966655544" target="_blank">
                    0966655544
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </WrapperContent>
      </footer>

      <div className="bg-black text-white">
        <WrapperContent>
          <div className="flex items-center justify-between py-3">
            <p>Copyright © 2024 All rights reserved</p>

            <p>Bảo mật</p>

            <p>Quyền riêng tư</p>

            <p>Điều khoản</p>
          </div>
        </WrapperContent>
      </div>
    </>
  );
};

export default ClientFooter;
