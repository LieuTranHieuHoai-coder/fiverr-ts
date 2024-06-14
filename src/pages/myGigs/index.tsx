
import "./mygigs.scss";
import { Avatar, Breadcrumb } from "antd";
import {
  AntDesignOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FcFlashOn } from "react-icons/fc";
import { FaRegStar } from "react-icons/fa6";
import SaleCard from "../../components/saleCard";
import Reviews from "../../components/reviews";

export default function index() {

  return (
    <div className="container m-auto">
      <div className="gig-page grid grid-cols-12 gap-4 justify-between">
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
                {
                  title: "My Gigs",
                },
              ]}
            />
          </div>
          <h1 className="text-2xl text-black font-bold">
            I will design fantasy and cyberpunk character
          </h1>
          <div className="mt-5 mb-5 flex">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={
                <img
                  src="https://tecdn.b-cdn.net/img/new/avatars/5.webp"
                  alt="avatar"
                />
              }
            />
            <div className="flex flex-col">
              <div className="flex ml-5 justify-start items-baseline">
                <h1 className="text-2xl text-black font-bold">Vitalii</h1>
                <h2 className="text-lg ml-3 flex items-center">
                  Top Rate <FcFlashOn /> <FcFlashOn /> <FcFlashOn />
                </h2>
              </div>
              <div className="ml-5 mt-5 flex items-center align-baseline">
                <FaRegStar />
                <h1 className="text-xl text-black font-bold ml-1"> 5 </h1>
                <h1 className="text-lg ml-1">(28) Rate</h1>
              </div>
            </div>
          </div>
          <div className="gig-image">
            <img className="w-full"
              src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/153836881/original/c529abe5f81496e3c7576e2908619a5fb84f2e7a/make-you-a-digital-portrait-in-preferred-style.png"
              alt=""
            />
          </div>
          <div className="mt-10">
            <h2 className="text-xl text-black font-bold opacity-80">
              About this gig
            </h2>

            <p className="mt-5">
              Welcome to my gig! <b>Feel free to contact me first</b>
            </p>
            <p>
              For best results, give me reference images and all details you
              need. Only with a clear instruction, I can match your idea
            </p>
            <h2 className="text-xl text-black font-bold opacity-80 capitalize mt-10">
              ready to create
            </h2>
            <ul className="list-disc ml-8">
              <li>Fantasy character</li>
              <li>Anime character</li>
              <li>Card game illustration</li>
              <li>Character design</li>
              <li>Comic book illustration</li>
              <li>Cyberpunk</li>
            </ul>
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
            <SaleCard></SaleCard>
          </div>

        </div>
      </div>
      <Reviews></Reviews>
    </div>
  );
}
