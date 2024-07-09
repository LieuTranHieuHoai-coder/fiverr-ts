import { Breadcrumb, theme } from 'antd'
import React from 'react'
import TableGroup from '../../../components/admin/tableGroup';
import TableChiTiet from '../../../components/admin/tableChiTiet';

export default function ChiTietPage() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết loại công việc</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: "100vh",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <TableChiTiet></TableChiTiet>
            </div>
        </>
    )
}
