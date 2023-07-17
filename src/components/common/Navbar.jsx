import React from 'react'
import StyledLink from '../../styles/LinkStyle'
import { StNavList, StNavbar, StNavbarWrapper } from '../../styles/Navbar.js'
import { useQuery } from 'react-query';
import { getLinks } from '../../api/links';

function Navbar() {
    const { isLoading, isError, data } = useQuery("links", getLinks);
    if (isLoading) {
        return <h1>로딩중</h1>
    }
    if (isError) {
        return <h1>오류발생</h1>
    }
    return (
        <StNavbarWrapper>
            <StNavbar>
                {
                    data.map((item) => {
                        return (
                            <StyledLink key={item.id} to={item.url}>
                                <StNavList>
                                    <span>{item.name}</span>
                                </StNavList>
                            </StyledLink>
                        )
                    })
                }
            </StNavbar>
        </StNavbarWrapper>
    )
}

export default Navbar