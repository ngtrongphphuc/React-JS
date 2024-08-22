import React from "react";

import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { ROUTE_PATH } from "../../routes/route-path";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";

const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (values) => {
    try {
      await apiClient.post("/auth/sign-up", values);
      toast.success("Đăng ký thành công");
      navigate("/auth/sign-in");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}></div>

      <div className="bg-white z-10 relative w-[500px] max-w-full rounded-xl px-8 pt-12 pb-6 max-h-[90vh] overflow-y-auto">
        <h1 className="uppercase text-center text-2xl font-semibold mb-6">
          Đăng ký
        </h1>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <input
              type="text"
              {...register("name", {
                required: "Vui lòng nhập họ tên",
              })}
              placeholder="Nhập họ tên"
              className="border border-black w-full rounded px-3 py-4 outline-none"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Nhập email"
              className="border border-black w-full rounded px-3 py-4 outline-none"
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email không đúng định dạng",
                },
              })}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              className="border border-black w-full rounded px-3 py-4 outline-none"
              {...register("phone", {
                required: "Vui lòng nhập số điện thoại",
                pattern: {
                  value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Số điện thoại không đúng định dạng",
                },
              })}
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="border border-black w-full rounded px-3 py-4 outline-none"
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
              })}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className="border border-black w-full rounded px-3 py-4 outline-none"
              {...register("confirm", {
                required: "Vui lòng nhập lại mật khẩu",
                validate: (value) => {
                  return value === password || "Mật khẩu không khớp";
                },
              })}
            />

            {errors.confirm && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirm.message}
              </p>
            )}
          </div>

          <button className="bg-[#55CEF5] w-full text-white font-semibold py-3 rounded mt-4">
            Đăng ký
          </button>

        </form>

        <div className="flex items-center gap-x-2 my-6">
          <span className="flex-1 bg-gray-300 h-[1px]"></span>
          <p>Hoặc</p>
          <span className="flex-1 bg-gray-300 h-[1px]"></span>
        </div>

        <div className="flex gap-x-3">
          <button className="flex-1 flex items-center justify-center gap-x-2 border border-gray-300 py-3 cursor-pointer">
            Facebook
            <div>
              <FaFacebook />
            </div>
          </button>

          <button className="flex-1 flex items-center justify-center gap-x-2 border border-gray-300 py-3 cursor-pointer">
            Google
            <div>
              <FaGoogle />
            </div>
          </button>
        </div>

        <p className="text-center mt-6 text-sm">
          <span>Bạn đã có tài khoản? </span>
          <Link to={ROUTE_PATH.SIGN_IN} className="text-[#55CEF5]">
            Đăng nhập
          </Link>
        </p>

        <button className="bg-[#55CEF5] w-full text-white font-semibold py-3 rounded mt-4">
          <Link to={ROUTE_PATH.SIGN_IN}>
            Quay lại trang đăng nhập
            </Link>
          </button>

      </div>
    </div>
  );
};

export default SignUpPage;
