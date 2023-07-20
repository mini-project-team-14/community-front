import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoryContext } from '../../assets/context/CategoryContext.js';
import { styled } from 'styled-components';
import { StButton } from '../../styles/CommonStyle.js';

function Navbar() {
    const { path } = useParams();
    const category = useCategoryContext();
    // const boardId = category[path].boardId;
    // console.log(boardId);
    const navigate = useNavigate();
    const disabled = window.location.href.includes("editor");

    return (
        <StNavbarWrapper>
            <StNavbar>
                <StNavbarSide>
                    {
                        category.map(item => {
                            return (
                                <StNavList key={item.boardId} $border={item.path === path} onClick={() => navigate(`/board/${item.path}`)}>
                                    <span>{item.name}</span>
                                </StNavList>
                            )
                        })
                    }
                </StNavbarSide>
                <StNavbarSide>
                    <StButton $width={"70px"} $height={"40px"} $size={"1.125rem"} onClick={() => navigate(`./board/${path}/editor`)} disabled={disabled} $disabled={disabled}>작성</StButton>
                </StNavbarSide>
            </StNavbar>
        </StNavbarWrapper>
    )
}

export default Navbar

const StNavbarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: inherit;
`

const StNavbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 56px;
    background-color: #393e46;

    border: 3px solid transparent;
    border-radius: 10px;

    box-sizing: border-box;
    margin: 0 20px;
    padding: 0 20px;
`

const StNavbarSide = styled.div`
    display: flex;
    align-items: center;
    
    height: 56px;

    box-sizing: border-box;
    gap: 20px;
`

const StNavList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: inherit;

    font-size: 1.25rem;
    font-weight: 500;
    color: ${({ $border }) => $border ? "#03F2FD" : "#eeeeee"};

    border-bottom: 4px solid ${({ $border }) => $border ? "#03F2FD" : "transparent"};
    cursor: pointer;

    box-sizing: border-box;
    transition: all 0.5s;
    
    &:hover{
        outline: none;
        color: #03F2FD;
        /* border-bottom: 4px solid #03F2FD; */
    }
`
