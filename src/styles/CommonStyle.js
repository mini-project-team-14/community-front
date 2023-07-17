import { styled } from "styled-components";

export const StContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;
`
export const StContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 400px;
    height: auto;

    border: transparent;
    border-radius: 20px;

    box-sizing: border-box;
    box-shadow: 0 4px 32px gray;
    padding: 50px;
    gap: 40px;
`

export const StContentSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 30px;
`

export const StP = styled.p`
    text-align: center;
    font-size: ${({ size }) => size || "1.25rem"};
    font-weight: 700;
`

export const StLoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 100%;
    
    gap: 20px;
`

export const StInput = styled.input`
    width: inherit;
    height: 50px;

    border: 2px solid #C2C2C2;
    border-radius: 10px;

    font-size: 1rem;
    font-weight: 400;
    color: #393E46;

    box-sizing: border-box;
    padding: 10px;
    transition: all 0.5s;
    
    &:focus {
        outline: none;
        border-color: #00ADB5;
    }
`

export const StButton = styled.button`
    width: ${({ width }) => width || "inherit"};
    min-width: ${({ width }) => width};
    height: ${({ height }) => height || "50px"};
    background-color: ${({ color }) => color || "#00ADB5"};

    border: transparent;
    border-radius: 10px;
    
    font-size: ${({ size }) => size || "1.25rem"};
    font-weight: ${({ weight }) => weight || "500"};
    color: white;

    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        background-color: #0A8FCC;
    }
`

export const StEditorInput = styled.input`
    width: ${({ width }) => width || "inherit"};
    height: ${({ height }) => height || "inherit"};

    border: 2px solid transparent;
    border-radius: 10px;
    
    font-size: ${({ size }) => size || "1.25rem"};

    padding: 5px 15px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border: 2px solid #00ADB5;
    }
`

export const StEditorTextarea = styled.textarea`
    width: ${({ width }) => width || "inherit"};
    height: auto;
    min-height: 300px;

    border: 2px solid transparent;
    border-radius: 10px;
    
    font-size: 1.25rem;

    padding: 10px 15px;

    resize: vertical;

    &:focus {
        outline: none;
        border: 2px solid #00ADB5;
    }
`

export const StMainSection = styled.div`
    display: flex;
    flex-direction: column;

    height: auto;
    min-height: 400px;
    background-color: #D4D4D4;

    border-radius: 10px;

    box-sizing: border-box;
    padding: 20px;
    margin: 20px;

    gap: 20px;
`