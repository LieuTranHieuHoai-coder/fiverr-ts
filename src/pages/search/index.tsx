import React, { useEffect, useState } from "react";
import { getDanhSachCongViecTheoTen } from "../../apis/apiCongViec";
import { CongViecById } from "../../models/CongViecViewModel";
import JobItem from "../../components/jobs/jobitem";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function Search() {
  const { search } = useParams();
  //const [search, searchText] = useState<string>("logo");
  const [lsSearch, setLst] = useState<CongViecById[]>([]);
  useEffect(() => {
    getDanhSachCongViecTheoTen(search).then((res) => {
      setLst(res);
    });
  }, []);

  function renderJobs() {
    return lsSearch?.map((item) => {
      return <JobItem item={item.congViec}></JobItem>;
    });
  }

  return (
    <div className="container m-auto md:w-11/12">
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
                <span>Search</span>
              </>
            ),
          },
        ]}
      />
      <h2 className="text-4xl my-5"> Results ({lsSearch.length})</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 xs:grid-cols-1 gap-4">{renderJobs()}</div>
    </div>
  );
}
