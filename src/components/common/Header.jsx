import React from 'react'
// import Home from '../../assets/images/home.png'
import Logo from '../../assets/images/logo500.png'
import Logout from '../../assets/images/logout.png'
import { styled } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import jwt_decode from "jwt-decode"
import { StSpan } from '../../styles/CommonStyle'

function Header() {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies(['login'])
    const handleLogoutButtonClick = () => {
        alert("로그아웃!")
        removeCookie('login');
        navigate("/")
    }

    const { aud } = jwt_decode(cookies.login);

    return (
        <StHeaderContainer>
            <StHeaderLeft>
                {/* <img alt="back" src={Home} style={{ height: "36px" }} /> */}
                <Link to="/board/free">
                    <img alt="logo" src={Logo} style={{ height: "36px" }} />
                </Link>
            </StHeaderLeft>
            <StHeaderRight>
                {
                    (Boolean(cookies.login) === false) ? (
                        <StSpan $color={"red"} $weight={"700"}>
                            잘못된 접근입니다.
                        </StSpan>
                    ) : (
                        <>
                            <StSpan $color={"#00ADB5"}>
                                {aud}
                            </StSpan>
                            <StSpan>
                                님 환영합니다
                            </StSpan>
                            {/* <Link to="/"> */}
                            <img alt="logout" onClick={handleLogoutButtonClick} src={Logout} style={{ height: "36px", cursor: "pointer" }} />
                            {/* </Link> */}
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

    gap: 6px;
`