import { useState } from "react";
import { Content } from "../../models/CongViecViewModel";
import { getApiCongViecPhanTrang } from "../../apis/apiCongViec";
import React from "react";
import { Pagination } from "antd";
import { PAGE_SIZE } from "../../constants/pagesize";
import { StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import JobItem from "./jobitem";

export default function Jobs() {
  const [jobs, setjobs] = useState<Content>();
  const [currentPage, setCurrentPage] = useState(1);
  React.useEffect(() => {
    getApiCongViecPhanTrang(currentPage, PAGE_SIZE).then((data) => {
      setjobs(data);
    });
  }, [currentPage]);

  function renderJobs() {
    return jobs?.data.map((item) => {
      return (
        
        <JobItem item={item}></JobItem>
      );
    });
  }
  return (
    <div>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 xs:grid-cols-1 gap-4">{renderJobs()}</div>
      <div className="m-5 flex items-center justify-center w-full">
        <Pagination
          defaultCurrent={currentPage}
          total={jobs?.totalRow}
          showTotal={(total) => `Total ${total} items`}
          pageSize={PAGE_SIZE}
          onChange={(page: number) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
}
