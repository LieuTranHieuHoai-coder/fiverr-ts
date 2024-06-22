import { useEffect, useState } from "react";
import JobItem from "../../components/jobs/jobitem";
import "./orders.scss";
import { getDanhSachDaThue } from "../../apis/apiThueCongViec";
import { CongViecThue } from "../../models/CongViecViewModel";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function Orders() {
  const [lsOrder, setLst] = useState<CongViecThue[]>([]);
  useEffect(() => {
    getDanhSachDaThue().then((res) => {
      setLst(res);
    });
  }, []);

  function renderOrder() {
    return lsOrder?.map((item) => {
      return <JobItem item={item.congViec} hoanThanh={item.hoanThanh}></JobItem>;
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
      <h2 className="text-4xl my-5"> Results ({lsOrder.length})</h2>
      <div className="grid grid-cols-4 gap-4">{renderOrder()}</div>
    </div>
  );
}
