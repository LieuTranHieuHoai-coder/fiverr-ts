import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { getBinhLuan } from '../../apis/apiBinhLuan';
import { usedanhSachBLStore } from '../../store/commentStore';
import { LoaiCongViecViewModel } from '../../models/LoaiCongViecModel';
import dayjs from 'dayjs';
import { BinhLuanViewModel } from '../../models/BinhLuanViewModel';


export default function TableBinhLuan() {
  const { daSachBL, addRanges, add } = usedanhSachBLStore();
  useEffect(() => {
    getBinhLuan().then((res) => {
      addRanges(res);
    });
  }, []);

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  const columns: TableColumnsType<BinhLuanViewModel> = [
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
      title: 'Mã người bình luận',
      width: 70,
      dataIndex: 'maNguoiBinhLuan',
      key: 'maNguoiBinhLuan',
      fixed: 'left',
    },
    {
      title: 'Ngày bình luận',
      width: 100,
      dataIndex: 'ngayBinhLuan',
      key: 'ngayBinhLuan',
      fixed: 'left',
    },
    {
      title: 'Nội dung',
      width: 170,
      dataIndex: 'noiDung',
      key: 'noiDung',
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
      <Table columns={columns} dataSource={daSachBL} scroll={{ x: 1000, y: "100vh" }} />
    </>)
}