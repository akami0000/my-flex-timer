import './App.css';
import React from 'react';
import { useEffect, useState, useCallback, useRef } from 'react';

interface Time {
  h: number;
  m: number;
  s: number;
}

export const App = () => {
  const [date, setDate] = useState(new Date());
  const time = [date.getHours(), date.getMinutes(), date.getSeconds()];
  const [h, m, s] = time;

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Get time
    setDate(date);
    // const time = [date.getHours(), date.getMinutes(), date.getSeconds()];
    // const [h, m, s] = time;

    // Get angles
    const degHour = h * (360 / 12) + m * (360 / 12 / 60);
    const degMin = m * (360 / 60) + s * (360 / 60 / 60);
    const degSec = s * (360 / 60);
    getElapsedTime();
  }, [date]);
  const [elapsedTime, setElapsedTime] = useState<Time | undefined>();
  const [workStartTime, setWorkStartTime] = useState<Time | undefined>();
  const [workEndTime, setWorkEndTime] = useState<Time | undefined>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const workStart = () => {
    setWorkStartTime({ h: date.getHours(), m: date.getMinutes(), s: date.getSeconds() });
    getElapsedTime();
  };
  const workEnd = () => {
    setWorkEndTime({ h: date.getHours(), m: date.getMinutes(), s: date.getSeconds() });
    getElapsedTime();
  };
  const workStartClear = () => {
    setWorkStartTime(undefined);
    getElapsedTime();
  };
  const workEndClear = () => {
    setWorkEndTime(undefined);
    getElapsedTime();
  };

  function getElapsedTime() {
    if (!workStartTime) {
      setElapsedTime(undefined);
      return;
    }
    let elapsedH = 0;
    let elapsedM = 0;
    let elapsedS = 0;

    if (!workEndTime) {
      elapsedH = date.getHours() - workStartTime.h;
      elapsedM = date.getMinutes() - workStartTime.m;
      elapsedS = date.getSeconds() - workStartTime.s;
    } else {
      elapsedH = workEndTime.h - workStartTime.h;
      elapsedM = workEndTime.m - workStartTime.m;
      elapsedS = workEndTime.s - workStartTime.s;
    }
    if (elapsedS < 0) {
      elapsedS += 60;
      elapsedM--;
    }
    if (elapsedM < 0) {
      elapsedM += 60;
      elapsedH--;
    }
    if (elapsedH < 0) {
      elapsedH += 24;
    }
    setElapsedTime({ h: elapsedH, m: elapsedM, s: elapsedS });
  }

  const formatTime = (time: Time | undefined) => {
    if (!time) {
      return '--:--';
    }
    const formattedHour = String(time.h).padStart(2, '0');
    const formattedMinutes = String(time.m).padStart(2, '0');
    return `${formattedHour}:${formattedMinutes}`;
  };

  return (
    <div className="container">
      {h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:
      {s.toString().padStart(2, '0')}
      <h1>Hello!!</h1>
      <div>{elapsedTime ? `経過時間：${formatTime(elapsedTime)}` : '経過時間：--:--'}</div>
      <div>{workStartTime ? `開始時間：${formatTime(workStartTime)}` : '開始時間：--:--'}</div>
      <button onClick={workStart}>出社</button>
      <button onClick={workStartClear}>クリア</button>
      <div>{workEndTime ? `${formatTime(workEndTime)}` : '終了時間：--:--'}</div>
      <button onClick={workEnd}>退社</button>
      <button onClick={workEndClear}>クリア</button>
    </div>
  );
};