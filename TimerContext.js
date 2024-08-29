import React, { createContext, useState, useContext } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);

  return (
    <TimerContext.Provider
      value={{
        timerRunning,
        setTimerRunning,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        elapsedTime,
        setElapsedTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  return useContext(TimerContext);
};
