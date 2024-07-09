import { Breadcrumb, theme } from 'antd'
import React from 'react'
import TableGroup from '../../../components/admin/tableGroup';

export default function Dashboard() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Loại công việc</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: "100vh",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <TableGroup></TableGroup>
            </div>
        </>
    )
}
