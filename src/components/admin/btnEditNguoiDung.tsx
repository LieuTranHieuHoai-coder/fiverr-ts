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
import { getUsers, putUsers, postUsers } from "../../apis/apiNguoiDung";
import { useNguoiDungStore } from "../../store/userStore";
import Swal from "sweetalert2";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import dayjs from "dayjs";

const { Option } = Select;

type Props = {
  nguoiDung?: ThongTinNguoiDung;
};
export default function EditNguoiDung(props: Props) {
  const { nguoiDung } = props;
  const [open, setOpen] = useState(false);
  const { addRanges, add } = useNguoiDungStore();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const formRef = React.useRef<FormInstance<ThongTinNguoiDung>>(null);

  const getFormValues = async () => {
    try {
      const values = await formRef.current?.validateFields();
      if (!nguoiDung) {
        await postUsers(values);
        const res = await getUsers();
        addRanges(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Hoàn tất",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        await putUsers(Number(nguoiDung?.id), values);
        const res = await getUsers();
        addRanges(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Hoàn tất",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      setOpen(false);
    } catch (err:any) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  return (
    <>
      {!nguoiDung ? (
        <Button size="large" type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          Thêm
        </Button>
      ) : (
        <Button type="primary" onClick={showDrawer} icon={<EditOutlined />}>
          Chỉnh sửa
        </Button>
      )}
      <Drawer
        title={!nguoiDung ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
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
                  defaultValue={nguoiDung?.name}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  placeholder="example@gmail.com"
                  defaultValue={nguoiDung?.email}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birthday"
                label="Ngày sinh"
              >
                <Input
                  placeholder="2024/01/01"
                  defaultValue={nguoiDung?.birthday}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Phân quyền"
              >
                <Select placeholder="Phân quyền" defaultValue={!nguoiDung ? "USER" : nguoiDung?.role}>
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
              >
                <Select placeholder="Giới tính" defaultValue={!nguoiDung ? true : nguoiDung?.gender}>
                  <Option value={true}>Nam</Option>
                  <Option value={false}>Nữ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="SĐT"
              >
                <Input
                  placeholder="+84"
                  defaultValue={nguoiDung?.phone}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
                name="password"
                label="Mật khẩu"
              >
                <Input
                  placeholder=""
                  defaultValue={nguoiDung?.password}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="skill" label="Skill">
                <Input.TextArea
                  rows={4}
                  placeholder="skill"
                  defaultValue={nguoiDung?.skill}
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
                  defaultValue={nguoiDung?.certification}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}