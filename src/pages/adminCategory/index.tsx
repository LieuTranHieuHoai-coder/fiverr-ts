import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, ConfigProvider, Menu, MenuProps } from "antd";
import React from "react";
type MenuItem = Required<MenuProps>["items"][number];

export default function AdminCategory() {
  const items: MenuItem[] = [
    {
      key: "sub1",
      icon: <MailOutlined />,
      label: "Navigation One",
      children: [
        {
          key: "1-1",
          label: "Item 1",
          type: "group",
          children: [
            { key: "1", label: "Option 1" },
            { key: "2", label: "Option 2" },
          ],
        },
        {
          key: "1-2",
          label: "Item 2",
          type: "group",
          children: [
            { key: "3", label: "Option 3" },
            { key: "4", label: "Option 4" },
          ],
        },
      ],
    },
    {
      key: "sub2",
      icon: <AppstoreOutlined />,
      label: "Navigation Two",
      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            { key: "7", label: "Option 7" },
            { key: "8", label: "Option 8" },
          ],
        },
      ],
    },
    {
      key: "sub4",
      label: "Navigation Three",
      icon: <SettingOutlined />,
      children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        { key: "11", label: "Option 11" },
        { key: "12", label: "Option 12" },
      ],
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
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
                style={{ width: 256 }}
                mode="vertical"
                items={items}
              />
            </ConfigProvider>
          </Card>
        </div>

        <div className="col-span-2">
          <Card title="Categories" bordered className="w-full">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
