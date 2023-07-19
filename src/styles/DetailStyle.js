import { styled } from "styled-components";
import { ReactComponent as Heart } from "../assets/images/icon/heart1.svg";

export const StDetailContentSection = styled.div`
    display: flex;
    flex-direction: column;

    width: inherit;
    
    gap: 10px;
`

export const StDetail = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: ${({ height }) => height || "auto"};
    min-height: ${({ height }) => height || "70px"};

    background-color: white;
    border: 2px solid transparent;
    border-radius: 10px;

    font-size: 1.25rem;
    
    gap: 10px;

    box-sizing: border-box;
    padding: 10px;
    padding-bottom: ${({ $bottom }) => $bottom};
`

export const StDetailTitleItemArea = styled.div`
    display: flex;
    flex-direction: column;

    width: inherit;
`

export const StDetailTitleItemTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.25rem;
    font-weight: 700;
`

export const StDetailTitleItemBottom = styled.div`
    display: flex;
    justify-content: space-between;

    font-size: 1rem;
    font-weight: 500;
    border-top: 2px solid #d4d4d4;
`

export const StDetailButtonArea = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`

export const StDetailButtonAreaChild = styled.div`
    display: flex;
    gap: 10px;
`

export const StDetailCommentSection = styled.div`
    display: flex;
    flex-direction: column;
    
    font-size: 1rem;

    width: inherit;
    gap: 10px;
`

export const StCommentList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    width: inherit;
    height: auto;

    background-color: white;
    border-radius: 10px;
    
    box-sizing: border-box;
    padding: 5px 10px;
    margin: 0px;
    
    list-style: none;
`

export const StCommentListItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: auto;
    min-height: 30px;

    border-bottom: 2px solid ${({ $border }) => $border || "transparent"};
    
    box-sizing: border-box;
    padding: 5px;
    margin: 0;

    &:last-child {
        border-bottom: transparent;
    }
`

export const StCommentListItemBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: ${({ $width }) => $width};
    min-width: ${({ $min }) => $min};

    text-align: ${({ $align }) => $align || "center"};
    gap: 10px;
`

export const StCommentForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: inherit;

    border-radius: 10px;

    gap: 10px;
`

export const StFavorite = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 50px;
    
    font-size: 1.5rem;
    font-weight: 500;

    gap: 10px;
`

export const StCommentListSide = styled.div`    
    display: flex;
    align-items: center;
    
    gap: 10px;
`

export const FavoriteBtn = styled.div`
    width: inherit;
    height: inherit;

    padding: 0;
    margin: 0;
    
    cursor: pointer;
`

export const Favorite = styled(Heart)`
    path {
        stroke: ${({ $clicked }) => $clicked ? "red" : "black"};
        fill: ${({ $clicked }) => $clicked ? "red" : "transparent"};
        transition: fill 0.5s, stroke 0.5s;
    }
`