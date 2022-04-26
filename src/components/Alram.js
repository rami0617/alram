import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { alramAdd } from "../features/alramDataSlice";

import List from "./List";

export default function Alram() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.alramData);
  const [nowTime, setNowTime] = useState(new Date());
  const [alramInfo, setAlramInfo] = useState({
    id: "",
    date: "",
    time: "",
    clockMode: "",
    alramMode: "",
    description: "",
    alramOn: "on",
  });

  useEffect(() => {
    setInterval(() => {
      setNowTime(new Date());
    }, 1000);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(alramAdd(alramInfo));

    setAlramInfo({
      id: "",
      date: "",
      time: "",
      clockMode: "",
      alramMode: "",
      description: "",
      alramOn: "",
    });
  };

  const { date, time } = alramInfo;

  const id = (date + time).replace(/[^\w\s]/gi, '');

  const handleAddAlram = (event) => {
    const { name, value } = event.target;

    setAlramInfo({
      ...alramInfo,
      id: id,
      [name]: value,
    });
  };

  const alramList = state.allIds.map((id) => {
    return {
      id,
      ...state.byIds[id],
    };
  });

  return (
    <div>
      <Main>
      <div className="nowtime">
        현재시간 : {nowTime.toLocaleTimeString()}
      </div>
      <div className="enterAlram">
        <li>알람등록</li>
        <form className="alramForm" onSubmit={handleSubmit}>
        <li>시계모드:
          <select name="clockMode" onChange={handleAddAlram}>
            <option>-----</option>
            <option value="normal">일반</option>
            <option value="vibration">진동</option>
            <option value="night">야간</option></select></li>
        <li>시간설정: <input type="date" name="date" onChange={handleAddAlram} /></li>
        <li> 알람모드:
          <select name="alramMode" onChange={handleAddAlram}>
            <option>-----</option>
            <option value="normal">일반</option>
            <option value="emergency">긴급</option>
          </select>
          <input type="time" name="time" onChange={handleAddAlram} />
        </li>
        <li>내용: <input type="text" name="description" onChange={handleAddAlram} /><input type="submit" value="내용추가" /></li>
        </form>
      </div>
      <div className="alramList">
        {alramList.map((list) => (
          <div key={list.id}>
          <List list={list} />
          </div>
        ))}
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
