import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getLoaiCogViecTheoId } from "./../../apis/apiLoaiCongViec";
import { Breadcrumb } from "antd";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { LoaiCongViecViewModel } from "../../models/LoaiCongViecModel";

export default function Categories() {
    const { id } = useParams();
    console.log(id);
  const [loaicongviec, setLoaiCongViec] = useState<LoaiCongViecViewModel>();

  React.useEffect(() => {
    const fletchName = async () => {
      const name = await getLoaiCogViecTheoId(id);
      setLoaiCongViec(name);
    };
    fletchName();
  }, [id]);
  return (
    <div className="container m-auto" >
      <Breadcrumb className="my-5"
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: (
              <>
                <AppstoreOutlined />
                <span>{loaicongviec?.tenLoaiCongViec}</span>
              </>
            ),
          },
        ]}
      />
      
    </div>
  );
}
