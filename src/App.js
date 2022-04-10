import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import Navbar from './Navbar';
import HomeView from './HomeView';
import LeadsView from './LeadsView';
import JobOpeningView from './JobOpeningView';
// import InvitationsView from './InvitationsView';
// import InterviewsView from './InterviewsView';
// import ErrorMessage from './ErrorMessage';

import "antd/dist/antd.css";

const { Content, Footer } = Layout;


function App() {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <Navbar />
                    <Layout>
                        <Content
                            style={{
                                minHeight: '90vh',
                                padding: '25px',
                            }}
                        >
                            <div 
                                style={{ 
                                    padding: '25px', 
                                    background: '#fff' 
                                }}
                            >
                                <Routes>
                                    <Route path="/" element={<HomeView />} />
                                    <Route path="/leads" element={<LeadsView />} />
                                    <Route path="/openings/:openingId" element={<JobOpeningView />} />
                                    {/* <Route path="/invitations" element={<InvitationsView />} />
                                    <Route path="/interviews" element={<InterviewsView />} />                
                                    <Route path="*" element={<ErrorMessage error="404" />} /> */}
                                </Routes>
                            </div>
                        </Content>
                    </Layout>
                    <Footer 
                        style={{ 
                            textAlign: 'center',
                            borderTop: '1px solid #D0D0D0'
                        }}
                    >
                        Outliers ©2022
                    </Footer>
                </Layout>
            </Router>
        </div>
  );
}

export default App;
