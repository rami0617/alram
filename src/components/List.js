import React from "react";
import { useDispatch } from "react-redux";

import { alramOff, alramDelete } from "../features/alramDataSlice";

export default function List({ list }) {
  const dispatch = useDispatch();

  return (
    <div>
      {list.alramOn === "on" &&
        <div key={list.id}>{list.time}{list.description} <button onClick={()=> dispatch(alramOff(list.id))}>끄기</button>
        <button onClick={() => dispatch(alramDelete(list.id))}>삭제</button>
        </div>}
    </div>
  );
}