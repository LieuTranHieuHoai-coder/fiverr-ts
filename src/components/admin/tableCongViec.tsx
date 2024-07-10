import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { usedanhSachCongViecStore } from '../../store/congviecStore';
import { CongViecViewModel } from '../../models/CongViecViewModel';
import dayjs from 'dayjs';
import { deleteCongViec , getCongViec} from '../../apis/apiCongViec';
import { PAGE_SIZE } from '../../constants/pagesize';
import Swal from 'sweetalert2';


export default function TableCongViec() {
  const { danhSachCongViec, addRanges, add , remove} = usedanhSachCongViecStore();
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
        deleteCongViec(id).then((res) => {
          remove(id);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1000
          });
          
          // getCongViec().then((res) => {
          //   addRanges(res);
          // });
        }).catch((err) => {
          Swal.fire({title: "Something went wrong",
            text: err.message,
            icon: "error",});
        });  
      }
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
      render: (_, {id}) =>
        (
          <>
            <div className="flex">
              <div className="mr-2">
                <Button type="primary" icon={<EditOutlined />} onClick={()=>handleEditClick(Number(id))}>
                  Edit
                </Button>
              </div>
              <div>
                <Button type="primary" danger icon={<DeleteOutlined />} onClick={()=>handleDeleteClick(Number(id))}>
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