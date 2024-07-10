import React, { useEffect, useState } from "react";
import { Button, Drawer, Modal, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { usedanhSachChiTietStore } from "../../store/chitietcongviecStore";
import {
  getChiTietLoaiCongViec,
  deleteChiTietLoaiCongViecId,
  putChiTietLoaiCongViecId,
  getChiTietLoaiCongViecId,
  putSuaNhomChiTietLoai,
} from "../../apis/apiChiTietLoaiCongViec";
import { ChiTietLoaiCongViecViewModel } from "../../models/ChiTietLoaiCongViecViewModel";
import Swal from "sweetalert2";

export default function TableChiTiet() {
  const { danhSachChiTiet, addRanges, add, remove, update } =
    usedanhSachChiTietStore();
  useEffect(() => {
    getChiTietLoaiCongViec().then((res) => {
      addRanges(res);
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
  const showDrawer = (id?: number) => {
    setOpen(true);
    if (id) {
      getChiTietLoaiCongViecId(id.toString()).then((res) => {
        setchitietById(res);
      });
    }
  };

  const [openMD, setOpenMD] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

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
            title: "Your work has been saved",
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
  // const handleButtonClick = () => {
  //   add({
  //     id: dayjs().millisecond() + danhSachLoaiCongViec.length ,
  //     tenLoaiCongViec: inputValue,
  //   });

  // };

  const handleEditClick = (item: ChiTietLoaiCongViecViewModel) => {
    if (item.id) {
      
      putChiTietLoaiCongViecId(item?.id, item)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1000,
          });
          update(item);
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
      title: "Would you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteChiTietLoaiCongViecId(id)
          .then((res) => {
            remove(id);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1000,
            });

            // getCongViec().then((res) => {
            //   addRanges(res);
            // });
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
                Edit
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteClick(Number(id))}
              >
                Delete
              </Button>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="mb-5">
        {/* <Space.Compact style={{ width: '100%' }}>
          <Input placeholder='Add a new group' onChange={handleInputChange} value={inputValue}/>
          <Button type="primary" onClick={handleButtonClick}>Submit</Button>
        </Space.Compact> */}
      </div>
      <Table
        columns={columns}
        dataSource={danhSachChiTiet}
        scroll={{ x: 1000, y: "65vh" }}
      />
      <Drawer
        title="Edit"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        {renderChitTietLoai()}
      </Drawer>
    </>
  );
}
