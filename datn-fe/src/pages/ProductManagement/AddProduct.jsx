import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/route-path";
import UploadFormItem from "../../components/UploadItem";
import { cloudinaryUpload } from "../../api/cloudinary";
import apiClient from "../../api/apiClient";
import TextArea from "antd/es/input/TextArea";

const AddProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await apiClient.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async ({ image, ...values }) => {
    try {
      if (image.file?.status === "removed") {
        form.setFields([
          {
            name: "image",
            errors: ["Vui lòng chọn ảnh"],
          },
        ]);

        return;
      }

      const imageUploaded = await cloudinaryUpload(image.file);

      await apiClient.post("/products", {
        ...values,
        image: imageUploaded,
      });

      message.success("Thêm sản phẩm thành công");
      navigate(ROUTE_PATH.PRODUCT_MANAGEMENT);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Thêm SP</h1>

        <Link to={ROUTE_PATH.PRODUCT_MANAGEMENT}>
          <Button type="primary">DS Sản phẩm</Button>
        </Link>
      </div>

      <Form form={form} className="mt-6" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên SP"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên SP",
            },
          ]}
        >
          <Input placeholder="Nhập tên SP" />
        </Form.Item>

        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Giá SP"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá SP",
                },
              ]}
            >
              <InputNumber placeholder="Nhập giá SP" className="w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="quantity"
              label="Số lượng SP"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng SP",
                },
              ]}
            >
              <InputNumber placeholder="Nhập số lượng SP" className="w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="category"
          label="Danh mục SP"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục SP",
            },
          ]}
        >
          <Select
            placeholder="Chọn danh mục SP"
            options={categories.map((it) => ({
              label: it.name,
              value: it._id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="image"
          label="Ảnh SP"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ảnh SP",
            },
          ]}
        >
          <UploadFormItem />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả SP"
          rules={[{ required: true, message: "Vui lòng nhập mô tả SP" }]}
        >
          <TextArea rows={4} placeholder="Nhập mô tả SP" />
        </Form.Item>

        <Form.Item
          name="original"
          label="Nguồn gốc SP"
          rules={[{ required: true, message: "Vui lòng nhập nguồn gốc SP" }]}
        >
          <TextArea rows={4} placeholder="Nhập nguồn gốc SP" />
        </Form.Item>

        <Form.Item
          name="size"
          label="Kích thước SP"
          rules={[{ required: true, message: "Vui lòng nhập kích thước SP" }]}
        >
          <TextArea rows={4} placeholder="Nhập kích thước SP" />
        </Form.Item>

        <Form.Item
          name="health"
          label="Tình trạng sức khoẻ"
          rules={[
            { required: true, message: "Vui lòng nhập tình trạng sức khoẻ" },
          ]}
        >
          <TextArea rows={4} placeholder="Nhập tình trạng sức khoẻ" />
        </Form.Item>

        <Form.Item
          name="habitat"
          label="Điều kiện sống"
          rules={[{ required: true, message: "Vui lòng nhập điều kiện sống" }]}
        >
          <TextArea rows={4} placeholder="Nhập điều kiện sống" />
        </Form.Item>

        <Form.Item
          name="foodSource"
          label="Nguồn thức ăn"
          rules={[{ required: true, message: "Vui lòng nhập nguồn thức ăn" }]}
        >
          <TextArea rows={4} placeholder="Nhập tình trạng sức khoẻ" />
        </Form.Item>

        <Button htmlType="submit" type="primary" className="mt-3">
          Thêm SP
        </Button>
      </Form>
    </>
  );
};

export default AddProduct;
