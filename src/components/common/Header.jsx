import React from 'react'
import Logo from '../../assets/images/logo500.png'
import Login from '../../assets/images/icon/login.png'
import Logout from '../../assets/images/icon/logout.png'
import { styled } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import jwt_decode from "jwt-decode"
import { StSpan } from '../../styles/CommonStyle'

function Header() {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies(['accessToken', 'refreshToken'])
    const handleLogoutButtonClick = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            removeCookie('accessToken', { path: "/" })
            removeCookie('refreshToken', { path: "/" })
            alert("로그아웃!")
            navigate("/")
        }
    }

    let aud = ""
    if (cookies.accessToken) {
        const decodedToken = jwt_decode(cookies.accessToken);
        aud = decodedToken.aud;
    }

    return (
        <StHeaderContainer>
            <StHeaderLeft>
                <Link to="/board/free">
                    <img alt="logo" src={Logo} style={{ height: "36px" }} />
                </Link>
            </StHeaderLeft>
            <StHeaderRight>
                {
                    (Boolean(cookies.accessToken) === false) ? (
                        <>
                            <StSpan $color={"red"} $weight={"700"}>
                                잘못된 접근입니다. 로그인 하세요.
                            </StSpan>
                            <img alt="login" onClick={() => navigate("/")} src={Login} style={{ height: "36px", cursor: "pointer" }} />
                        </>
                    ) : (
                        <>
                            <StSpan $color={"#00ADB5"} $weight={"700"}>
                                {aud}
                            </StSpan>
                            <StSpan>
                                님 환영합니다
                            </StSpan>
                            <img alt="logout" onClick={handleLogoutButtonClick} src={Logout} style={{ height: "36px", marginLeft: "10px", cursor: "pointer" }} />
                        </>
                    )
                }
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
`