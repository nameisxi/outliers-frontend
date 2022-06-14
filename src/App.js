import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Grid } from 'antd';

import TokenLoader from './tokenLoader';
import Navbar from './Navbar';
import HomeView from './HomeView';
import LoginView from './LoginView';
import SignupView from './SignupView';
import CandidateView from './CandidateView';
import CandidateSearchView from './CandidateSearchView';
import JobOpeningView from './JobOpeningView';
import CreateOpeningView from './CreateOpeningView';
import AnalyticsView from './AnalyticsView';
import RequireAuthentication from './RequireAuth';

import "antd/dist/antd.css";

const { Content, Footer } = Layout;
const { useBreakpoint } = Grid;


function App() {
    const { token, setToken } = TokenLoader();
    const breakpoints = useBreakpoint();

    const padding = breakpoints['xs'] ? 8 : 24;

    return (
        <div className="App">
            <Router>
                <Layout>
                    <Navbar padding={padding} />
                    <Layout>
                        <Content
                            style={{
                                minHeight: '90vh',
                            }}
                        >
                            <div 
                                style={{ 
                                    paddingTop: 16,
                                    paddingLeft: padding,
                                    paddingRight: padding,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    minHeight: '90vh',
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
                                            <CreateOpeningView createOpening={true} />
                                        </RequireAuthentication>
                                    } />
                                    <Route path="/update-opening/:openingId" element={
                                        <RequireAuthentication token={token}>
                                            <CreateOpeningView createOpening={false} />
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
                                    <Route path="/openings/:openingId/candidates/:candidateId" element={
                                        <RequireAuthentication token={token}>
                                            <CandidateView />
                                        </RequireAuthentication>
                                    } />
                                    <Route path="/analytics" element={
                                        <RequireAuthentication token={token}>
                                            <AnalyticsView />
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
