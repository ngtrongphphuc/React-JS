import React from "react";
import WrapperContent from "../../components/WrapperContent/WrapperContent";
import { Link, NavLink } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/route-path";
import { IoSearch } from "react-icons/io5";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/authSlice";

const ClientHeader = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(signOut());
    window.location.href = "/auth/sign-in";
  };

  return (
    <WrapperContent>
      <div className="flex items-center">
        <NavLink to={ROUTE_PATH.HOME}>
          <img
            src="/logo/logo.png"
            alt="Logo"
            className="block h-28 object-contain"
          />
        </NavLink>

        <div className="flex items-center bg-[#55CEF5] rounded-full px-3 h-11 w-80 max-w-full ml-16">
          <input
            type="text"
            className="bg-transparent px-2 h-full outline-none border-none flex-1"
            placeholder="Tìm kiếm..."
          />

          <div className="cursor-pointer">
            <IoSearch className="text-xl" />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-x-8">
          {auth.isLogged ? (
            <div className="flex items-center gap-x-2">
              <div className="text-xl">
                <FaUser />
              </div>

              <div>
                <Link
                  to={auth.userInfo.role === "ADMIN" ? "/admin" : "/profile"}
                >
                  Hi, {auth.userInfo.name}
                </Link>

                <p onClick={onSignOut} className="text-sm cursor-pointer">
                  Đăng xuất
                </p>
              </div>
            </div>
          ) : (
            <Link to={ROUTE_PATH.SIGN_IN} className="flex items-center gap-x-2">
              <div className="text-xl">
                <FaUser />
              </div>

              <p>Đăng nhập</p>
            </Link>
          )}

          {auth.isLogged && (
            <Link to={ROUTE_PATH.CART} className="flex items-center gap-x-2">
              <div className="text-xl">
                <FaShoppingCart />
              </div>

              <p>Giỏ hàng</p>
            </Link>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-3 mb-4">
        <NavLink to={ROUTE_PATH.HOME} className="text-lg font-semibold">
          <p>Trang chủ</p>
        </NavLink>
        <NavLink to={ROUTE_PATH.HOME} className="text-lg font-semibold">
          <p>Lóc lạnh</p>
        </NavLink>
        <NavLink to={ROUTE_PATH.HOME} className="text-lg font-semibold">
          <p>Vảy rồng</p>
        </NavLink>
        <NavLink to={ROUTE_PATH.HOME} className="text-lg font-semibold">
          <p>Khuyến mãi</p>
        </NavLink>
        <NavLink to={ROUTE_PATH.HOME} className="text-lg font-semibold">
          <p>Liên hệ</p>
        </NavLink>
      </div>
    </WrapperContent>
  );
};

export default ClientHeader;
