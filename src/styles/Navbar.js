import { styled } from "styled-components";

export const StNavbarWrapper = styled.div`
    width: inherit;
`

export const StNavbar = styled.div`
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

export const StNavList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: inherit;

    font-size: 1.25rem;
    color: ${props => props.isTrue ? "#03F2FD" : "#eeeeee"};

    border-bottom: 4px solid ${props => props.isTrue ? "#03F2FD" : "transparent"};
    cursor: pointer;

    box-sizing: border-box;
    transition: all 0.5s;
    
    &:hover, &:active, &:focus {
        outline: none;
        color: #03F2FD;
        /* border-bottom: 4px solid #03F2FD; */
    }
`