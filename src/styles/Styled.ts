import styled, { keyframes } from "styled-components";

const Title = styled.h1`
color: black;
text-align: center;
font-family: monospace;
`;

const BgTitle = styled(Title)`
background-color: black;
color: white;
&:hover{
    background-color: white;
    color: black;
}
`;

const pulse = keyframes`
from {
    opacity: 0.1;
}
to{
    opacity: 1;
}
`;

const AnimatedTitle = styled(BgTitle)`
animation: 1s ${pulse} infinite alternate;
`;
type DynamicTitleProps = {
    inverted? : boolean;
    size? : number;
}
const DynamicTitle = styled.h1<DynamicTitleProps>`
color: ${(props) => (props.inverted) ? 'red' : "black"};
background-color: ${(props) => (props.inverted) ? 'black' : "red"};
font-size:${(props) => ((props.size) ? `${props.size}rem` : '2rem')} ;
`;

export {Title, BgTitle, AnimatedTitle, DynamicTitle}