import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoryContext } from '../../assets/context/CategoryContext.js';
import { styled } from 'styled-components';

function Navbar() {
    const { path } = useParams();
    const category = useCategoryContext();
    const navigate = useNavigate();

    return (
        <StNavbarWrapper>
            <StNavbar>
                {
                    category.map(item => {
                        return (
                            <StNavList key={item.boardId} $border={item.path === path} onClick={() => navigate(`/board/${item.path}`)}>
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

const StNavbarWrapper = styled.div`
    width: inherit;
`

const StNavbar = styled.div`
    display: flex;
    align-items: center;
    
    height: 56px;
    background-color: #393e46;

    border: 3px solid transparent;
    border-radius: 10px;
    /* border-bottom: 3px solid gray; */
    color: black;
    font-size: 1.5rem;
    font-weight: 500;

    box-sizing: border-box;
    margin: 0 20px;
    padding: 0 20px;
    gap: 20px;
`

const StNavList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: inherit;

    font-size: 1.25rem;
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