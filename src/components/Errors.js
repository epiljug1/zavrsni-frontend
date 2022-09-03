import styled from "styled-components";

const Errors = (props) => {
  return <ErrorsField>{props.children}</ErrorsField>;
};

const ErrorsField = styled.div`
  color: red;
  border: 1px solid;
  border-radius: 10px;
  margin: 10px;
  padding: 5px;
  font-size: 0.9rem;
`;

export default Errors;
