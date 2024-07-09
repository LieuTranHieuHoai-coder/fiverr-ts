import { Breadcrumb, theme } from 'antd'
import React from 'react'
import TableGroup from '../../../components/admin/tableGroup';
import TableThueCongViec from '../../../components/admin/tableThueCongViec';

export default function ThueCongViecPage() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Thuê công việc</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: "100vh",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <TableThueCongViec></TableThueCongViec>
            </div>
        </>
    )
}
