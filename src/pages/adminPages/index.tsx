import React, { useEffect, useState } from 'react';
import { BankOutlined, HomeOutlined, PieChartOutlined, PoweroffOutlined, RightCircleOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, MenuProps, theme } from 'antd';
import Dashboard from './dashboard';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import "./dashboard/dashboard.scss"

export default function Admin() {
    const { Header, Content, Footer, Sider } = Layout;
    type MenuItem = Required<MenuProps>["items"][number];
    const userLocal = localStorage.getItem("user");
    const currentUSer = userLocal ? JSON.parse(userLocal) : null;
    const navigate = useNavigate();
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        to?: string
    ): MenuItem | null {
        if (to && children?.length === 0) {
            return {
                key,
                icon,

                label: <Link to={to}>{label}</Link>,
            } as MenuItem;
        } else {
            if (to && children !== null) {
                return {
                    key,
                    icon,
                    children,
                    label: <Link to={to}>{label}</Link>,
                } as MenuItem;
            } else {
                return {
                    key,
                    icon,
                    children,
                    label,
                } as MenuItem;
            }
        }
    }

    const items: MenuItem[] = [
        getItem("Loại công việc", "1", <HomeOutlined />, [], "/admin/loai-cong-viec"),
        getItem("Công việc", "2", <RightCircleOutlined />, [], "/admin/cong-viec"),
        getItem("Chi tiêt loại công việc", "3", <RightCircleOutlined />, [], "/admin/chi-tiet"),
        getItem("Thuê công việc", "4", <RightCircleOutlined />, [], "/admin/thue-cong-viec"),
        getItem("Người dùng", "5", <RightCircleOutlined />, [], "/admin/nguoi-dung"),
        getItem("Bình luận", "6", <RightCircleOutlined />, [], "/admin/binh-luan"),

    ];

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
            setCollapsed(isMobile);
        };

        handleResize(); // Check initial screen size
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const LinkLogin = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("currentUser");
        navigate("/login");
    }
    return (
        <Layout>
            <Sider
                width={300}
                breakpoint="lg"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
            >
                <div className="logo text-center my-3">
                    <Link className="link text-white text-6xl" to="/admin/dashboard">
                        {
                            !collapsed ? <span className="text">fiverr</span> : <span className="text">fi</span>
                        }
                    </Link>
                    <span className="dot">.</span>
                </div>
                <Menu
                    theme="dark"

                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ background: "#ffffff", width: "100%" }}>
                    <div className="block text-end">
                        <span className='mx-5 font-bold text-xl'>{currentUSer.user.name}</span>
                        <Button
                            type="primary" danger
                            icon={<PoweroffOutlined />}
                            onClick={LinkLogin}
                        >
                            Đăng xuất
                        </Button>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    {new Date().getFullYear()} Created by Lieu Tran Hieu Hoai
                </Footer>
            </Layout>
        </Layout>
    );
};
