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
import { putCongViec, getCongViec, postCongViec, uploadHinhCongViec } from "../../apis/apiCongViec";
import Swal from "sweetalert2";
import { usedanhSachCongViecStore } from "../../store/congviecStore";

const { Option } = Select;

type Props = {
  congViec?: CongViecViewModel;
};
export default function EditCongViec(props: Props) {
  const userLocal = localStorage.getItem("user");
  const currentUSer = userLocal ? JSON.parse(userLocal) : null;
  const [open, setOpen] = useState(false);
  const { addRanges } = usedanhSachCongViecStore();
  const showDrawer = () => {
    setOpen(true);
  };
  const [filebase64, setFileBase64] = useState<string>("");
  const [image,setImage] = useState<File>();
  function convertFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const fileRef = event.target.files[0] || ""
      const fileType: string = fileRef.type || ""
      setImage(fileRef)
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload = (ev: any) => {
        // convert it to base64
        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
      }
    }
  }
  // function formSubmit(e: any) {
  //   e.preventDefault();
  //   console.log({ filebase64 })
  //   alert("here you'd submit the form using\n the filebase64 like any other field")
  // }
  const onClose = () => {
    setOpen(false);
  };
  const { congViec } = props;
  const formRef = React.useRef<FormInstance<CongViecViewModel>>(null);
  const getFormValues = () => {
    const values = formRef.current?.getFieldsValue();
    if (!congViec) {
      return postCongViec(values)
        .then((res) => {
          if(image){
            const formData = new FormData();
            formData.append('file', image);
            uploadHinhCongViec(res.id,formData);
          }
          
          getCongViec().then((res) => {
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
    } else {
      
      putCongViec(congViec?.id, values)
        .then((res) => {
          getCongViec().then((res) => {
            addRanges(res);
          });
          if(image){
            const formData = new FormData();
            formData.append("formFile",image);
            uploadHinhCongViec(congViec?.id,image);
          }
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
        !congViec
          ? (<><Button size="large" type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
            Thêm
          </Button></>)
          : (<Button type="primary" onClick={showDrawer} icon={<EditOutlined />}>
            Chỉnh sửa
          </Button>)
      }

      <Drawer
        title={!congViec ? "Thêm công việc" : "Chỉnh sửa công việc"}
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
                rules={[{ required: true, message: "Nhập tên công việc" }]}
              >
                <Input
                  placeholder="Nhập tên công việc"
                  defaultValue={congViec?.tenCongViec}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hinhAnh"
                label="Hình ảnh"
              >
                <input type="file" onChange={(e) => convertFile(e)} />
                  <hr />
                  {filebase64 &&
                    <>

                      {(filebase64.indexOf("image/") > -1) &&
                        <img src={filebase64} width={300} />
                      }
                      {(filebase64.indexOf("video/") > -1) &&
                        <video controls >
                          <source src={filebase64} />
                        </video>
                      }
                      {(filebase64.indexOf("audio/") > -1) &&
                        <audio controls >
                          <source src={filebase64} />
                        </audio>
                      }
                      {(filebase64.indexOf("application/pdf") > -1) &&
                        <embed src={filebase64} width="800px" height="2100px" />
                      }
                    </>
                  }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="danhGia" label="Đánh giá">
                <InputNumber
                  defaultValue={!congViec ? "0" : congViec?.danhGia}
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
                  defaultValue={congViec?.giaTien}
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
                rules={[{ required: true, message: "Nhập mã người tạo" }]}
              >
                <Input
                  defaultValue={!congViec ? currentUSer.user.id : congViec?.nguoiTao}
                  placeholder="Nhập mã người tạo"
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
                  defaultValue={congViec?.maChiTietLoaiCongViec}
                  placeholder="Nhập mã chi tiết công việc"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="moTaNgan" label="Mô tả ngắn">
                <Input.TextArea
                  defaultValue={congViec?.moTaNgan}
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
                  defaultValue={congViec?.moTa}
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
                  defaultValue={congViec?.saoCongViec}
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
