import { useState } from "react";
import { Content } from "../../models/CongViecViewModel";
import { getApiCongViecPhanTrang } from "../../apis/apiCongViec";
import React from "react";
import { Pagination } from "antd";
import { PAGE_SIZE } from "../../constants/pagesize";
import { StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
        <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark" key={item.id}>
          <div
            className="relative overflow-hidden bg-cover bg-no-repeat"
            data-twe-ripple-init
            data-twe-ripple-color="light"
          >
            <img className="rounded-t-lg m-auto" src={item.hinhAnh} />
            <Link to={`/gig/${item.id}`}>
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100" />
            </Link>
          </div>
          <div className="p-6 text-surface dark:text-white">
            <h5 className="mb-2 text-lg text-black font-bold leading-tight">
              {item.tenCongViec}
            </h5>
            <p className="mb-4 text-base truncate  text-ellipsis overflow-hidden">
              {item.moTaNgan}
            </p>
            <div className="flex items-center align-baseline justify-between">
              <div>
                <span className="text-black font-bold"> Rate {item.saoCongViec}/5</span>
                <StarFilled className="ml-1 mb-1" />
              </div>
              <div>
                <span className="text-gray-500">
                  Vote: {item.danhGia}
                </span>
              </div>
            </div>
            <div className="my-3">
                <span className="text-black font-bold text-lg">
                  From ${item.giaTien}
                </span>
              </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">{renderJobs()}</div>
      <div className="my-5">
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
