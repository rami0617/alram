import React, { useEffect, useState } from "react";
import styled from "styled-components";

import List from "./List";

export default function Alram() {

  const [nowTime, setNowTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNowTime(new Date());
    }, 1000);
  }, []);

  return (
    <div>
      <Main>
      <div className="nowtime">
        현재시간 : {nowTime.toLocaleTimeString()}
      </div>
      <div className="enterAlram">
        <li>알람등록</li>
        <li>시계모드:
          <select>
            <option value="일반">일반</option>
            <option value="진동">진동</option>
            <option value="야간">야간</option></select></li>
        <li>시간설정: <input type="date"/></li>
        <li> 알람모드:
          <select>
            <option value="일반">일반</option>
            <option value="긴급">긴급</option>
          </select>
          <input type="time" />
        </li>
        <li>내용: <input type="text" /><button>내용추가</button></li>
      </div>
      <div className="alramList">
       <List />
      </div>
      <div className="message">
        <li>메시지 </li>
        <div className="messageInfo">
          <div className="item"></div>
        </div>
      </div>
      </Main>
    </div>
  );

}

const Main = styled.div`
  .messageInfo {
    display: grid;
    grid-template-rows: 200px;
    border: solid 2px;
  }

`;