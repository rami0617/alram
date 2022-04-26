import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "date-fns";

import ListModal from "./ListModal";

export default function List({ onShowModal }) {
  const state = useSelector((state) => state.alramData);

  const handleModal = () => {
    onShowModal(false);
  };

  const alramList = state.allIds.map((id) => {
    return {
      id,
      ...state.byIds[id],
    };
  });

  const newDate = new Date();
  const today = format(newDate, "yyyy/MM/dd");
  const realTime = format(newDate, "HH:mm");
  const now = (today + realTime).replace(/[^\w\s]/gi, '');

  return (
    <div>
      <ListModal>
        <Modal>
          <div className="modalBox">
            <div className="head">
            <button onClick={handleModal}>X</button>
             </div>
          <div className="alramMessage">
            <div>1분 후에 창을 닫을 수 있습니다.</div>
            {alramList.map((list) => (
              list.id === now  &&
             <div key={list.id}> {list.time} {list.description}할 시간입니다</div>
            ))}
          </div>
      </div>
      </Modal>
      </ListModal>
    </div>
  );
}


const Modal = styled.div`
  .modalBox {
    position: absolute;
    display: grid;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-height: 80%;
    max-width: 80%;
    width: 100%;
    height: 100%;
    padding: 16px;
    background: rgb(251, 243, 220);
    border-radius: 10px;
  }

  .head {
    position: absolute;
    left: 95%;
    top: 40px;
    border: none;
    cursor: pointer;
  }

  .alramMessage {
    display: grid;
    margin: 60px;
    padding: 20px;
    grid-template-rows: 200px;
    border: solid 2px;
    border-radius: 10px;
  }
`;
