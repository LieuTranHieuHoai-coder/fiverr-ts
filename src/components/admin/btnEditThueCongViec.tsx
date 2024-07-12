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
import { useDanhSachThueStore } from "../../store/orderStore";
import { ThueCongViecViewModel } from "../../models/ThueCongViecModel";
import { getThueCongViec, putThueCongViec } from "../../apis/apiThueCongViec";

const { Option } = Select;

type Props = {
  thueCongViec?: ThueCongViecViewModel;
};
export default function EditThueCongViec(props: Props) {
  const [open, setOpen] = useState(false);
  const { addRanges } = useDanhSachThueStore();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const { thueCongViec } = props;
  const formRef = React.useRef<FormInstance<ThueCongViecViewModel>>(null);
  const getFormValues = () => {
    const values = formRef.current?.getFieldsValue();
    putThueCongViec(thueCongViec?.id, values)
      .then(() => {
        getThueCongViec().then((res) => {
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
        title="Chỉnh sửa thuê công việc"
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
        <Form layout="vertical" ref={formRef} initialValues={thueCongViec}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maCongViec"
                label="Mã công việc"
                rules={[{ required: true, message: "Mã công việc" }]}
              >
                <Input
                  placeholder="Nhập mã công việc"
                  defaultValue={thueCongViec?.maCongViec}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maNguoiThue"
                label="Mã người thuê"
                rules={[{ required: true, message: "Mã người thuê" }]}
              >
                <Input
                  placeholder="Nhập mã người thuê"
                  defaultValue={thueCongViec?.maNguoiThue}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ngayThue"
                label="Ngày thuê"
                rules={[{ required: true, message: "Ngày thuê" }]}
              >
                <Input
                  placeholder="Ngày thuê"
                  defaultValue={thueCongViec?.ngayThue}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hoanThanh"
                label="Trạng thái"
                
              >
                <Select defaultValue={thueCongViec?.hoanThanh}>
                  <Option value={true}>Hoàn thành</Option>
                  <Option value={false}>Chưa hoàn thành</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
