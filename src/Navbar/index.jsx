import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Row, Col, Card } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import TokenLoader from '../tokenLoader';

import './styles.css';

const { Header } = Layout;


function Navbar() {
    const { token, setToken } = TokenLoader();

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    // const location = useLocation();

    const handleLogoClick = () => {
        navigate(`/`);
        window.scrollTo(0, 0);
    };

    const handleAccountClick = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuItemClick = (menuItem) => {
        if (menuItem.key === 'logout') {
            setToken({ "Token": undefined });
            window.scrollTo(0, 0);
            window.location.reload();
        }
    };

    return (
        <Header style={{ paddingLeft: 24, paddingRight: 24, zIndex: 9999 }}>
            <Row 
                style={{
                    // maxWidth: 1200,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: 24, //+ 24,
                    paddingRight: 24, //+ 24,
                }}
            >
                <Col flex='140px' onClick={handleLogoClick} id='logo'>
                    {/* <div> */}
                        <img 
                            src="https://storage.googleapis.com/outliers-static/frontend/public/outliers-logo-navy.png" widht="135" height="27" 
                            // onClick={handleLogoClick}
                        />
                    {/* </div> */}
                </Col>
                <Col flex='auto' align='right'>
                    <Button 
                        shape='circle'
                        icon={<UserOutlined style={{ color: 'white' }} />}
                        style={{
                            backgroundColor: 'transparent',
                            border: '1px solid white',
                        }}
                        onClick={handleAccountClick}
                    />

                    { menuOpen && 
                        <Card 
                            bordered={true}
                            style={{
                                width: 200,
                                borderRadius: 4,
                                marginTop: -8,
                                textAlign: 'left',
                            }}
                            bodyStyle={{
                                paddingTop: 8,
                                paddingBlock: 8,
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        >
                            <Menu 
                                theme='light' 
                                mode='vertical'
                                style={{
                                    border: '0px',
                                }}
                                onClick={handleMenuItemClick}
                            >    
                                <Menu.Item key="account" icon={<UserOutlined/>} disabled>
                                    Account
                                </Menu.Item>
                                <Menu.Item key="logout" icon={<LogoutOutlined />}>
                                    Log out
                                </Menu.Item>
                            </Menu>
                        </Card>
                    }

                </Col>
            </Row>
        </Header>
    );
}

export default Navbar;
