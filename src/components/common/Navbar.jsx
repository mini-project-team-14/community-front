import React from 'react'
import StyledLink from '../../styles/LinkStyle'
import { StNavList, StNavbar, StNavbarWrapper } from '../../styles/Navbar.js'

function Navbar() {
    return (
        <StNavbarWrapper>
            <StNavbar>
                <span>자유게시판</span>
                <span>SPRING</span>
                <span>REACT</span>
                <StyledLink to={`/`}>
                    <StNavList>
                        <span>로그인</span>
                    </StNavList>
                </StyledLink>
                <StyledLink to={`/signup`}>
                    <StNavList>
                        <span>회원가입</span>
                    </StNavList>
                </StyledLink>
                <StyledLink to={`/board`}>
                    <StNavList>
                        <span>게시판</span>
                    </StNavList>
                </StyledLink>
                <StyledLink to={`/editor`}>
                    <StNavList>
                        <span>작성</span>
                    </StNavList>
                </StyledLink>
                <StyledLink to={`/test`}>
                    <StNavList>
                        <span>테스트</span>
                    </StNavList>
                </StyledLink>
            </StNavbar>
        </StNavbarWrapper>
    )
}

export default Navbar