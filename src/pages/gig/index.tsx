import "./mygig.scss";
import { Avatar, Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { FaRegStar } from "react-icons/fa6";
import SaleCard from "../../components/saleCard";
import Reviews from "../../components/reviews";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CongViecViewModel } from "../../models/CongViecViewModel";
import { getCongViecTheoId } from "../../apis/apiCongViec";
import React from "react";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import { getUsersById } from "../../apis/apiNguoiDung";

export default function Gig() {
  const { id } = useParams();

  const [gig, setGig] = useState<CongViecViewModel>();
  const [user, setUser] = useState<ThongTinNguoiDung>();

  React.useEffect(() => {
    getCongViecTheoId(Number(id)).then((data) => {
      setGig(data);
    });
  }, [id]);

  React.useEffect(() => {
    if (gig?.nguoiTao) {
      getUsersById(gig.nguoiTao).then((data) => {
        setUser(data);
      });
    }
  }, [gig]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container m-auto">
      <div className="gig-page grid grid-cols-12 gap-4 justify-between px-4">
        <div className="main col-span-12 md:col-span-8">
          <div className="mt-5 mb-5">
            <Breadcrumb
              items={[
                {
                  href: "/",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: (
                    <>
                      <UserOutlined />
                      <span>Gigs</span>
                    </>
                  ),
                },
              ]}
            />
          </div>
          <h1 className="text-2xl text-black font-bold">{gig?.tenCongViec}</h1>
          <div className="mt-5 mb-5 flex">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={<img src={user?.avatar} alt="avatar" />}
            />
            <div className="flex flex-col">
              <div className="flex ml-5 justify-start items-baseline">
                <h1 className="text-2xl text-black font-bold">{user?.name}</h1>
              </div>
              <div className="ml-5 mt-5 flex items-center align-baseline">
                <FaRegStar />
                <h1 className="text-xl text-black font-bold ml-1">
                  {" "}
                  {gig?.saoCongViec}/5{" "}
                </h1>
                <h1 className="text-lg ml-1">{gig?.danhGia} Vote</h1>
              </div>
            </div>
          </div>
          <div className="gig-image">
            <img className="w-full" src={gig?.hinhAnh} alt="" />
          </div>
          <div className="mt-10">
            <h2 className="text-xl text-black font-bold opacity-80">
              About this gig
            </h2>

            <p className="mt-5">{gig?.moTa}</p>
            <p>
              For best results, give me reference images and all details you
              need. Only with a clear instruction, I can match your idea
            </p>
            <h2 className="text-xl text-black font-bold opacity-80 capitalize mt-10">
              ready to create
            </h2>
            {gig?.moTaNgan}
            <div className="mt-5">
              <p>I am happy to experiment</p>
              <p>Let me know if you are looking for something specific</p>
            </div>
            <div
              className="mt-5 w-full bg-slate-700"
              style={{ height: 1 }}
            ></div>
            <div className="flex justify-between items-center mt-5">
              <div>
                <p className="text-lg text-black opacity-70">Main type</p>
                <p className="text-lg text-black">Comics</p>
              </div>
              <div>
                <p className="text-lg text-black opacity-70">
                  Illustration style
                </p>
                <p className="text-lg text-black">Anime</p>
              </div>
              <div>
                <p className="text-lg text-black opacity-70">
                  Image file format
                </p>
                <p className="text-lg text-black">JPG PNG</p>
              </div>
            </div>
            <div className="border p-5 mt-5">
              <p className="text-black font-bold">Delivery style preference</p>
              <p className="mb-0 mt-0 text-base font-light leading-relaxed">
                Please inform the freelancer of any preferences or concerns
                regarding the use of AI tools in the completion and/or delivery
                of your order.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 ">
          <div className="flex justify-center mt-10">
            <SaleCard value={gig}></SaleCard>
          </div>
        </div>
      </div>
      <Reviews></Reviews>
    </div>
  );
}
