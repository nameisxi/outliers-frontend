import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;


function Navbar() {
    const path = useLocation().pathname;
    const endpoint = path === '/' ? 'home' : path.split('/')[1];

    return (
        <Header>
            <div className="logo" />
            <Menu 
                theme="dark" 
                mode="horizontal" 
                defaultSelectedKeys={['home']}
                selectedKeys={[endpoint]}
            >
                <Menu.Item key="home">
                    <NavLink to="/">Home</NavLink>
                </Menu.Item>
                <Menu.Item key="leads">
                    <NavLink to="/leads">Search</NavLink>
                </Menu.Item>
                {/* <Menu.Item key="invitations">
                    <NavLink to="/invitations">Invitations</NavLink>
                </Menu.Item>
                <Menu.Item key="interviews">
                    <NavLink to="/interviews">Interviews</NavLink>
                </Menu.Item> */}
            </Menu>
        </Header>
    );
}

export default Navbar;
