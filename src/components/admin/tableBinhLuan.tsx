import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { deleteBinhLuan, getBinhLuan } from '../../apis/apiBinhLuan';
import { usedanhSachBLStore } from '../../store/commentStore';
import { LoaiCongViecViewModel } from '../../models/LoaiCongViecModel';
import dayjs from 'dayjs';
import { BinhLuanViewModel } from '../../models/BinhLuanViewModel';
import EditBinhLuan from './btnEditBinhLuan';
import Swal from 'sweetalert2';


export default function TableBinhLuan() {
  const { Search } = Input;
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

  const handleDeleteClick = (id: number | undefined) => {
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
        deleteBinhLuan(id)
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1000,
            });
            getBinhLuan().then((res) => {
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
  const columns: TableColumnsType<BinhLuanViewModel> = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: "id",
      sorter: (a, b) => Number(a.id) - Number(b.id),
      sortDirections: ['descend'],
    },
    {
      title: 'Mã người bình luận',
      width: 70,
      dataIndex: 'maNguoiBinhLuan',
      key: 'maNguoiBinhLuan',
    },
    {
      title: 'Ngày bình luận',
      width: 100,
      dataIndex: 'ngayBinhLuan',
      key: 'ngayBinhLuan',
    },
    {
      title: 'Nội dung',
      width: 170,
      dataIndex: 'noiDung',
      key: 'noiDung',
    },
    {
      title: 'Sao bình luận',
      width: 70,
      dataIndex: 'saoBinhLuan',
      key: 'saoBinhLuan',
    },
    {
      title: 'Action',
      key: 'operation',
      width: 100,
      render: (_,item) =>
      (
        <>
          <div className="flex">
            <div className="mr-2">
              <EditBinhLuan binhluan={item}></EditBinhLuan>
            </div>
            <div>
              <Button type="primary" danger icon={<DeleteOutlined />} onClick={()=>handleDeleteClick(item.id)}>
                Delete
              </Button>
            </div>
          </div>
        </>
      ),
    },
  ];

  const [filteredData, setFilteredData] = React.useState(daSachBL);
  useEffect(() => {
    setFilteredData(daSachBL);
  }, [daSachBL]);
  const [searchText, setSearchText] = React.useState('');
  const handleSearchClick = () => {
    const filtered = daSachBL.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };
  const handleSearch = (event: any) => {
    const text = event.target.value;
    setSearchText(text);
    const filtered = daSachBL.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };
  return (
    <>
      <div className='mb-5 flex justify-between'>
        {/* <EditCongViec congViec={undefined}></EditCongViec> */}
        <div></div>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Tìm kiếm"
            allowClear
            enterButton="Search"
            size="large"
            onChange={handleSearch}
            onSearch={handleSearchClick}
          />
        </Space>

      </div>
      <Table columns={columns} dataSource={filteredData} scroll={{ x: 1000, y: "100vh" }} />
    </>)
}