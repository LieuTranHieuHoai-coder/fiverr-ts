import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { getLoaiCogViec } from '../../apis/apiLoaiCongViec';
import { useDanhSachLoaiCongViecStore } from '../../store/groupCategoryStore';
import { LoaiCongViecViewModel } from '../../models/LoaiCongViecModel';
import dayjs from 'dayjs';


export default function TableGroup() {
  const { danhSachLoaiCongViec, addRanges, add } = useDanhSachLoaiCongViecStore();
  useEffect(() => {
    getLoaiCogViec().then((res) => {
      addRanges(res);
    });
  }, []);

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    add({
      id: dayjs().millisecond() + danhSachLoaiCongViec.length ,
      tenLoaiCongViec: inputValue,
    });

  };


  const columns: TableColumnsType<LoaiCongViecViewModel> = [
    {
      title: 'Group ID',
      width: 50,
      dataIndex: 'id',
      key: "id",
      fixed: 'left',
      sorter: (a, b) => Number(a.id) - Number(b.id),
      sortDirections: ['descend'],
    },
    {
      title: 'Group Name',
      width: 170,
      dataIndex: 'tenLoaiCongViec',
      key: 'tenLoaiCongViec',
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
        <Space.Compact style={{ width: '100%' }}>
          <Input placeholder='Add a new group' onChange={handleInputChange} value={inputValue}/>
          <Button type="primary" onClick={handleButtonClick}>Submit</Button>
        </Space.Compact>
      </div>
      <Table columns={columns} dataSource={danhSachLoaiCongViec} scroll={{ x: 1000, y: 400 }} />
    </>)
}