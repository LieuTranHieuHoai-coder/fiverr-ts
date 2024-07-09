import { Breadcrumb, theme } from 'antd'
import React from 'react'
import TableGroup from '../../../components/admin/tableGroup';
import TableNguoiDung from '../../../components/admin/tableNguoiDung';

export default function NguoiDungPage() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Người dùng</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: "100vh",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <TableNguoiDung></TableNguoiDung>
            </div>
        </>
    )
}
