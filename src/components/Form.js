import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "date-fns";

import { alramAdd } from "../features/alramDataSlice";

export default function Form() {
  const dispatch = useDispatch();

  const [alramInfo, setAlramInfo] = useState({
    id: "",
    date: "",
    time: "",
    clockMode: "",
    alramMode: "",
    description: "",
    alramOn: "on",
  });

  const handleSubmit = (event) => {
    if (!alramInfo.alramMode || !alramInfo.clockMode) {
      alert("선택해서 다시 제출해주세요");
    } else {
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
    }

    event.preventDefault();
  };

  const newDate = new Date();
  const today = format(newDate, "yyyy-MM-dd");
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

  return (
    <div>
      <form className="alramForm" onSubmit={handleSubmit}>
        <div>
          ✨시계모드:
          <select name="clockMode" value={clockMode} onChange={handleAddAlram}>
            <option value="default">-----</option>
            <option value="normal">일반</option>
            <option value="vibration">진동</option>
            <option value="night">야간</option>
          </select>
        </div>
        <div>
          ✨시간설정:
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleAddAlram}
            min={today}
            required
          />
        </div>
        <div>
          ✨알람모드:
          <select name="alramMode" value={alramMode} onChange={handleAddAlram}>
            <option>-----</option>
            <option value="normal">일반</option>
            <option value="emergency">긴급</option>
          </select>
          <input
            type="time"
            name="time"
            value={time}
            onChange={handleAddAlram}
            required
          />
        </div>
        <div>
          ✨내용:
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleAddAlram}
            required
          />
          <input type="submit" value="알람추가" />
        </div>
      </form>
    </div>
  );
}
