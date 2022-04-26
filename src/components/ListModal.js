import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export default function ListModal ({ children }) {
  const element = document.getElementById("modal");

  return ReactDOM.createPortal(
    <ModalBackground>
      {children}
    </ModalBackground>
  , element);
};

const ModalBackground = styled.div`
  position: fixed;
  background-color: rgba(0,0,0,0.5);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
