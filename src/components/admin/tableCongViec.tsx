import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getLoaiCogViec } from '../../apis/apiLoaiCongViec';
import { usedanhSachCongViecStore } from '../../store/congviecStore';
import { CongViecViewModel } from '../../models/CongViecViewModel';
import dayjs from 'dayjs';
import { getApiCongViecPhanTrang , getCongViec} from '../../apis/apiCongViec';
import { PAGE_SIZE } from '../../constants/pagesize';


export default function TableCongViec() {
  const { danhSachCongViec, addRanges, add } = usedanhSachCongViecStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getCongViec().then((res) => {
      addRanges(res);
    });
  }, []);

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    add({
      id: dayjs().millisecond() + danhSachCongViec.length,
      tenCongViec: inputValue,
    });
  };


  const columns: TableColumnsType<CongViecViewModel> = [
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
      title: 'Tên công việc',
      width: 170,
      dataIndex: 'tenCongViec',
      key: 'tenCongViec',
      fixed: 'left',
    },
    {
      title: 'Đánh giá',
      width: 70,
      dataIndex: 'danhGia',
      key: 'danhGia',
      fixed: 'left',
    },
    {
      title: 'Giá tiền',
      width: 70,
      dataIndex: 'giaTien',
      key: 'giaTien',
      fixed: 'left',
    },
    // {
    //   title: 'Người tạo',
    //   width: 170,
    //   dataIndex: 'nguoiTao',
    //   key: 'nguoiTao',
    //   fixed: 'left',
    // },
    // {
    //   title: 'Mô tả',
    //   width: 170,
    //   dataIndex: 'moTa',
    //   key: 'moTa',
    //   fixed: 'left',
    // },
    // {
    //   title: 'Mã chi tiết loại',
    //   width: 170,
    //   dataIndex: 'maChiTietLoaiCongViec',
    //   key: 'maChiTietLoaiCongViec',
    //   fixed: 'left',
    // },
    // {
    //   title: 'Mô tả ngắn',
    //   width: 170,
    //   dataIndex: 'moTaNgan',
    //   key: 'moTaNgan',
    //   fixed: 'left',
    // },
    {
      title: 'Sao công việc',
      width: 70,
      dataIndex: 'saoCongViec',
      key: 'saoCongViec',
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
          <Input placeholder='Thêm công việc' onChange={handleInputChange} value={inputValue}/>
          <Button type="primary" onClick={handleButtonClick}>Submit</Button>
        </Space.Compact> */}
      </div>
      <Table columns={columns} dataSource={danhSachCongViec} scroll={{ x: 1000, y: "100vh" }} />
    </>)
}