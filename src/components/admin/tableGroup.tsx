import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { getLoaiCogViec, postLoaiCongViec, putLoaiCongViec, deleteLoaiCongViec } from '../../apis/apiLoaiCongViec';
import { useDanhSachLoaiCongViecStore } from '../../store/groupCategoryStore';
import { LoaiCongViecViewModel } from '../../models/LoaiCongViecModel';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';


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
    postLoaiCongViec({
      tenLoaiCongViec: inputValue,
    }).then(() => {
      getLoaiCogViec().then((res) => {
        addRanges(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000
        });
      });
    });  
  };

  const handleEditClick = (id: number | undefined) => {
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
        deleteLoaiCongViec(id).then(() => {
          getLoaiCogViec().then((res) => {
            addRanges(res);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1000
            });
          });
        }).catch((err) => {
          Swal.fire({title: "Something went wrong",
            text: err.message,
            icon: "error",});
        });  
      }
    });
  };

  const columns: TableColumnsType<LoaiCongViecViewModel> = [
    {
      title: 'Group ID',
      width: 50,
      dataIndex: 'id',
      key: "id",
      fixed: 'left',
      defaultSortOrder: 'descend',
      sorter: (a, b) => Number(a.id) - Number(b.id),
      //sortDirections: ['descend'],
      
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
      render: (_, {id}) =>
      (
        <>
          <div className="flex">
            <div className="mr-2">
              <Button type="primary" icon={<EditOutlined />} onClick={()=>handleEditClick(id)}>
                Edit
              </Button>
            </div>
            <div>
              <Button type="primary" danger icon={<DeleteOutlined />} onClick={()=>handleDeleteClick(id)}>
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
      <Table columns={columns} dataSource={danhSachLoaiCongViec} scroll={{ x: 1000, y: "100vh" }} />
    </>)
}