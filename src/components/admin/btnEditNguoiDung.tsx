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
import { CapNhatNguoiDung } from "../../models/CapNhatNguoiDung";
import { getUsers, putUsers } from "../../apis/apiNguoiDung";
import { useNguoiDungStore } from "../../store/userStore";
import Swal from "sweetalert2";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import dayjs from "dayjs";

const { Option } = Select;

type Props = {
  nguoiDung: ThongTinNguoiDung;
};
export default function EditNguoiDung(props: Props) {
  const { nguoiDung } = props;
  const [open, setOpen] = useState(false);
  const { addRanges } = useNguoiDungStore();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const formRef = React.useRef<FormInstance<ThongTinNguoiDung>>(null);

  const getFormValues = () => {
    const values = formRef.current?.getFieldsValue();
    putUsers(Number(nguoiDung.id), values)
      .then(() => {
        getUsers().then((res) => {
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
        title="Chỉnh sửa người dùng"
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
        <Form layout="vertical" ref={formRef} initialValues={nguoiDung}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Người dùng"
                rules={[{ required: true, message: "Nhập tên người dùng" }]}
              >
                <Input
                  placeholder="Nhập tên người dùng"
                  defaultValue={nguoiDung.name}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
                <Input
                  placeholder="example@gmail.com"
                  defaultValue={nguoiDung.email}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="birthday" label="Ngày sinh">
                <Input
                  placeholder="2024/01/01"
                  defaultValue={nguoiDung.birthday}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Phân quyền"
                rules={[{ required: true, message: "Chọn phân quyền" }]}
              >
                <Select placeholder="Phân quyền" defaultValue={nguoiDung.role}>
                  <Option value="USER">USER</Option>
                  <Option value="ADMIN">ADMIN</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: "Chọn giới tính" }]}
              >
                <Select placeholder="Giới tính" defaultValue={nguoiDung.gender}>
                  <Option value={true} >Nam</Option>
                  <Option value={false}>Nữ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="skill" label="Skill">
                <Input.TextArea
                  rows={4}
                  placeholder="skill"
                  defaultValue={nguoiDung.skill}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="certification" label="Certification">
                <Input.TextArea
                  rows={4}
                  placeholder="certification"
                  defaultValue={nguoiDung.certification}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
