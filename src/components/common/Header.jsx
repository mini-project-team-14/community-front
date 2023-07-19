import React from 'react'
// import Home from '../../assets/images/home.png'
import Logo from '../../assets/images/logo500.png'
import Logout from '../../assets/images/logout.png'
import { styled } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import jwt_decode from "jwt-decode"

function Header() {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies(['login'])
    const handleLogoutButtonClick = () => {
        alert("로그아웃!")
        removeCookie('login');
        navigate("/")

    }
    // const token = localStorage.getItem('login'); // 로컬
    // const { sub } = jwt_decode(token);
    // console.log(sub);

    const token = jwt_decode(cookies.login); // 쿠키
    // console.log(token);
    const { sub, aud } = jwt_decode(cookies.login); // 쿠키
    // console.log(sub, aud);

    return (
        <StHeaderContainer>
            <StHeaderLeft>
                {/* <img alt="back" src={Home} style={{ height: "36px" }} /> */}
                <Link to="/board/free">
                    <img alt="logo" src={Logo} style={{ height: "36px" }} />
                </Link>
            </StHeaderLeft>
            <StHeaderRight>
                <div>환영합니다, {aud}님! </div>
                {/* <Link to="/"> */}
                <img alt="logout" onClick={handleLogoutButtonClick} src={Logout} style={{ height: "36px", cursor: "pointer" }} />
                {/* </Link> */}
            </StHeaderRight>
        </StHeaderContainer>
    )
}

export default Header

const StHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 66px;

    box-sizing: border-box;
    padding: 10px;
    margin: 0 20px;
`

const StHeaderLeft = styled.div`
    display: flex;
    align-items: center;

    gap: 10px;
`

const StHeaderRight = styled.div`
    display: flex;
    align-items: center;

    font-size: 1.5rem;

    gap: 10px;
`