import { Button, Image, message, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ROUTE_PATH } from "../../routes/route-path";

const ListCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await apiClient.get("/categories");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteCategory = async (id) => {
    try {
      await apiClient.delete(`/categories/${id}`);
      message.success("Xoá danh mục thành công");
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
      title: "Tên danh mục",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Ảnh danh mục",
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
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex gap-x-3 items-center">
            <Link to={ROUTE_PATH.EDIT_CATEGORY(record._id)}>
              <EditOutlined className="text-lg" />
            </Link>

            <Popconfirm
              title="Xoá danh mục"
              description="Xác nhận xoá danh mục SP"
              onConfirm={() => onDeleteCategory(record._id)}
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
        <h1 className="font-semibold text-xl">Quản lý danh mục SP</h1>

        <Link to={ROUTE_PATH.ADD_CATEGORY}>
          <Button type="primary">Thêm danh mục</Button>
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

export default ListCategory;
