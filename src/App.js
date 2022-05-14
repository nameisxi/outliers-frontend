import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import TokenLoader from './tokenLoader';
import Navbar from './Navbar';
import HomeView from './HomeView';
import LoginView from './LoginView';
import SignupView from './SignupView';
import LeadsView from './LeadsView';
import JobOpeningView from './JobOpeningView';
// import InvitationsView from './InvitationsView';
// import InterviewsView from './InterviewsView';
// import ErrorMessage from './ErrorMessage';
import RequireAuthentication from './RequireAuth';

import "antd/dist/antd.css";

const { Content, Footer } = Layout;


// function setToken(userToken) {
//     sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//     const tokenString = sessionStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token
// }

function App() {
    // const [token, setToken] = useState();
    // const token = getToken();
    const { token, setToken } = TokenLoader();

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
                                    <Route path="/login" element={
                                        <LoginView setToken={setToken} />
                                    } />
                                    <Route path="/signup" element={
                                        <SignupView setToken={setToken} />
                                    } />
                                    <Route path="/" element={
                                        <RequireAuthentication token={token}>
                                            <HomeView />
                                        </RequireAuthentication>
                                    } />
                                    <Route path="/leads" element={
                                        <RequireAuthentication token={token}>
                                            <LeadsView />
                                        </RequireAuthentication>
                                    } />
                                    <Route path="/openings/:openingId" element={
                                        <RequireAuthentication token={token}>
                                            <JobOpeningView />
                                        </RequireAuthentication>
                                    } />
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
