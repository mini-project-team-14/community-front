import { styled } from "styled-components";

export const StNavbarWrapper = styled.div`
    width: inherit;
`

export const StNavbar = styled.div`
    display: flex;
    align-items: center;
    
    height: 56px;
    background-color: #eeeeee;

    border: transparent;
    border-bottom: 2px solid black;
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

    border: transparent;

    &:hover {
        outline: none;
        border-bottom: 4px solid #0A8FCC;
        font-weight: 700;
    }
`