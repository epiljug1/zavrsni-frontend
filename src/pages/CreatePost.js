import React from "react";
import styled from "styled-components";
import ReactDom from "react-dom";

const CreatePost = (props) => {
  if (!props.isOpen) return null;

  return ReactDom.createPortal(
    <Modal>
      <div>proba proba proba</div>
      <button onClick={props.onClose}>Close</button>
    </Modal>,
    document.getElementById("portal")
  );
};

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: 'translate(-50%, -50%);
    background-color: white;
    padding: 30px;
    z-index:1000;
    width: 300px;
    height: 300px;
`;

const Backlog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

export default CreatePost;
