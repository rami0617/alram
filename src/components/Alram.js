import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "date-fns";
import PropTypes from "prop-types";

import Form from "../components/Form";
import { alramOff, alramOn, alramDelete } from "../features/alramDataSlice";

export default function Alram({ onShowModal }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.alramData);
  const [nowTime, setNowTime] = useState(new Date());

  const newDate = new Date();
  const today = format(newDate, "yyyy-MM-dd");
  const realTime = format(newDate, "HH:mm");
  const now = (today + realTime).replace(/[^\w\s]/gi, "");

  useEffect(() => {
    setInterval(() => {
      setNowTime(new Date());
    }, 1000);
  }, []);

  const weekOfday = format(newDate, 'EEEE');

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
          {nowTime.toLocaleDateString()}{"  "}{weekOfday}{"  "}{nowTime.toLocaleTimeString()}
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
          <Form />
        </div>
        <div className="alramList">
          <div className="bookedAlram">
            예약되어있는 알람
            {alramList.map((list) => (
              <li key={list.id}>
                {list.alramOn === "on" && (
                  <div className="alramOn">
                    {list.date} {list.time} {list.description}
                    <button onClick={() => dispatch(alramOff(list.id))}>
                      끄기
                    </button>
                    <button onClick={() => dispatch(alramDelete(list.id))}>
                      삭제
                    </button>
                  </div>
                )}
              </li>
            ))}
          </div>
          <div className="turnoffAlram">
            꺼진 알람
            {alramList.map((list) => (
              <li key={list.id}>
                {list.alramOn === "off" && (
                  <div className="alramOff">
                    {list.date} {list.time} {list.description}
                    <button onClick={() => dispatch(alramOn(list.id))}>
                      알람 켜기
                    </button>
                  </div>
                )}
              </li>
            ))}
          </div>
          <div className="messageInfo">
            알람 정보
            {alramList.map((list) => (
              <div key={list.id}>
                <span>
                  {list.id === now && (
                    <div>
                      {list.time}
                      {"  "}
                      {list.description}
                    </div>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Main>
    </div>
  );
}

Alram.propTypes = {
  onShowModal: PropTypes.func.isRequired,
};

const Main = styled.div`
  display: grid;
  justify-content: space-evenly;

  .nowtime {
    font-family: "Black Han Sans", sans-serif;
    text-align: center;
    font-size: 4vw;
  }

  .addAlram {
    font-family: "Nanum Pen Script", cursive;
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
    font-family: "Nanum Pen Script", cursive;
    font-size: 2vw;

    .bookedAlram {
      border-bottom: 2px solid;
      list-style: none;
    }

    .turnoffAlram {
      border-bottom: 2px solid;
      list-style: none;
    }
  }
`;
