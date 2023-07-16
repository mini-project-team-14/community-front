import React from 'react'
import Home from '../../assets/images/home.png'
import Logo from '../../assets/images/logo500.png'
import Logout from '../../assets/images/logout.png'
import '../../styles/Header.css'

function Header() {
    return (
        <div className="header">
            <div className="left-section">
                <img alt="back" src={Home} style={{ height: "36px" }} />
                <img alt="logo" src={Logo} style={{ height: "36px" }} />
            </div>
            <div className="right-section">
                <div>이름</div>
                <img alt="logout" src={Logout} style={{ height: "36px" }} />
            </div>
        </div>
    )
}

export default Header