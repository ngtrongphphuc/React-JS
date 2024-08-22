import { Button, Image, message, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ROUTE_PATH } from "../../routes/route-path";
import { formatPrice } from "../../utils";

const ListProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await apiClient.get("/products");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteProduct = async (id) => {
    try {
      await apiClient.delete(`/products/${id}`);
      message.success("Xoá SP thành công");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên SP",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Ảnh SP",
      key: "image",
      dataIndex: "image",
      render: (image) => {
        return (
          <Image
            src={image}
            width={100}
            height={100}
            className="object-cover"
          />
        );
      },
    },
    {
      title: "Giá SP",
      key: "price",
      dataIndex: "price",
      render: (val) => formatPrice(val),
    },
    {
      title: "Số lượng SP",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Danh mục SP",
      key: "category",
      dataIndex: "category",
      render: (category) => category?.name,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex gap-x-3 items-center">
            <Link to={ROUTE_PATH.EDIT_PRODUCT(record._id)}>
              <EditOutlined className="text-lg" />
            </Link>

            <Popconfirm
              title="Xoá sản phẩm"
              description="Xác nhận xoá SP"
              onConfirm={() => onDeleteProduct(record._id)}
            >
              <div className="text-lg cursor-pointer">
                <DeleteOutlined />
              </div>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Quản lý SP</h1>

        <Link to={ROUTE_PATH.ADD_PRODUCT}>
          <Button type="primary">Thêm SP</Button>
        </Link>
      </div>

      <Table
        dataSource={data}
        rowKey={"_id"}
        columns={columns}
        className="mt-4"
      />
    </>
  );
};

export default ListProduct;
