import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Board from '../pages/Board'
import Detail from '../pages/Detail'
import Editor from '../pages/Editor'
import TestPage from '../pages/TestPage'
import Layout from '../components/common/Layout'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<Layout />}>
                    <Route path="/board" element={<Board />} />
                    <Route path="/board/:name" element={<Board />} />
                    <Route path="/board/:name/detail/:id" element={<Detail />} />
                    <Route path="/detail" element={<Detail />} />
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="/editor" element={<Editor />} />
                    <Route path="/editor/:id" element={<Editor />} />
                    <Route path="/board/:name/editor" element={<Editor />} />
                    <Route path="/board/:name/detail/:id/editor" element={<Editor />} />
                    <Route path="/test" element={<TestPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router