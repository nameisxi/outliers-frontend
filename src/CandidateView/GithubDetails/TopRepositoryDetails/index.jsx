// import { useState } from 'react';
import { Card, Row, Col, Divider, Typography, Tag, Popover } from 'antd';
// import { StarOutlined, ForkOutlined, EyeOutlined } from '@ant-design/icons';
import RepositoryCard from './repositoryCard';


function TopRepositoryDetails(props) {    
    return (         
        <div 
            style={{ 
                display: 'block', 
                // height: '300px', 
                marginLeft: 'auto', 
                marginRight: 'auto', 
                overflowX: 'auto',
                paddingBottom: 18,
            }}
        >
            <Row 
                gutter={8} 
                type="flex" 
                justify="start" 
                align="top" 
                style={{ 
                    display: 'inline-block', 
                    whiteSpace: 'nowrap',
                    float: 'left' 
                }}
            >
                &nbsp;
                &nbsp;
                &nbsp;
                {
                    props.topRepos && props.topRepos.map((repo, index) => {
                        return <RepositoryCard repo={repo} index={index} />;
                    })
                }
            </Row>
        </div>
    );
}

export default TopRepositoryDetails;
