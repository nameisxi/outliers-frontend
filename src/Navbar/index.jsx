import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;


function Navbar() {
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const endpoint = path === '/' ? 'home' : path.split('/')[1];

    const handleLogoClick = () => {
        navigate(`/`);
        window.scrollTo(0, 0);
    };

    return (
        <Header style={{ paddingLeft: 25, paddingRight: 25 }}>
            <div className="logo" />
            <Menu 
                theme="dark" 
                mode="horizontal" 
                defaultSelectedKeys={['home']}
                selectedKeys={[endpoint]}
                style={{
                    maxWidth: 1200,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: 25 + 24,
                    paddingRight: 25 + 24,
                }}
            >
                <div className="logo">
                    <img 
                        src="https://storage.googleapis.com/outliers-static/frontend/public/outliers-logo-navy.png" widht="135" height="27" 
                        onClick={handleLogoClick}
                    />
                </div>
                {/* <Menu.Item key="home">
                    <NavLink to="/">Home</NavLink>
                </Menu.Item>
                <Menu.Item key="leads">
                    <NavLink to="/candidates">Search</NavLink>
                </Menu.Item> */}
            </Menu>
        </Header>
    );
}

export default Navbar;
