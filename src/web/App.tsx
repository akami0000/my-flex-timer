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

  const [startText, setStartText] = useState<string>();
  const [endText, setEndText] = useState<string>();

  const [workStartTime, setWorkStartTime] = useState<Time | undefined>();
  const [workEndTime, setWorkEndTime] = useState<Time | undefined>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setStartText(formatTime(workStartTime));
  }, [workStartTime]);

  useEffect(() => {
    setEndText(formatTime(workEndTime));
  }, [workEndTime]);

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
    console.log('test');
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

  const handleChangeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;
    let formattedVal = inputVal.replace(/[^0-9:]/g, ''); // 数値とコロン以外を取り除く
    formattedVal = formattedVal.replace(/:+/g, ':'); // 連続するコロンを1つにまとめる
    if (formattedVal.length === 4 && !formattedVal.includes(':')) {
      // 4桁の場合はHH:MM形式に変換する
      const hour = formattedVal.substr(0, 2);
      const minute = formattedVal.substr(2, 2);
      formattedVal = `${hour}:${minute}`;
    } else if (formattedVal.length > 4 && !formattedVal.includes(':')) {
      // 5桁以上の場合は、末尾から4桁だけをHH:MM形式に変換する
      // formattedVal = formattedVal.substr(-4);
      const hour = formattedVal.substr(0, 2);
      const minute = formattedVal.substr(2, 2);
      formattedVal = `${hour}:${minute}`;
    }

    formattedVal = formattedVal.replace(/:+/g, ':'); // 2つ以上連続したコロンを1つに置換する
    setStartText(formattedVal);

    if (formattedVal.length === 5 && formattedVal.includes(':')) {
      const newStr = formattedVal.replace(/:/g, '');
      const hour = newStr.substr(0, 2);
      const minute = newStr.substr(2, 2);
      setWorkStartTime({ h: Number(hour), m: Number(minute), s: 0 });
    }
  };

  const handleChangeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;
    let formattedVal = inputVal.replace(/[^0-9:]/g, ''); // 数値とコロン以外を取り除く
    formattedVal = formattedVal.replace(/:+/g, ':'); // 連続するコロンを1つにまとめる
    if (formattedVal.length === 4) {
      // 4桁の場合はHH:MM形式に変換する
      const hour = formattedVal.substr(0, 2);
      const minute = formattedVal.substr(2, 2);
      formattedVal = `${hour}:${minute}`;
    } else if (formattedVal.length > 4) {
      // 5桁以上の場合は、末尾から4桁だけをHH:MM形式に変換する
      formattedVal = formattedVal.substr(-4);
      const hour = formattedVal.substr(0, 2);
      const minute = formattedVal.substr(2, 2);
      formattedVal = `${hour}:${minute}`;
    }
    formattedVal = formattedVal.replace(/:+/g, ':'); // 2つ以上連続したコロンを1つに置換する
    setEndText(formattedVal);

    if (formattedVal.length === 5 && formattedVal.includes(':')) {
      const newStr = formattedVal.replace(/:/g, '');
      const hour = newStr.substr(0, 2);
      const minute = newStr.substr(2, 2);
      setWorkEndTime({ h: Number(hour), m: Number(minute), s: 0 });
    }
  };

  return (
    <div className="container">
      {h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:
      {s.toString().padStart(2, '0')}
      <h1>Hello!!</h1>
      <div>{elapsedTime ? `経過時間：${formatTime(elapsedTime)}` : '経過時間：--:--'}</div>
      {/* <div>{workStartTime ? `開始時間：${formatTime(workStartTime)}` : '開始時間：--:--'}</div> */}
      <label htmlFor="name">開始時間:</label>
      <input
        type="text"
        id="startTime"
        name="name"
        value={startText}
        required
        minLength={parseInt('4')}
        maxLength={parseInt('5')}
        onChange={handleChangeStart}
      ></input>
      <button onClick={workStart}>出社</button>
      <button onClick={workStartClear}>クリア</button>
      {/* <div>{workEndTime ? `${formatTime(workEndTime)}` : '終了時間：--:--'}</div> */}
      <label htmlFor="name">終了時間:</label>
      <input
        type="text"
        id="endTime"
        name="name"
        value={endText}
        required
        minLength={parseInt('4')}
        maxLength={parseInt('5')}
        onChange={handleChangeEnd}
      ></input>
      <button onClick={workEnd}>退社</button>
      <button onClick={workEndClear}>クリア</button>
    </div>
  );
};