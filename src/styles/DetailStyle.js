import { styled } from "styled-components";

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
    padding-bottom: ${({bottom}) => bottom};
`

export const StDetailTitleItemArea = styled.div`
    display: flex;
    flex-direction: column;

    width: inherit;
`

export const StDetailTitleItemTop = styled.div`
    display: flex;
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

    background-color: white;
    padding: 5px 10px;
    margin: 0px;

    box-sizing: border-box;
    list-style: none;

    border-radius: 10px;
`

export const StCommentListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: auto;
    min-height: 30px;

    margin: 0;
    padding: 0;

    border-top: 2px solid ${({ border }) => border || "transparent"};

    gap: 10px;
`

export const StCommentListItemBlock = styled.div`
    width: ${({ width }) => width};    
    min-width: ${({ min }) => min};

    text-align: ${({ align }) => align || "center"};
`

export const StCommentForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: inherit;

    border-radius: 10px;

    gap: 10px;
`