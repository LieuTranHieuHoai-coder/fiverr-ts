import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, ConfigProvider, Menu, MenuProps } from "antd";
import React, { useState } from "react";
import TableGroup from "../../components/admin/tableGroup";
type MenuItem = Required<MenuProps>["items"][number];

export default function AdminCategory() {
  const [titleRight, setTitle]= useState("Group Category ( Token 403 No permission )");
  const items: MenuItem[] = [
    {
      key: "sub1",
      icon: <MailOutlined />,
      label: "Group Category",
      
    },
    {
      key: "sub2",
      icon: <AppstoreOutlined />,
      label: "Category",
      
    },
    {
      key: "sub4",
      label: "Jobs",
      icon: <SettingOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "sub1") {
      setTitle("Group Category ( Token 403 No permission )");
    }
    if (e.key === "sub2") {
      setTitle("Category ( Token 403 No permission )");
    }
    if (e.key === "sub4") {
      setTitle("Jobs ( Token 403 No permission )");
    }
  };

  return (
    <div className="container m-auto">
      <div className="grid grid-cols-3 gap-4 my-10">
        <div className="w-full">
          <Card title="Group Category" bordered className="w-full">
            <ConfigProvider
              theme={{
                token: {
                  lineWidth:0,
                  fontSize:14
                },
              }}
            >
              <Menu
                onClick={onClick}
                style={{ width: "100%" }}
                mode="vertical"
                items={items}
              />
            </ConfigProvider>
          </Card>
        </div>

        <div className="col-span-2">
          <Card title={titleRight} bordered className="w-full">
            <TableGroup></TableGroup>
          </Card>
        </div>
      </div>
    </div>
  );
}
