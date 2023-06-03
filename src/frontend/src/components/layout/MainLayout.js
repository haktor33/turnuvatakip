import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, theme } from 'antd';
import "styles/layout.css";
import NavMenu from 'components/menu/NavMenu';

const { Header, Sider, Content, Footer } = Layout;

const MainLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer }, } = theme.useToken();

    return (
        <Layout hasSider>
            <Sider trigger={null} collapsible collapsed={collapsed} className="page-sider">
                <div className="logo" />
                <NavMenu />
            </Sider>
            <Layout className="site-layout">
                <Header className="page-header" style={{ padding: 0, background: colorBgContainer, }} >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content className="page-content" style={{ background: colorBgContainer, }}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        {props.children}
                    </React.Suspense>
                </Content>
                <Footer className="page-footer">
                    2023 Created by Haktor
                </Footer>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
