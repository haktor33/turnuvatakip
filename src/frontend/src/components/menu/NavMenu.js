import React from "react";
import { Link } from "react-router-dom"
import { Menu } from 'antd';
import { VideoCameraOutlined, UserOutlined, BorderlessTableOutlined, } from '@ant-design/icons';
import i18n from "i18n";

const NavMenu = () => {

    return <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
        items={[
            {
                key: '1',
                icon: <UserOutlined />,
                label: <Link to="/">{i18n.t("pages.home")}</Link>,
            },
            {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <Link to="/admin">{i18n.t("pages.admin")}</Link>,
            },
            {
                key: '3',
                icon: <BorderlessTableOutlined />,
                label: <Link to="/scoreboard">{i18n.t("pages.scoreboard")}</Link>,
            },
        ]}
    />
}

export default NavMenu;