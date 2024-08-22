import { Button, Form, Image, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/route-path";
import UploadFormItem from "../../components/UploadItem";
import { cloudinaryUpload } from "../../api/cloudinary";
import apiClient from "../../api/apiClient";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [preview, setPreview] = useState("");

  const image = Form.useWatch("image", form);

  useEffect(() => {
    id && fetchCategory(id);
  }, [id]);

  const fetchCategory = async (id) => {
    try {
      const { data } = await apiClient.get(`/categories/${id}`);
      form.setFieldsValue({
        name: data.name,
      });
      setPreview(data?.image);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    try {
      let imageUploaded = preview;
      if (values.image && values.image.file?.status !== "removed") {
        imageUploaded = await cloudinaryUpload(values.image.file);
      }

      await apiClient.put(`/categories/${id}`, {
        name: values.name,
        image: imageUploaded,
      });

      message.success("Cập nhật danh mục thành công");
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

        <Form.Item name="image" label="Ảnh danh mục">
          <UploadFormItem showUploadList={image?.fileList?.length} />
        </Form.Item>

        {preview && !image?.fileList?.length && (
          <div>
            <Image
              src={preview}
              width={120}
              height={120}
              className="object-cover rounded"
            />
          </div>
        )}

        <Button htmlType="submit" type="primary" className="mt-3">
          Cập nhật danh mục
        </Button>
      </Form>
    </>
  );
};

export default EditCategory;
