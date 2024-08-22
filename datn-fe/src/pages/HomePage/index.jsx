import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { FaCheckCircle } from "react-icons/fa";
import WrapperContent from "../../components/WrapperContent/WrapperContent";
import ProductItem from "../../components/ProductItem/ProductItem";
import apiClient from "../../api/apiClient";

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await apiClient.get("/products/home");
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Banner />

      <WrapperContent>
        {data
          ?.filter((it) => it.products.length)
          ?.map((it) => (
            <section className="mt-8" key={it._id}>
              <div className="flex items-center justify-center gap-x-2 mb-6">
                <h2 className="text-3xl uppercase font-semibold">
                  Sản phẩm {it.name}
                </h2>

                <div className="text-2xl">
                  <FaCheckCircle />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-x-6 gap-y-3">
                {it.products.slice(0, 8).map((product) => (
                  <ProductItem key={product._id} data={product} />
                ))}
              </div>
            </section>
          ))}
      </WrapperContent>
    </>
  );
};

export default HomePage;
