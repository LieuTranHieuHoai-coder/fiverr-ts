import React, { MouseEventHandler, useEffect, useState } from "react";
import { Avatar, Button, Input, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { PAGE_SIZE } from "../../constants/pagesize";
import { useNguoiDungStore } from "../../store/userStore";
import {
  getUserPhanTrang,
  getUsers,
  deleteUsers,
} from "../../apis/apiNguoiDung";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import Swal from "sweetalert2";
import EditNguoiDung from "./btnEditNguoiDung";

export default function TableNguoiDung() {
  const { lstUsers, addRanges, remove } = useNguoiDungStore();
  useEffect(() => {
    getUsers().then((res) => {
      addRanges(res);
    });
  }, []);

  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // const handleButtonClick = () => {
  //   add({
  //     id: dayjs().millisecond() + danhSachLoaiCongViec.length ,
  //     tenLoaiCongViec: inputValue,
  //   });

  // };

  const handleEditClick = (id: number | undefined) => {};

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
        deleteUsers(id)
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1000,
            });
            getUsers().then((res) => {
              addRanges(res);
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
  const columns: TableColumnsType<ThongTinNguoiDung> = [
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
      title: "Tên",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Avatar",
      width: 70,
      dataIndex: "avatar",
      key: "avatar",
      fixed: "left",
      render: (_, { avatar }) => (
        <>
          {avatar ? (
            <Avatar src={avatar} />
          ) : (
            <Avatar size={32} icon={<UserOutlined />} />
          )}
        </>
      ),
    },
    {
      title: "Email",
      width: 100,
      dataIndex: "email",
      key: "email",
      fixed: "left",
    },
    {
      title: "Phone",
      width: 100,
      dataIndex: "phone",
      key: "phone",
      fixed: "left",
    },
    {
      title: "Ngày sinh",
      width: 100,
      dataIndex: "birthday",
      key: "birthday",
      fixed: "left",
    },
    {
      title: "Giới tính",
      width: 70,
      dataIndex: "gender",
      key: "gender",
      fixed: "left",
      render: (_, { gender }) => <>{gender ? "Nam" : "Nữ"}</>,
    },
    {
      title: "Quyền hạn",
      width: 70,
      dataIndex: "role",
      key: "role",
      fixed: "left",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, item) => (
        <>
          <div className="flex">
            <div className="mr-2">
              <EditNguoiDung nguoiDung={item}></EditNguoiDung>
              {/* <Button type="primary" icon={<EditOutlined />} onClick={()=>handleEditClick(Number(id))}>
                  Edit
                </Button> */}
            </div>
            <div>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteClick(Number(item.id))}
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
        dataSource={lstUsers}
        scroll={{ x: 1000, y: "100vh" }}
      />
    </>
  );
}
