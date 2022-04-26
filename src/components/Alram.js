import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "date-fns";

import { alramAdd, alramOff, alramOn, alramDelete } from "../features/alramDataSlice";

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

    event.preventDefault();
  };

  const newDate = new Date();
  const today = format(newDate, "yyyy/MM/dd");
  const realTime = format(newDate, "HH:mm");
  const now = (today + realTime).replace(/[^\w\s]/gi, "");

  const { date, time, clockMode, alramMode, description } = alramInfo;

  const handleAddAlram = (event) => {
    const { name, value } = event.target;
    const id = (date + time).replace(/[^\w\s]/gi, "");

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

  for (let i = 0; i < alramList.length; i++) {
    if (alramList[i].id === now && alramList[i].clockMode === "vibration") {
      onShowModal(true);
    }
  }

  return (
    <div>
      <Main>
        <div className="nowtime">
          {nowTime.toLocaleDateString()} {nowTime.toLocaleTimeString()}
        </div>
        <div className="addAlram">
          <div>✨알람등록</div>
          <div>
            시계모드에서 "진동" + 알람모드에서 "일반"을 선택할 경우 알람이
            울리는 동안 창을 끌 수 없습니다.
          </div>
          <div>
            시계모드에서 "진동" + 알람모드에서 "긴급"을 선택할 경우 알람이
            울리는 동안 창을 끌 수 없습니다.
          </div>
          <form className="alramForm" onSubmit={handleSubmit}>
            <div>
            ✨시계모드:
              <select name="clockMode" value={clockMode} onChange={handleAddAlram}>
                <option>-----</option>
                <option value="normal">일반</option>
                <option value="vibration">진동</option>
                <option value="night">야간</option>
              </select>
            </div>
            <div>
            ✨시간설정:
              <input type="date" name="date" value={date} onChange={handleAddAlram} />
            </div>
            <div>
            ✨알람모드:
              <select name="alramMode" value={alramMode} onChange={handleAddAlram}>
                <option>-----</option>
                <option value="normal">일반</option>
                <option value="emergency">긴급</option>
              </select>
              <input type="time" name="time" value={time} onChange={handleAddAlram} />
            </div>
            <div>
              ✨내용:
              <input type="text" name="description" value={description} onChange={handleAddAlram} />
              <input type="submit" value="내용추가" />
            </div>
          </form>
        </div>
        <div className="alramList">
        <div className="bookedAlram">예약되어있는 알람
          {alramList.map((list) => (
            <span>{list.alramOn === "on" && <div className="alramOn"  key={list.id}>
                   {list.date + "  " + list.time + "  "+ list.description}
                  <button onClick={() => dispatch(alramOff(list.id))}>끄기</button>
                  <button onClick={() => dispatch(alramDelete(list.id))}>삭제</button>
            </div>}</span>
            ))}</div>
            <div className="turnoffAlram">꺼진 알람
            {alramList.map((list) => (
               <sapn> {list.alramOn === "off" && <div className="alramOff" key={list.id}>
                  {list.date + "  " + list.time+ "  "  + list.description}
                  <button onClick={() => dispatch(alramOn(list.id))}>알람 키기</button>
                  </div>}</sapn>))} </div>
          <div className="messageInfo"> 알람 정보
              {alramList.map((list) => (
                <div key={list.id}>
                  <span>{list.id === now ? list.time + list.description : null}</span>
                </div>
              ))}
          </div>
        </div>
      </Main>
    </div>
  );
}

const Main = styled.div`
  display: grid;
  justify-content: space-evenly;

  .nowtime {
    font-family: 'Black Han Sans', sans-serif;
    text-align: center;
    font-size: 4vw;
  }

  .addAlram {
    font-family: 'Nanum Pen Script', cursive;
    font-size: 2vw;
    margin: 20px;
  }

  .alramOff {
    color: gray;
  }

  .alramList {
    display: grid;
    grid-template-rows: 120px 120px 120px;
    width: 600px;
    border: 2px solid;
    margin: 20px;
    font-family: 'Nanum Pen Script', cursive;
    font-size: 2vw;

    .bookedAlram  {
      border-bottom: 2px solid;
    }
    .turnoffAlram {
      border-bottom: 2px solid;
    }
  }
`;
