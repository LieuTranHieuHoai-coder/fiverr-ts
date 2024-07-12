import React, { useEffect, useState } from "react";
import { Button, Col, ConfigProvider, Drawer, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import type { FormInstance, SelectProps, TableColumnsType } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { usedanhSachChiTietStore } from "../../store/chitietcongviecStore";
import {
  getChiTietLoaiCongViec,
  deleteChiTietLoaiCongViecId,
  putChiTietLoaiCongViecId,
  getChiTietLoaiCongViecId,
  putSuaNhomChiTietLoai,
  postChiTietLoaiCongViec,
  addNhomLoaiCongViec
} from "../../apis/apiChiTietLoaiCongViec";
import { ChiTietLoaiCongViecViewModel, NhomChiTietLoai } from "../../models/ChiTietLoaiCongViecViewModel";
import Swal from "sweetalert2";
import { useDanhSachLoaiCongViecStore } from "../../store/groupCategoryStore";
import { getLoaiCogViec } from "../../apis/apiLoaiCongViec";

const { Option } = Select;

export default function TableChiTiet() {
  const { danhSachLoaiCongViec, addRanges: addRangesLoaiCongViec } = useDanhSachLoaiCongViecStore();
  const { danhSachChiTiet, addRanges, update } =
    usedanhSachChiTietStore();
  const { Search } = Input;
  useEffect(() => {
    getChiTietLoaiCongViec().then((res) => {
      addRanges(res);
      setFilteredData(res);
    });

    getLoaiCogViec().then((res) => {
      addRangesLoaiCongViec(res);
    });

  }, []);

  const [inputValue, setInputValue] = useState<string>();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const [inputValueNhom, setNhomInputValue] = useState<string>();

  const handleNhomOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNhomInputValue(event.target.value);
  };
  const [chitietById, setchitietById] =
    useState<ChiTietLoaiCongViecViewModel>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const showDrawer = (id?: number) => {
    setOpen(true);
    if (id) {
      getChiTietLoaiCongViecId(id.toString()).then((res) => {
        setchitietById(res);
      });
    }
  };
  const showDrawerAdd = () => {
    setOpenAdd(true);
  };
  const [openMD, setOpenMD] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpenMD(true);
  };

  const handleOk = (item?: ChiTietLoaiCongViecViewModel) => {
    if (item?.id) {
      item.tenNhom = inputValueNhom;
      putSuaNhomChiTietLoai(item.id, item)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Hoàn tất",
            showConfirmButton: false,
            timer: 1000,
          });
          update(res);
        })
        .catch((err) => {
          Swal.fire({
            title: "Something went wrong",
            text: err.message,
            icon: "error",
          });
        });
    }
    setOpenMD(false);
  };

  const handleCancelMD = () => {
    setOpenMD(false);
  };
  function renderChitTietLoai() {
    return (
      <>
        <div className="flex">
          <p className="text-black font-bold text-xl mr-3">
            {chitietById?.tenNhom}
          </p>
          <EditOutlined style={{ cursor: "pointer" }} onClick={showModal} />
          <Modal
            title="Title"
            open={openMD}
            onOk={() => handleOk(chitietById)}
            confirmLoading={confirmLoading}
            onCancel={handleCancelMD}
          >
            <input
              placeholder={chitietById?.tenNhom}
              type="text"

              onChange={handleNhomOnChange}
              id="146be7d9-143d-43de-a117-4f55446ed317"
              className="m-5 w-11/12 block rounded-lg border dark:border-none dark:bg-neutral-600 py-[9px] px-3 pr-4 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </Modal>
        </div>

        <img src={chitietById?.hinhAnh} alt="" width={200} className="my-5" />

        {chitietById?.dsChiTietLoai?.map((item) => {

          return (
            <div key={item.id} className="flex flex-wrap">
              <p className="font-bold">ID: {item.id}</p>
              <div className="mb-4 w-full">
                <label htmlFor="146be7d9-143d-43de-a117-4f55446ed317" />
                <div className="flex items-center">
                  <input
                    placeholder="Tên chi tiết"
                    type="text"
                    defaultValue={item.tenChiTiet}
                    onChange={handleOnChange}
                    id="146be7d9-143d-43de-a117-4f55446ed317"
                    className="m-5 w-8/12 block rounded-lg border dark:border-none dark:bg-neutral-600 py-[9px] px-3 pr-4 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                  />
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  const onClose = () => {
    setOpen(false);
  };
  const onCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleEditClick = (item: ChiTietLoaiCongViecViewModel) => {
    if (item.id) {

      putChiTietLoaiCongViecId(item?.id, item)
        .then(() => {
          getChiTietLoaiCongViec().then((res) => {
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
            title: "Something went wrong",
            text: err.message,
            icon: "error",
          });
        });
    }
  };

  const handleDeleteClick = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Dữ liệu sẽ bị xóa vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteChiTietLoaiCongViecId(id)
          .then((res) => {
            getChiTietLoaiCongViec().then((res) => {
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
              title: "Something went wrong",
              text: err.message,
              icon: "error",
            });
          });
      }
    });
  };

  const columns: TableColumnsType<ChiTietLoaiCongViecViewModel> = [
    {
      title: "ID",
      width: 50,
      dataIndex: "id",
      key: "id",
      fixed: "left",
      sorter: (a, b) => Number(a.id) - Number(b.id),
      sortDirections: ["descend"],
    },
    {
      title: "Tên nhóm",
      width: 100,
      dataIndex: "tenNhom",
      key: "tenNhom",
      fixed: "left",
    },
    {
      title: "Hình ảnh",
      width: 100,
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      fixed: "left",
      render: (_, { hinhAnh }) => (
        <>
          <img src={hinhAnh} alt="" width={200} />
        </>
      ),
    },
    {
      title: "Mã loại công việc",
      width: 50,
      dataIndex: "maLoaiCongviec",
      key: "maLoaiCongviec",
      fixed: "left",
    },
    {
      title: "Danh sách",
      width: 70,
      dataIndex: "dsChiTietLoai",
      key: "dsChiTietLoai",
      fixed: "left",
      render: (_, { dsChiTietLoai }) => <>{dsChiTietLoai?.length} công việc</>,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, { id }) => (
        <>
          <div className="flex">
            <div className="mr-2">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => showDrawer(id)}
              >
                Chỉnh sửa
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteClick(Number(id))}
              >
                Xóa
              </Button>
            </div>
          </div>
        </>
      ),
    },
  ];
  const getFormValues = async () => {
    try {
      const values = await formRef.current?.validateFields();
      addNhomLoaiCongViec({
        tenChiTiet: values?.tenChiTiet,
        maLoaiCongViec: values?.maLoaiCongViec

      });

      getChiTietLoaiCongViec().then((res) => {
        setFilteredData(res);
        addRanges(res);
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Hoàn tất",
        showConfirmButton: false,
        timer: 1000,
      });
      setOpen(false);
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "Vui lòng nhập đầy đủ thông tin",
      });
    }
  };
  const [filteredData, setFilteredData] = React.useState(danhSachChiTiet);
  useEffect(() => {
    setFilteredData(danhSachChiTiet);
  }, [danhSachChiTiet, getFormValues]);

  const [searchText, setSearchText] = React.useState('');

  const handleSearch = (event: any) => {
    const text = event.target.value;
    setSearchText(text);
    const filtered = danhSachChiTiet.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const formRef = React.useRef<FormInstance<NhomChiTietLoai>>(null);



  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  return (
    <>
      <div className='mb-5 flex justify-between'>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showDrawerAdd()}
        >
          Thêm
        </Button>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Tìm kiếm"
            allowClear
            enterButton="Search"
            size="large"
            onChange={handleSearch}
          />
        </Space>

      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: 1000, y: "65vh" }}
      />
      <Drawer
        title="Chỉnh sửa chi tiết"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            {/* <Button type="primary" onClick={onClose}>
              OK
            </Button> */}
          </Space>
        }
      >
        {renderChitTietLoai()}
      </Drawer>
      {/* add */}
      <Drawer
        title="Thêm chi tiết"
        width={720}
        onClose={onCloseAdd}
        open={openAdd}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onCloseAdd}>Hủy</Button>
            <Button onClick={getFormValues} type="primary">
              Lưu
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" ref={formRef} initialValues={{ maLoaiCongViec: 1 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tenChiTiet"
                label="Tên chi tiết"
                rules={[{ required: true, message: "Nhập tên chi tiết" }]}
              >
                <Input
                  placeholder="Nhập tên chi tiết"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maLoaiCongViec"
                label="Mã loại công việc"
              >
                <Select placeholder="Loại công việc" defaultValue={1}>
                  {
                    danhSachLoaiCongViec?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.tenLoaiCongViec}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

          </Row>
        </Form>
      </Drawer>
    </>
  );
}
