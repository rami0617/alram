import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "date-fns";

import { alramAdd, alramOff, alramDelete } from "../features/alramDataSlice";

export default function Alram({ onShowModal }) {
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
      alramOn: "on",
    });
  };

  const newDate = new Date();
  const today = format(newDate, "yyyy/MM/dd");
  const realTime = format(newDate, "HH:mm");
  const now = (today + realTime).replace(/[^\w\s]/gi, '');

  const { date, time } = alramInfo;

  const handleAddAlram = (event) => {
    const { name, value } = event.target;
    const id = (date + time).replace(/[^\w\s]/gi, '');

    setAlramInfo({
      ...alramInfo,
      [name]: value,
      id: id,
    });
  };

  const alramList = state.allIds.map((id) => {
    return {
      id,
      ...state.byIds[id],
    };
  });

  for (let i = 0; i < alramList.length; i++)  {
    if (alramList[i].id === now && alramList[i].clockMode === "vibration") {
      onShowModal(true);
    }
  }

  return (
    <div>
      <Main>
      <div className="nowtime">
        {nowTime.toLocaleDateString()}{" "}{nowTime.toLocaleTimeString()}
      </div>
      <div className="enterAlram">
        <ul>알람등록</ul>
        <ul>시계모드에서 "진동" + 알람모드에서 "일반"을 선택할 경우 알람이 울리는 동안 창을 끌 수 없습니다.</ul>
        <ul>시계모드에서 "진동" + 알람모드에서 "긴급"을 선택할 경우 알람이 울리는 동안 창을 끌 수 없습니다.</ul>
        <form className="alramForm" onSubmit={handleSubmit}>
        <ul>시계모드:
          <select name="clockMode" onChange={handleAddAlram}>
            <option>-----</option>
            <option value="normal">일반</option>
            <option value="vibration">진동</option>
            <option value="night">야간</option></select></ul>
        <ul>시간설정: <input type="date" name="date" onChange={handleAddAlram} /></ul>
        <ul> 알람모드:
          <select name="alramMode" onChange={handleAddAlram}>
            <option>-----</option>
            <option value="normal">일반</option>
            <option value="emergency">긴급</option>
          </select>
          <input type="time" name="time" onChange={handleAddAlram} />
        </ul>
        <ul>내용: <input type="text" name="description" onChange={handleAddAlram} />
        <input type="submit" value="내용추가" /></ul>
        </form>
      </div>
      <div className="alramList">
        <ul>예약되어있는 알람</ul>
        {alramList.map((list) => (
          <div key={list.id}>
         {list.date}{" "}{list.time}{list.description} <button onClick={()=> dispatch(alramOff(list.id))}>끄기</button>
        <button onClick={() => dispatch(alramDelete(list.id))}>삭제</button></div>))}
          <div className="messageInfo">
            <div className="item">
              {alramList.map((list) => (
                <div key={list.id}>{list.id === now ? list.time + list.description : null }
              </div>))}
            </div>
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
    grid-template-colum: 200px;
    border: solid 2px;
  }
`;
