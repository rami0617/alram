import reducer, { alramAdd, alramDelete, alramOff, alramOn } from "./alramDataSlice";

test("Check if there is an initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    allIds: ["202204261830"],
    byIds: {
      202204261830: {
        id: "202204261830",
        date: "2022-04-26",
        time: "18:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "밥먹기",
        alramOn: "on",
      },
    },
  });
});

test("Make sure 'alramAdd' runs", () => {
  const previousState = {
    allIds: ["202204261830"],
    byIds: {
      202204261830: {
        id: "202204261830",
        date: "2022-04-26",
        time: "18:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "밥먹기",
        alramOn: "on",
      },
    },
  };

  const addState = {
    id: "202204272030",
    date: "2022-04-27",
    time: "20:30",
    clockMode: "normal",
    alramMode: "normal",
    description: "씻기",
    alramOn: "on",
  };

  expect(reducer(previousState, alramAdd(addState))).toEqual({
    allIds: ["202204261830", "202204272030"],
    byIds: {
      202204261830: {
        id: "202204261830",
        date: "2022-04-26",
        time: "18:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "밥먹기",
        alramOn: "on",
      },
      202204272030: {
        id: "202204272030",
        date: "2022-04-27",
        time: "20:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "씻기",
        alramOn: "on",
      },
    },
  });
});

test("Make sure 'alramOff' runs", () => {
  const nowState = {
    allIds: ["202204261830", "202204272030"],
    byIds: {
      202204261830: {
        id: "202204261830",
        date: "2022-04-26",
        time: "18:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "밥먹기",
        alramOn: "on",
      },
      202204272030: {
        id: "202204272030",
        date: "2022-04-27",
        time: "20:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "씻기",
        alramOn: "on",
      },
    },
  };

  const id = "202204272030";

  expect(reducer(nowState, alramOff(id))).toEqual({
    allIds: ["202204261830", "202204272030"],
    byIds: {
      202204261830: {
        id: "202204261830",
        date: "2022-04-26",
        time: "18:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "밥먹기",
        alramOn: "on",
      },
      202204272030: {
        id: "202204272030",
        date: "2022-04-27",
        time: "20:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "씻기",
        alramOn: "off",
      },
    },
  });
});


test("Make sure 'alramOn' runs", () => {
  const nowState = {
    allIds: ["202204261830", "202204272030"],
    byIds: {
      202204261830: {
        id: "202204261830",
        date: "2022-04-26",
        time: "18:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "밥먹기",
        alramOn: "on",
      },
      202204272030: {
        id: "202204272030",
        date: "2022-04-27",
        time: "20:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "씻기",
        alramOn: "off",
      },
    },
  };

  const id = "202204272030";

  expect(reducer(nowState, alramOn(id))).toEqual({
    allIds: ["202204261830", "202204272030"],
    byIds: {
      202204261830: {
        id: "202204261830",
        date: "2022-04-26",
        time: "18:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "밥먹기",
        alramOn: "on",
      },
      202204272030: {
        id: "202204272030",
        date: "2022-04-27",
        time: "20:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "씻기",
        alramOn: "on",
      },
    },
  });
});



test("Make sure 'alramDelete' runs", () => {
  const nowState = {
    allIds: ["202204261830", "202204272030"],
    byIds: {
      202204261830: {
        id: "202204261830",
        date: "2022-04-26",
        time: "18:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "밥먹기",
        alramOn: "on",
      },
      202204272030: {
        id: "202204272030",
        date: "2022-04-27",
        time: "20:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "씻기",
        alramOn: "on",
      },
    },
  };

  const id = "202204272030";

  expect(reducer(nowState, alramDelete(id))).toEqual({
    allIds: ["202204261830"],
    byIds: {
      202204261830: {
        id: "202204261830",
        date: "2022-04-26",
        time: "18:30",
        clockMode: "normal",
        alramMode: "normal",
        description: "밥먹기",
        alramOn: "on",
      },
    },
  });
});

