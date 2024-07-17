import { useEffect, useState } from "react";
import JobItem from "../../components/jobs/jobitem";
import "./orders.scss";
import { getDanhSachDaThue } from "../../apis/apiThueCongViec";
import { Breadcrumb, Pagination } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDanhSachThueStore } from "../../store/orderStore";

export default function Orders() {
  const { addRanges, danhSachThue } = useDanhSachThueStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDanhSachDaThue();
        addRanges(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [addRanges]);


  const totalItems = danhSachThue.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = danhSachThue.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  function renderOrder() {
    return currentItems?.map((item) => {
      return <JobItem item={item.congViec} hoanThanh={item.hoanThanh} maThueCongViec={item.id}></JobItem>;
    });
  }

  return (
    <div className="container m-auto ">
      <Breadcrumb
        className="my-5"
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: (
              <>
                <span>Order</span>
              </>
            ),
          },
        ]}
      />
      <h2 className="text-4xl my-5"> Results ({danhSachThue.length})</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 xs:grid-cols-1 gap-4">
        {renderOrder()}
      </div>
      <div className="pagination flex items-center justify-center w-full m-5">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={totalItems}
          onChange={handlePageChange}
          showSizeChanger
          onShowSizeChange={(_, size) => setItemsPerPage(size)}
        />
      </div>
    </div>
  );
}
