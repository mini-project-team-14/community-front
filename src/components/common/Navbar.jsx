import React from 'react'
import { StNavList, StNavbar, StNavbarWrapper } from '../../styles/Navbar.js'
import { useQuery } from 'react-query';
import { getLinks } from '../../api/links';
import { useNavigate, useParams } from 'react-router-dom';

function Navbar() {
    const { isLoading, isError, data } = useQuery("links", getLinks);
    const { name } = useParams();
    const navigate = useNavigate();
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
                                <StNavList isTrue={(item.param === name)} onClick={() => navigate(`${item.url}`)}>
                                    <span>{item.name}</span>
                                </StNavList>
                        )
                    })
                }
            </StNavbar>
        </StNavbarWrapper>
    )
}

export default Navbar