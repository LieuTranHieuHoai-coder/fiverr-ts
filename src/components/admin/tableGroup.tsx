import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, Modal, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { getLoaiCogViec, postLoaiCongViec, putLoaiCongViec, deleteLoaiCongViec, getLoaiCogViecTheoId } from '../../apis/apiLoaiCongViec';
import { useDanhSachLoaiCongViecStore } from '../../store/groupCategoryStore';
import { LoaiCongViecViewModel } from '../../models/LoaiCongViecModel';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';


export default function TableGroup() {
  const { danhSachLoaiCongViec, addRanges, add, update } = useDanhSachLoaiCongViecStore();
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
          title: "Hoàn tất",
          showConfirmButton: false,
          timer: 1000
        });
      });
    });
  };


  const handleDeleteClick = (id: number | undefined) => {
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
        deleteLoaiCongViec(id).then(() => {
          getLoaiCogViec().then((res) => {
            addRanges(res);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Hoàn tất",
              showConfirmButton: false,
              timer: 1000
            });
          });
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
      render: (_, { id, tenLoaiCongViec }) =>
      (
        <>
          <div className="flex">
            <div className="mr-2">
              <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(id, tenLoaiCongViec)}>
                Chỉnh sửa
              </Button>

            </div>
            <div>
              <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDeleteClick(id)}>
                Xóa
              </Button>
            </div>

          </div>

        </>
      ),
    },
  ];

  //open modal

  const [openMD, setOpenMD] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editId, setEditId] = useState<number>();
  const [editTen, setEditTen] = useState('');
  const showModal = (id?: number, tenLoaiCongViec?: string) => {
    if (id !== undefined && tenLoaiCongViec !== undefined) {
      setEditId(id);
      setEditTen(tenLoaiCongViec);
    }
    setEditTen(tenLoaiCongViec || "");
    setOpenMD(true);
  };

  const handleOk = () => {
    if (editId !== undefined) {
      putLoaiCongViec(editId, { tenLoaiCongViec: editValue })
        .then((res) => {
          getLoaiCogViec().then((res) => {
            addRanges(res);
          });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Hoàn tất",
            showConfirmButton: false,
            timer: 1000,
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
    setOpenMD(false);
  };

  const handleCancelMD = () => {
    setOpenMD(false);
  };
  const [editValue, setEditValue] = useState('');
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };
  return (
    <>
      <div className='mb-5'>
        <Space.Compact style={{ width: '100%' }}>
          <Input placeholder='Thêm loại công việc' onChange={handleInputChange} value={inputValue} />
          <Button type="primary" onClick={handleButtonClick}>Submit</Button>
        </Space.Compact>
      </div>
      <Table columns={columns} dataSource={danhSachLoaiCongViec} scroll={{ x: 1000, y: "100vh" }} />
      <ConfigProvider
        theme={{
          token: {
            colorBgMask: "rgba(0, 0, 0, 0.15)"
          },
        }}
      >
        <Modal
          title="Chỉnh sửa loại công việc"
          open={openMD}
          onOk={() => handleOk()}
          confirmLoading={confirmLoading}
          onCancel={handleCancelMD}
        >
          <input
            placeholder={editTen}
            type="text"
            onChange={handleOnChange}
            id="146be7d9-143d-43de-a117-4f55446ed317"
            className="m-5 w-11/12 block rounded-lg border dark:border-none py-[9px] px-3 pr-4 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
          />
        </Modal>
      </ConfigProvider>
    </>)
}