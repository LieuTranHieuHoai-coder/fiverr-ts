import { useEffect } from "react";
import JobItem from "../../components/jobs/jobitem";
import "./orders.scss";
import { getDanhSachDaThue } from "../../apis/apiThueCongViec";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDanhSachThueStore } from "../../store/orderStore";

export default function Orders() {
  const { addRanges, danhSachThue } = useDanhSachThueStore();
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


  console.log(danhSachThue);
  function renderOrder() {

    return danhSachThue?.map((item) => {
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
      <div className="grid grid-cols-4 gap-4">{renderOrder()}</div>
    </div>
  );
}
