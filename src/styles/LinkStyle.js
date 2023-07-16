import { styled } from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
    width: inherit;
    height: inherit;
    text-decoration: none;
    &:hover, &:focus, &:active, &:visited {
        color: ${({ color }) => color || "#00ADB5"};
    }
`

export default StyledLink;