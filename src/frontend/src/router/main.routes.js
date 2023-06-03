import React, { lazy } from 'react';
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import('pages/HomePage'));
const ContactPage = lazy(() => import('pages/ContactPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const AdminPage = lazy(() => import('pages/AdminPage'));
const ScoreBoardPage = lazy(() => import('pages/ScoreBoardPage'));

export const MainRoutes = (
    <Routes>
        <Route key="homeroute" path='/' element={<HomePage />} />
        <Route key="contactroute" path='/contact' element={<ContactPage />} />
        <Route key="loginroute" path='/login' element={<LoginPage />} />
        <Route key="adminroute" path='/admin' element={<AdminPage />} />
        <Route key="scoreboardroute" path='/scoreboard' element={<ScoreBoardPage />} />
    </Routes>
);

