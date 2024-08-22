import { Button, Upload } from "antd";
import React from "react";

const UploadFormItem = ({ value, onChange, ...props }) => {
  return (
    <Upload
      accept="image/*"
      customRequest={() => {}}
      fileList={value?.fileList}
      onChange={onChange}
      beforeUpload={() => false}
      listType="picture"
      multiple={false}
      maxCount={1}
      {...props}
    >
      <Button>Upload</Button>
    </Upload>
  );
};

export default UploadFormItem;
