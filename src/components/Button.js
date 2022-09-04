import styled from "styled-components";

const Button = styled.button`
  border: 1px solid;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "15px"};
  font-size: 1.1rem;
  padding: 5px 15px;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
  &:focus {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export default Button;
