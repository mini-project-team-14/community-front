import React from 'react'
import { styled } from 'styled-components'

function Footer() {
    return (
        <StFooter>
            <div>
                <span>Team 14</span>
            </div>
            <StRelatedSite>
                <span>관련 사이트</span>
            </StRelatedSite>
        </StFooter>
    )
}

export default Footer

const StFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    min-width: 700px;
    height: 50px;

    color: #eeeeee;
    background-color: #393E46;
    position: relative;
    transform: translateY(-100%);

    padding: 0 30px;
    box-sizing: border-box;
`

const StRelatedSite = styled.div`
    display: flex;
    align-items: center;
    width: 150px;
    
    border: 1px solid #eeeeee;
    background-color: transparent;
    color: #eeeeee;
    font-size: 0.9rem;
    
    padding: 5px 10px;
`