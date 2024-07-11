import React, { useState } from "react";
import {
  DollarOutlined,
  EditOutlined,
  LikeOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Drawer,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import { CongViecViewModel } from "../../models/CongViecViewModel";
import { putCongViec, getCongViec } from "../../apis/apiCongViec";
import Swal from "sweetalert2";
import { usedanhSachCongViecStore } from "../../store/congviecStore";

const { Option } = Select;

type Props = {
  congViec: CongViecViewModel;
};
export default function btnEditCongViec(props: Props) {
  const [open, setOpen] = useState(false);
  const { addRanges } = usedanhSachCongViecStore();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const { congViec } = props;
  const formRef = React.useRef<FormInstance<CongViecViewModel>>(null);
  const getFormValues = () => {
    const values = formRef.current?.getFieldsValue();
    putCongViec(congViec.id, values)
      .then(() => {
        getCongViec().then((res) => {
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
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<EditOutlined />}>
        Chỉnh sửa
      </Button>
      <Drawer
        title="Edit"
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
        <Form layout="vertical" ref={formRef} initialValues={congViec}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tenCongViec"
                label="Tên công việc"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input
                  placeholder="Nhập tên công việc"
                  defaultValue={congViec.tenCongViec}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hinhAnh"
                label="Hình ảnh"
                rules={[{ required: true, message: "Please enter url" }]}
              >
                <Input
                  defaultValue={congViec.hinhAnh}
                  style={{ width: "100%" }}
                  addonBefore="https://"
                  addonAfter=""
                  placeholder="link url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="danhGia" label="Đánh giá">
                <InputNumber
                  defaultValue={congViec.danhGia}
                  addonAfter={<LikeOutlined />}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="giaTien"
                label="Giá tiền"
                rules={[{ required: true, message: "Nhập giá tền" }]}
              >
                <InputNumber
                  defaultValue={congViec.giaTien}
                  addonAfter={<DollarOutlined />}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nguoiTao"
                label="Mã người tạo"
                rules={[{ required: true, message: "Nhập tên công việc" }]}
              >
                <Input
                  defaultValue={congViec.nguoiTao}
                  placeholder="Nhập tên công việc"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maChiTietLoaiCongViec"
                label="Mã chi tiết công việc"
                rules={[
                  { required: true, message: "Nhập mã chi tiết công việc" },
                ]}
              >
                <Input
                  defaultValue={congViec.maChiTietLoaiCongViec}
                  placeholder="Nhập mã chi tiết công việc"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="moTaNgan" label="Mô tả ngắn">
                <Input.TextArea
                  defaultValue={congViec.moTaNgan}
                  rows={4}
                  placeholder=""
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="moTa" label="Mô tả">
                <Input.TextArea
                  defaultValue={congViec.moTa}
                  rows={6}
                  placeholder=""
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="saoCongViec"
                label="Sao công việc"
                rules={[{ required: true, message: "Nhập sao công việc" }]}
              >
                <InputNumber
                  defaultValue={congViec.saoCongViec}
                  addonAfter={<StarOutlined />}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
