import React, { useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { BinhLuanViewModel } from "../../models/BinhLuanViewModel";
import { usedanhSachBLStore } from "../../store/commentStore";
import { getBinhLuan, putBinhLuan } from "../../apis/apiBinhLuan";

const { Option } = Select;

type Props = {
  binhluan: BinhLuanViewModel;
};
export default function EditBinhLuan(props: Props) {
  const { binhluan } = props;
  const [open, setOpen] = useState(false);
  const { addRanges } = usedanhSachBLStore();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const formRef = React.useRef<FormInstance<BinhLuanViewModel>>(null);

  const getFormValues = () => {
    const values = formRef.current?.getFieldsValue();
    putBinhLuan(Number(binhluan.id), values)
      .then(() => {
        getBinhLuan().then((res) => {
          addRanges(res);
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error",
          text: err.message,
        });
      });
    setOpen(false);
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<EditOutlined />}>
        Chỉnh sửa
      </Button>
      <Drawer
        title="Chỉnh sửa bình luận"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Button onClick={getFormValues} type="primary">
              Lưu
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" ref={formRef} initialValues={binhluan}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maCongViec"
                label="Mã công việc"
                rules={[{ required: true, message: "Nhập mã công việc" }]}
              >
                <Input
                  placeholder="Nhập mã công việc"
                  defaultValue={binhluan.maCongViec}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="maNguoiBinhLuan"
                label="Mã người bình luận"
                rules={[{ required: true, message: "Mã người bình luận" }]}
              >
                <Input
                  placeholder="Mã người bình luận"
                  defaultValue={binhluan.maNguoiBinhLuan}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="ngayBinhLuan" label="Ngày bình luận">
                <Input
                  placeholder="2024/01/01"
                  defaultValue={binhluan.ngayBinhLuan}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="saoBinhLuan" label="Sao bình luận">
                <Input
                  
                  defaultValue={binhluan.saoBinhLuan}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="noiDung" label="Nội dung">
                <Input.TextArea
                  rows={4}
                  placeholder=""
                  defaultValue={binhluan.noiDung}
                />
              </Form.Item>
            </Col>
          </Row>
          
        </Form>
      </Drawer>
    </>
  );
}
