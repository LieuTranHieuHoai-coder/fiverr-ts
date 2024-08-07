import React, { useEffect, useRef, useState } from "react";
import { Breadcrumb, Button, Col, ConfigProvider, Form, Input, Popover, Row, Select, SelectProps } from "antd";
import "./myprofile.scss";
import { FaPencil } from "react-icons/fa6";
import image from "../../../public/img/itemmyprofile.png";
import { HomeOutlined } from "@ant-design/icons";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import { putUsers, uploadAvatar } from "../../apis/apiNguoiDung";
import { getSkills } from "../../apis/apiSkill";
import { useNguoiDungStore } from "../../store/userStore";
import Swal from "sweetalert2";

export default function MyProfile() {
  const currentUser: ThongTinNguoiDung = JSON.parse(localStorage.getItem("currentUser") ?? "");
  const defaultSkill = currentUser.skill?.toString().replace(/[\[\]" ]/g, '');
  const defaultCerti = currentUser.certification?.toString().replace(/[\[\]" ]/g, '');
  const { skills, addSkills } = useNguoiDungStore();

  useEffect(() => {
    getSkills().then((res) => {
      addSkills(res);
    });
  }, []);

  const options: SelectProps['options'] = [];

  for (let i = 0; i < skills.length; i++) {
    options.push({
      label: skills[i].tenSkill,
      value: skills[i].id,
    });
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && ['image/png', 'image/jpeg', 'image/svg+xml'].includes(selectedFile.type)) {
      uploadAvatar(selectedFile);
    } else {
      // Handle non-supported image file selection
      console.log('Please select a PNG, JPG, or SVG image file.');
    }
  };


  const skillsInputRef = useRef<HTMLTextAreaElement>(null);
  const certificationInputRef = useRef<HTMLTextAreaElement>(null);
  const updateProfile = async () => {
    const strSkill = skillsInputRef.current?.value.toString() || "";
    const arr: string[] | undefined = strSkill.split(',') || [];
    const strCerti = certificationInputRef?.current?.value.toString() || "";
    const arrCerti: string[] | undefined = strCerti.split(',') || [];
    currentUser.skill = arr;
    currentUser.certification = arrCerti;
    console.log(currentUser)
    await putUsers(Number(currentUser?.id), currentUser).then((res) =>{
      localStorage.setItem("currentUser", JSON.stringify(res));
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Hoàn tất",
      showConfirmButton: false,
      timer: 1000,
    });
  };
  return (
    <div className="relative m-0 p-0">
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
                  <span>My Profile</span>
                </>
              ),
            },
          ]}
        />
      </div>

      <div className="mp-user-data-new">
        <div className="box-avatar-container">
          <div className="box-content flex justify-between align-baseline">
            <section className="info-column">
              <div className="seller-card">
                <div className="user-profile-info">
                  <div className="flex justify-center">
                    <div className="user-avatar cursor-pointer">
                      <img
                        src={currentUser.avatar || "/img/noavatar.jpg"}
                        className="rounded-full w-2/4 h-auto m-auto"
                        alt="Click to choose file"
                        onClick={handleImageClick}
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                  <div className="user-name text-center flex justify-center align-middle">
                    <div>
                      <b className="text-2xl">{currentUser.name}</b>
                    </div>
                    <div className="ml-2 mt-1">
                      <FaPencil
                        fontSize={20}
                        style={{ opacity: 0.5, lineHeight: 20 }}
                      />
                    </div>
                  </div>
                  <div className="user-email text-center font-medium text-lg opacity-65">
                    <span>{currentUser.email}</span>
                  </div>
                  <div className="mt-3 flex justify-center">
                    <span>
                      <FaPencil
                        fontSize={20}
                        style={{ opacity: 0.5, lineHeight: 20 }}
                      />
                    </span>
                  </div>
                  <div className="text-center mt-3">
                    <button
                      type="button"
                      className="w-full inline-block rounded border-2 border-gray-800 px-8 pb-[8px] pt-2 text-xs uppercase leading-normal font-bold transition duration-150 ease-in-out hover:border-gray-900 hover:bg-slate-300"
                    >
                      Secondary
                    </button>
                  </div>
                  <div
                    className="mt-5 bg-slate-300"
                    style={{ height: 1 }}
                  ></div>
                  <div className="flex justify-between mt-3 align-baseline">
                    <div>
                      <span>From</span>
                    </div>
                    <div className="font-bold">VIetnam</div>
                  </div>
                  <div className="flex justify-between mt-3 align-baseline">
                    <div>
                      <span>Member Since</span>
                    </div>
                    <div className="font-bold">JAN 2024</div>
                  </div>
                  <div className="flex justify-between mt-3 align-baseline">
                    <div>
                      <span>Birthday</span>
                    </div>
                    <div className="font-bold">{currentUser.birthday}</div>
                  </div>
                </div>
                <div className="displayname">
                  <div className="flex justify-center"></div>
                </div>
              </div>

              <div className="seller-card mt-10">
                <div className="learn-img">
                  <img
                    src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_png/v1/attachments/generic_asset/asset/6bef0aaa4d62dcf41383658e5e3211ee-1571214998624/fiverrlearn_logo.svg"
                    alt="Learn from Fiverr"
                    title="Learn from Fiverr"
                    className="k-kBZXW"
                  />
                </div>
                <div className="text-center">
                  <img
                    src="https://npm-assets.fiverrcdn.com/assets/@fiverr-private/fiverr_learn/enroll-icon.69b770f.svg"
                    alt=""
                    className="m-10"
                  />
                  <h5 className="font-bold text-xl m-10">
                    Earn badges and stand out
                  </h5>
                  <p className="pb-10 text-lg mt-4 ml-5 mr-5">
                    Boost your sales, by boosting your expertise.
                  </p>
                  <button
                    type="button"
                    className="inline-block rounded bg-success  px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-success-300 hover:shadow-primary-2 focus:bg-success -300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  >
                    ENROLL NOW
                  </button>
                </div>
              </div>

              <div className="seller-card mt-10">
                <div className="mb-10">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorText: "rgba(255, 255, 255, 0.88)",
                        colorBgElevated: "#333333",
                      },
                    }}
                  >
                    <Popover
                      placement="topLeft"
                      title="Tell us more about yourself. Buyers are also interested in learning about you as a person."
                      trigger="hover"
                    >
                      <div className="flex justify-between align-baseline">
                        <b className="font-bold text-base">Destination</b>
                        <a href="#" className="text-primary-600 text-base">
                          Edit Description
                        </a>
                      </div>
                    </Popover>
                  </ConfigProvider>
                </div>
                <div
                  className="mt-5 mb-5 bg-slate-300"
                  style={{ height: 1 }}
                ></div>
                <div className="mb-10">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorText: "rgba(255, 255, 255, 0.88)",
                        colorBgElevated: "#333333",
                      },

                    }}
                  >
                    <Popover
                      placement="topLeft"
                      title="You can make up to four selections."
                      trigger="hover"
                    >
                      <div className="flex justify-between align-baseline">
                        <b className="font-bold text-base">Languages</b>
                        <a href="#" className="text-primary-600 text-base">
                          Add new
                        </a>
                      </div>
                    </Popover>
                  </ConfigProvider>
                </div>
                <div
                  className="mt-5 mb-5 bg-slate-300"
                  style={{ height: 1 }}
                ></div>
                <div className="">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorBorder: "#333333"
                      },
                      components: {
                        Select: {
                          optionSelectedColor: "rgba(0, 0, 0, 0.88)",
                          multipleItemBg: "rgba(255, 255, 0, 0.88)",
                        },
                      },
                    }}
                  >
                    <Popover
                      placement="topLeft"
                      title="Let your buyers know your skills. Skills gained through your previous jobs, hobbies or even everyday life."
                      trigger="hover"
                    >
                      <div className="flex justify-between align-baseline">
                        <b className="font-bold text-base">Skills</b>
                        <div className="text-primary-600 text-base" onClick={updateProfile}>
                          Add new
                        </div>
                      </div>
                      <div className="my-3">
                        {/* <Select
                          mode="tags"
                          style={{ width: '100%' }}
                          placeholder="Tags Mode"
                          onChange={handleChange}
                          options={options}
                        /> */}
                        <Row gutter={16}>
                          <Col span={24}>
                            <textarea className="w-full border p-3"
                              id="skills"
                              ref={skillsInputRef}
                              rows={4}
                              placeholder="skill"
                              defaultValue={defaultSkill}
                            />
                          </Col>
                        </Row>
                      </div>
                      {/* <div className="my-3">
                        {currentUser.skill}
                      </div> */}
                    </Popover>
                  </ConfigProvider>
                </div>
                <div
                  className="mt-5 mb-5 bg-slate-300"
                  style={{ height: 1 }}
                ></div>
                <div className="mb-10">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorText: "rgba(255, 255, 255, 0.88)",
                        colorBgElevated: "#333333",
                      },
                    }}
                  >
                    <Popover
                      placement="topLeft"
                      title="Describe your educational background. It will help buyers get to know you!"
                      trigger="hover"
                    >
                      <div className="flex justify-between align-baseline">
                        <b className="font-bold text-base">Education</b>
                        <a href="#" className="text-primary-600 text-base">
                          Add new
                        </a>
                      </div>
                    </Popover>
                  </ConfigProvider>
                </div>
                <div
                  className="mt-5 mb-5 bg-slate-300"
                  style={{ height: 1 }}
                ></div>
                <div className="mb-5">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorText: "rgba(255, 255, 255, 0.88)",
                        colorBgElevated: "#333333",
                      },
                    }}
                  >
                    <Popover
                      placement="topLeft"
                      title="Listing your honors and awards can help you stand out from other sellers."
                      trigger="hover"
                    >
                      <div className="flex justify-between align-baseline">
                        <b className="font-bold text-base">Certification</b>
                        <a href="" className="text-primary-600 text-base" onClick={updateProfile}>
                          Add new
                        </a>
                      </div>
                    </Popover>
                  </ConfigProvider>
                  <div className="my-3">
                    <Row gutter={16}>
                      <Col span={24}>
                        <textarea
                          className="w-full border p-3"
                          rows={4}
                          ref={certificationInputRef}
                          placeholder="certification"
                          defaultValue={defaultCerti}
                        />
                      </Col>
                    </Row>
                  </div>

                </div>
              </div>
            </section>
            <section className="gigs-column">
              <div className="seller-card text-center flex flex-col justify-center align-middle">
                <div style={{ padding: "95px 0 120px" }}>
                  <div>
                    <img src={image} alt="" className="m-auto" />
                  </div>
                  <figcaption className="m-7">
                    <h3 className="text-lg">
                      Ready to earn on your own terms?
                    </h3>
                  </figcaption>
                  <button
                    type="button"
                    className="inline-block font-bold rounded bg-success  px-7 pb-2.5 pt-3 text-xs uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-success-300 hover:shadow-primary-2 focus:bg-success -300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  >
                    Become a seller
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
