import { styled } from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
    width: inherit;
    height: inherit;

    text-align: center;
    text-decoration: none;

    font-size: ${({ $size }) => $size || "0.875rem"};
    font-weight: ${({ $weight }) => $weight || "500"};
	color: ${({ $color }) => $color || "black"};

    &:hover, &:focus, &:active, &:visited {
        color: ${({ $color }) => $color || "black"};
    }
`

export default StyledLink;