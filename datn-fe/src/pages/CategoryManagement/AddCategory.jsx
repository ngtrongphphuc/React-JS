import { Button, Form, Input, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/route-path";
import UploadFormItem from "../../components/UploadItem";
import { cloudinaryUpload } from "../../api/cloudinary";
import apiClient from "../../api/apiClient";

const AddCategory = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      if (values.image.file?.status === "removed") {
        form.setFields([
          {
            name: "image",
            errors: ["Vui lòng chọn ảnh"],
          },
        ]);

        return;
      }

      const imageUploaded = await cloudinaryUpload(values.image.file);

      await apiClient.post("/categories", {
        name: values.name,
        image: imageUploaded,
      });

      message.success("Thêm danh mục thành công");
      navigate(ROUTE_PATH.CATEGORY_MANAGEMENT);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Thêm danh mục</h1>

        <Link to={ROUTE_PATH.CATEGORY_MANAGEMENT}>
          <Button type="primary">DS danh mục</Button>
        </Link>
      </div>

      <Form form={form} className="mt-6" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên danh mục",
            },
          ]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Ảnh danh mục"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ảnh danh mục",
            },
          ]}
        >
          <UploadFormItem />
        </Form.Item>

        <Button htmlType="submit" type="primary" className="mt-3">
          Thêm danh mục
        </Button>
      </Form>
    </>
  );
};

export default AddCategory;
