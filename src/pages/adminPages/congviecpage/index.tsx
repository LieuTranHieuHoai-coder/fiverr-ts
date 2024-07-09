import { Breadcrumb, theme } from 'antd'
import TableCongViec from '../../../components/admin/tableCongViec';

export default function CongViecPage() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Công việc</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: "100vh",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <TableCongViec></TableCongViec>
            </div>
        </>
    )
}
