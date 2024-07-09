import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { getLoaiCogViec } from '../../apis/apiLoaiCongViec';
import { useDanhSachLoaiCongViecStore } from '../../store/groupCategoryStore';
import { LoaiCongViecViewModel } from '../../models/LoaiCongViecModel';
import dayjs from 'dayjs';
import { usedanhSachChiTietStore } from '../../store/chitietcongviecStore';
import { PAGE_SIZE } from '../../constants/pagesize';
import { getChiTietLoaiCongViec_phantrang } from '../../apis/apiChiTietLoaiCongViec';
import { ChiTietLoaiCongViecViewModel } from '../../models/ChiTietLoaiCongViecViewModel';


export default function TableChiTiet() {
  const { danhSachChiTiet, addRanges, add } = usedanhSachChiTietStore();
  useEffect(() => {
    getChiTietLoaiCongViec_phantrang(1,PAGE_SIZE,"").then((res) => {
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


  const columns: TableColumnsType<ChiTietLoaiCongViecViewModel> = [
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
      title: 'Tên nhóm',
      width: 100,
      dataIndex: 'tenNhom',
      key: 'tenNhom',
      fixed: 'left',
    },
    {
      title: 'Hình ảnh',
      width: 100,
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      fixed: 'left',
      render: (_, { hinhAnh }) => (
        <>
          <img src={hinhAnh} alt="" width={200}/>
        </>
      ),
    },
    {
      title: 'Mã loại công việc',
      width: 50,
      dataIndex: 'maLoaiCongviec',
      key: 'maLoaiCongviec',
      fixed: 'left',
    },
    {
      title: 'Danh sách',
      width: 70,
      dataIndex: 'dsChiTietLoai',
      key: 'dsChiTietLoai',
      fixed: 'left',
      render: (_, { dsChiTietLoai }) => (
        <>
          {dsChiTietLoai?.length } công việc
        </>
      ),
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
      <Table columns={columns} dataSource={danhSachChiTiet} scroll={{ x: 1000, y: "100vh" }} />
    </>)
}