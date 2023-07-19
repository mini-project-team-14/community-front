import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Board from '../pages/Board'
import Detail from '../pages/Detail'
import Editor from '../pages/Editor'
import Layout from '../components/common/Layout'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<Layout />}>
                    <Route path="/board" element={<Board />} />
                    <Route path="/board/:path" element={<Board />} />
                    {/* <Route path="/board/:path/detail/:id" element={<Detail />} /> */}
                    <Route path="/board/:path/:id" element={<Detail />} />
                    {/* <Route path="/editor" element={<Editor />} /> */}
                    <Route path="/board/:path/editor" element={<Editor />} />
                    <Route path="/board/:path/editor/:id" element={<Editor />} />
                    <Route path="/board/:path/:id/editor" element={<Editor />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router