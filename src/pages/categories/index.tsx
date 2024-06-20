import React, {  useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import {
  DsChiTietLoai,
  MenuLoaiCongViec,
} from "../../models/LoaiCongViecModel";
import { getChiTietLoaiCongViec } from "../../apis/apiCongViec";
import Jobs from "../../components/jobs";
import JobsFilter from "../../components/jobsfilter";

export default function Categories() {
  const { id } = useParams();
  const [loaicongviec, setLoaiCongViec] = useState<MenuLoaiCongViec[]>([]);
  const [valueIdJob, setValueIdJob] = useState<number|undefined>();
  React.useEffect(() => {
    const fletchName = async () => {
      const name = await getChiTietLoaiCongViec(Number(id));
      setLoaiCongViec(name);
    };
    setValueIdJob(undefined);
    fletchName();
  }, [id]);

  React.useEffect(() => {
    setDSChiTietLoai([]);
  },[id]);
  
  const [dsChiTietLoai, setDSChiTietLoai] = useState<DsChiTietLoai[]>(loaicongviec[0]?.dsNhomChiTietLoai[0]?.dsChiTietLoai);

  function loadCatItem() {
    return dsChiTietLoai?.map((item) => {
      return (
        <>
          <button
            key={item.id}
            type="button"
            className="inline-block rounded border-2 border-neutral-800 px-20 pb-[20px] pt-6 text-xs uppercase text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-100 hover:text-neutral-800 focus:border-neutral-800 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 motion-reduce:transition-none dark:text-neutral-600 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900 m-3 font-bold"
            data-twe-ripple-init
            onClick={() => setValueIdJob(item.id)}
          >
            {item.tenChiTiet}
          </button>
        </>
      );
    });
  }

  function loadServices() {
    return loaicongviec?.map((item) => {
      return item?.dsNhomChiTietLoai.map((ds) => {
        return (
          <div
            className="w-full max-w-sm bg-white rounded-lg"
            onClick={() => setDSChiTietLoai(ds.dsChiTietLoai)}
          >
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={ds.hinhAnh}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {ds.tenNhom}
                </h5>
              </a>
            </div>
          </div>
        );
      });
    });
  }

  return (
    <>
    <div className="container m-auto">
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
                <AppstoreOutlined />
                <span>Categories</span>
              </>
            ),
          },
        ]}
      />
      <div className="flex items-center">{loadServices()}</div>

      {dsChiTietLoai && loadCatItem()}

      <div className="my-5 bg-slate-300 w-full" style={{height:1}}></div>

      <h2 className="text-4xl my-5">Results</h2>

      {!valueIdJob ? <Jobs></Jobs> : <JobsFilter value={valueIdJob}></JobsFilter> }

      <div className="my-5 bg-slate-300 w-full" style={{height:1}}></div>
      
    </div>
    </>
    
  );
}
