import { Breadcrumb, theme } from 'antd'
import React from 'react'
import TableGroup from '../../../components/admin/tableGroup';
import TableBinhLuan from '../../../components/admin/tableBinhLuan';

export default function BinhLuanPage() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Bình luận</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: "100vh",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <TableBinhLuan></TableBinhLuan>
            </div>
        </>
    )
}
