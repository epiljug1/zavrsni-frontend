import styled from "styled-components";

const ValidationErrorField = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: -10px;
`;

const ValidationError = (props) => {
  return <ValidationErrorField>{props.children}</ValidationErrorField>;
};

export default ValidationError;
