import styled from "styled-components";

const NumOfPosts = (props) => {
  return <NuberOfPosts>{props.children}</NuberOfPosts>;
};

const NuberOfPosts = styled.div`
  color: rgba(0, 0, 0, 0.9);
  //   position: absolute;
  //   top: 20px;
  //   left: 30px;

  width: fit-content;
  margin: 10px auto;
`;

//#ffffff
export default NumOfPosts;
