import { useState } from "react";
import { CongViecById } from "../../models/CongViecViewModel";
import { getCongViecTheoChiTietLoai } from "../../apis/apiCongViec";
import React from "react";
import { StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

type Props = {
  value: number;
}
export default function JobsFilter(props: Props){
  const { value } = props;
  const [jobs, setjobs] = useState<CongViecById[]>([]);
  React.useEffect(() => {
    getCongViecTheoChiTietLoai(value).then((data) => {
      setjobs(data);
    });
  }, [value]);

  function renderJobs() {
    return jobs?.map((item) => {
      return (
        <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark" key={item.congViec.id}>
          <div
            className="relative overflow-hidden bg-cover bg-no-repeat"
            data-twe-ripple-init
            data-twe-ripple-color="light"
          >
            <img className="rounded-t-lg m-auto" src={item.congViec.hinhAnh} />
            <Link to={`/gig/${item.congViec.id}`}>
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100" />
            </Link>
          </div>
          <div className="p-6 text-surface dark:text-white">
            <h5 className="mb-2 text-lg text-black font-bold leading-tight">
              {item.congViec.tenCongViec}
            </h5>
            <p className="mb-4 text-base truncate  text-ellipsis overflow-hidden">
              {item.congViec.moTaNgan}
            </p>
            <div className="flex items-center align-baseline justify-between">
              <div>
                <span className="text-black font-bold"> Rate {item.congViec.saoCongViec}/5</span>
                <StarFilled className="ml-1 mb-1" />
              </div>
              <div>
                <span className="text-gray-500">
                  Vote: {item.congViec.danhGia}
                </span>
              </div>
            </div>
            <div className="my-3">
                <span className="text-black font-bold text-lg">
                  From ${item.congViec.giaTien}
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
      {/* <div className="my-5">
        <Pagination
          defaultCurrent={currentPage}
          total={jobs.coun}
          showTotal={(total) => `Total ${total} items`}
          pageSize={PAGE_SIZE}
          onChange={(page: number) => {
            setCurrentPage(page);
          }}
        />
      </div> */}
    </div>
  );
}
