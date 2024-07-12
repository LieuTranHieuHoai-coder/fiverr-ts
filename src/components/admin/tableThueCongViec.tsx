import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getThueCongViec, deleteThueCongViec, putThueCongViec } from '../../apis/apiThueCongViec';
import { useDanhSachThueStore } from '../../store/orderStore';
import { CongViecThue } from '../../models/CongViecViewModel';
import Swal from 'sweetalert2';
import EditThueCongViec from './btnEditThueCongViec';


export default function TableThueCongViec() {
  const { danhSachThue, addRanges, remove } = useDanhSachThueStore();
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
  const handleEditClick = (id: number | undefined) => {
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
        remove(id);
        deleteThueCongViec(id).then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1000
          });
        }).catch((err) => {
          Swal.fire({title: "Something went wrong",
            text: err.message,
            icon: "error",});
        });  
      }
    });
  };

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
      render: (_, item) =>
        (
          <>
            <div className="flex">
              <div className="mr-2">
                <EditThueCongViec thueCongViec={item}></EditThueCongViec>
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


  const { Search } = Input;
  const [filteredData, setFilteredData] = React.useState(danhSachThue);
  useEffect(() => {
    setFilteredData(danhSachThue);
  }, [danhSachThue]);
  const [searchText, setSearchText] = React.useState('');

  const handleSearch = (event: any) => {
    const text = event.target.value;
    setSearchText(text);
    const filtered = danhSachThue.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };
  return (
    <>
      <div className='mb-5 flex justify-between'>
        <EditThueCongViec></EditThueCongViec>
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
      <Table columns={columns} dataSource={filteredData} scroll={{ x: 1000, y: "100vh" }} />
    </>)
}