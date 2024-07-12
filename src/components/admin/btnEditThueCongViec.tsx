import React, { useState } from "react";
import {
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import Swal from "sweetalert2";
import { useDanhSachThueStore } from "../../store/orderStore";
import { ThueCongViecViewModel } from "../../models/ThueCongViecModel";
import { getThueCongViec, putThueCongViec, postThueCongViec } from "../../apis/apiThueCongViec";
import dayjs from "dayjs";

const { Option } = Select;
type Props = {
  thueCongViec?: ThueCongViecViewModel;
};
export default function EditThueCongViec(props: Props) {
  const userLocal = localStorage.getItem("user");
  const currentUSer = userLocal ? JSON.parse(userLocal) : null;
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
    if (!thueCongViec) {
      postThueCongViec(values).then(() => {
        getThueCongViec().then((res) => {
          addRanges(res);
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Hoàn tất",
          showConfirmButton: false,
          timer: 1000,
        });
      });
    } else {
      putThueCongViec(thueCongViec?.id, values)
      .then(() => {
        getThueCongViec().then((res) => {
          addRanges(res);
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Hoàn tất",
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
    }
    
    setOpen(false);
  };

  return (
    <>
      {
        !thueCongViec
          ? (<><Button size="large" type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
            Thêm
          </Button></>)
          : (<Button type="primary" onClick={showDrawer} icon={<EditOutlined />}>
            Chỉnh sửa
          </Button>)
      }
      <Drawer
        title={!thueCongViec ? "Thêm công việc thuê" : "Chỉnh sửa thuê công việc" }
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
        <Form layout="vertical" ref={formRef} initialValues={props}>
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
                  defaultValue={!thueCongViec ? currentUSer.user.id : thueCongViec?.maNguoiThue}
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
                  defaultValue={!thueCongViec ? dayjs().format("YYYY-MM-DD").toString() : thueCongViec?.ngayThue}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hoanThanh"
                label="Trạng thái"
              >
                <Select defaultValue={!thueCongViec ? false : thueCongViec?.hoanThanh}>
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
