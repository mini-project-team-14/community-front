import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import { styled } from 'styled-components'

function Layout() {
    return (
        <>
            <StContainer>
                <Header />
                <Navbar />
                <Outlet />
            </StContainer>
            <Footer />
        </>
    )
}

export default Layout

const StContainer = styled.div`
    margin:0;
    padding:0;
    height:auto;
    min-height: 100%;
    min-width: 700px;
    max-width: 1400px;
    width:100%;
    box-sizing: border-box;
    padding-bottom: 50px;
    margin: 0 auto;
`