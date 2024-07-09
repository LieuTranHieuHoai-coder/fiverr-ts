import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getThueCongViec } from '../../apis/apiThueCongViec';
import { useDanhSachThueStore } from '../../store/orderStore';
import { CongViecThue } from '../../models/CongViecViewModel';


export default function TableThueCongViec() {
  const { danhSachThue, addRanges, add } = useDanhSachThueStore();
  useEffect(() => {
    getThueCongViec().then((res) => {
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


  const columns: TableColumnsType<CongViecThue> = [
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
      title: 'Mã công việc',
      width: 70,
      dataIndex: 'maCongViec',
      key: 'maCongViec',
      fixed: 'left',
    },
    {
      title: 'Mã người thuê',
      width: 70,
      dataIndex: 'maNguoiThue',
      key: 'maNguoiThue',
      fixed: 'left',
    },
    {
      title: 'Ngày thuê',
      width: 70,
      dataIndex: 'ngayThue',
      key: 'ngayThue',
      fixed: 'left',
    },
    {
      title: 'Hoàn thành',
      width: 70,
      dataIndex: 'hoanThanh',
      key: 'hoanThanh',
      fixed: 'left',
      render: (_, { hoanThanh }) => (
        <>
          {hoanThanh ? <Tag color="green" key={1}>
            Hoàn thành
          </Tag> : <Tag color="gold" key={2}>
            Chưa hoàn thành
          </Tag>}
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
      <Table columns={columns} dataSource={danhSachThue} scroll={{ x: 1000, y: "100vh" }} />
    </>)
}