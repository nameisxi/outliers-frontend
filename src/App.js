import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import TokenLoader from './tokenLoader';
import Navbar from './Navbar';
import HomeView from './HomeView';
import LoginView from './LoginView';
import SignupView from './SignupView';
import CandidateView from './CandidateView';
import CandidateSearchView from './CandidateSearchView';
import JobOpeningView from './JobOpeningView';
import CreateOpeningView from './CreateOpeningView';
// import InvitationsView from './InvitationsView';
// import InterviewsView from './InterviewsView';
// import ErrorMessage from './ErrorMessage';
import RequireAuthentication from './RequireAuth';

import "antd/dist/antd.css";

const { Content, Footer } = Layout;


function App() {
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
                                    background: '#fff',
                                    maxWidth: 1200,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
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
                                    <Route path="/create-opening" element={
                                        <RequireAuthentication token={token}>
                                            <CreateOpeningView />
                                        </RequireAuthentication>
                                    } />
                                    <Route path="/openings/:openingId" element={
                                        <RequireAuthentication token={token}>
                                            <JobOpeningView />
                                        </RequireAuthentication>
                                    } />
                                    <Route path="/candidates" element={
                                        <RequireAuthentication token={token}>
                                            <CandidateSearchView />
                                        </RequireAuthentication>
                                    } />
                                    <Route path="/candidates/:candidateId" element={
                                        <RequireAuthentication token={token}>
                                            <CandidateView />
                                        </RequireAuthentication>
                                    } />
                                </Routes>
                            </div>
                        </Content>
                    </Layout>
                    <Footer 
                        style={{ 
                            textAlign: 'center',
                            // borderTop: '1px solid #D0D0D0'
                            // color: '#ffffff',
                            // backgroundColor: '#002766',
                        }}
                    >
                        Outliers ©{new Date().getFullYear()}
                    </Footer>
                </Layout>
            </Router>
        </div>
  );
}

export default App;
