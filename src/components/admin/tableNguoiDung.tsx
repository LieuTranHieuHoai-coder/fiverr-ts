import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Avatar, Button, Input, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { PAGE_SIZE } from '../../constants/pagesize';
import { useNguoiDungStore } from '../../store/userStore';
import { getUserPhanTrang } from '../../apis/apiNguoiDung';
import { ThongTinNguoiDung } from '../../models/ThongTinNguoiDung';


export default function TableNguoiDung() {
  const { lstUsers, addRanges, add } = useNguoiDungStore();
  useEffect(() => {
    getUserPhanTrang(1,PAGE_SIZE,"").then((res) => {
      addRanges(res);
    });
  }, []);

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // const handleButtonClick = () => {
  //   add({
  //     id: dayjs().millisecond() + danhSachLoaiCongViec.length ,
  //     tenLoaiCongViec: inputValue,
  //   });

  // };


  const columns: TableColumnsType<ThongTinNguoiDung> = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: "id",
      fixed: 'left',
      sorter: (a, b) => Number(a.id) - Number(b.id),
      sortDirections: ['descend'],
    },
    {
      title: 'Tên',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Avatar',
      width: 70,
      dataIndex: 'avatar',
      key: 'avatar',
      fixed: 'left',
      render: (_, { avatar }) => (
        <>
          {avatar ? <Avatar src={avatar} /> : <Avatar size={32} icon={<UserOutlined />} />}
        </>
      ),
    },
    {
      title: 'Email',
      width: 100,
      dataIndex: 'email',
      key: 'email',
      fixed: 'left',
    },
    {
      title: 'Phone',
      width: 100,
      dataIndex: 'phone',
      key: 'phone',
      fixed: 'left',
    },
    {
      title: 'Ngày sinh',
      width: 100,
      dataIndex: 'birthday',
      key: 'birthday',
      fixed: 'left',
    },
    {
      title: 'Giới tính',
      width: 70,
      dataIndex: 'gender',
      key: 'gender',
      fixed: 'left',
      render: (_, { gender }) => (
        <>
          {gender ? "Nam" : "Nữ" }
        </>
      ),
    },
    {
      title: 'Quyền hạn',
      width: 70,
      dataIndex: 'role',
      key: 'role',
      fixed: 'left',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () =>
      (
        <>
          <div className="flex">
            <div className="mr-2">
              <Button type="primary" icon={<EditOutlined />} >
                Edit
              </Button>
            </div>
            <div>
              <Button type="primary" danger icon={<DeleteOutlined />}>
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
      <div className='mb-5'>
        {/* <Space.Compact style={{ width: '100%' }}>
          <Input placeholder='Add a new group' onChange={handleInputChange} value={inputValue}/>
          <Button type="primary" onClick={handleButtonClick}>Submit</Button>
        </Space.Compact> */}
      </div>
      <Table columns={columns} dataSource={lstUsers} scroll={{ x: 1000, y: "100vh" }} />
    </>)
}