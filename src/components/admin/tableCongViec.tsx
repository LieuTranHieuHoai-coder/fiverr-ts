import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined, RightOutlined } from '@ant-design/icons';
import { usedanhSachCongViecStore } from '../../store/congviecStore';
import { CongViecViewModel } from '../../models/CongViecViewModel';
import dayjs from 'dayjs';
import { deleteCongViec, getCongViec } from '../../apis/apiCongViec';
import { PAGE_SIZE } from '../../constants/pagesize';
import Swal from 'sweetalert2';
import EditCongViec from './btnEditCongViec';
import { Link } from 'react-router-dom';


export default function TableCongViec() {
  const { danhSachCongViec, addRanges, add, remove } = usedanhSachCongViecStore();
  const { Search } = Input;
  useEffect(() => {
    getCongViec().then((res) => {
      addRanges(res);
      setFilteredData(res);
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

  const handleDeleteClick = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Dữ liệu sẽ bị xóa vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCongViec(id).then((res) => {
          getCongViec().then((res) => {
            addRanges(res);
            setFilteredData(res);
          });

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Hoàn tất",
            showConfirmButton: false,
            timer: 1000
          });

          // getCongViec().then((res) => {
          //   addRanges(res);
          // });
        }).catch((err) => {
          Swal.fire({
            title: "Something went wrong",
            text: err.message,
            icon: "error",
          });
        });
      }
    });
  };
  const columns: TableColumnsType<CongViecViewModel> = [
    {
      title: 'ID',
      width: 30,
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
      width: 40,
      dataIndex: 'danhGia',
      key: 'danhGia',
      fixed: 'left',
    },
    {
      title: 'Giá tiền',
      width: 40,
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
      width: 40,
      dataIndex: 'saoCongViec',
      key: 'saoCongViec',
      fixed: 'left',
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
              <EditCongViec congViec={item}></EditCongViec>
            </div>  
            <div className="mr-2">
              <Button type="primary" style={{background:"green"}} icon={<RightOutlined />}>
                <Link to={`/gig/${item.id}`}>Bài viết</Link>
              </Button>
            </div>
            <div>
              <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDeleteClick(Number(item.id))}>
                Delete
              </Button>
            </div>

          </div>
        </>
      ),
    },
  ];


  const [filteredData, setFilteredData] = React.useState(danhSachCongViec);
  useEffect(() => {
    setFilteredData(danhSachCongViec);
  }, [danhSachCongViec]);
  const [searchText, setSearchText] = React.useState('');
  const handleSearchChange = () => {

    const filtered = danhSachCongViec.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };
  const handleSearch = (event: any) => {
    const text = event.target.value;
    setSearchText(text);
    const filtered = danhSachCongViec.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <div className='mb-5 flex justify-between'>
        <EditCongViec congViec={undefined}></EditCongViec>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Tìm kiếm"
            allowClear
            enterButton="Search"
            size="large"
            onChange={handleSearch}
            onSearch={handleSearchChange}
          />
        </Space>

      </div>
      <Table columns={columns} dataSource={filteredData} scroll={{ x: 1000, y: "100vh" }} />
    </>)
}