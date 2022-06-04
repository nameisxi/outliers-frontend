// import { useState } from 'react';
import { Card, Row, Col, Divider, Typography, Tag, Popover } from 'antd';
// import { StarOutlined, ForkOutlined, EyeOutlined } from '@ant-design/icons';
import RepositoryCard from './repositoryCard';


function TopRepositoryDetails(props) {    
    // const topRepos = props.githubAccount.repos.sort((a, b) => {
    //     return b.stargazers_count - a.stargazers_count;
    // }).slice(0,5);

    console.log(props.topRepos);

    return (         
        // <div>
        //     <Card 
        //         bordered={false} 
        //         style={{ 
        //             backgroundColor: 'transparent',
        //         }} 
        //         bodyStyle={{ 
        //             paddingTop: 0, 
        //             paddingLeft: 0, 
        //             paddingRight: 0, 
        //             paddingBottom: 8,
        //         }}
        //     >
        //             <Typography.Title level={3} style={{ margin: 0 }}>Top Projects</Typography.Title>
        //     </Card>

        //     <Card 
        //         style={{ 
        //             height: 230, 
        //             borderRadius: 6 
        //         }}
        //         bodyStyle={{
        //             padding: 8,
        //         }}
        //     >
                <div 
                    id="NextArticledDiv" 
                    style={{ 
                        display: 'block', 
                        // height: '300px', 
                        marginLeft: 'auto', 
                        marginRight: 'auto', 
                        overflowX: 'auto',
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
                        {
                            props.topRepos && props.topRepos.map((repo, index) => {
                                return <RepositoryCard repo={repo} index={index} />;
                            })
                        }
                    </Row>
                </div>
            // {/* </Card> */}
        // {/* </div> */}
    );
}

export default TopRepositoryDetails;
