import './App.css';
import React from 'react';
import { useEffect, useState, useCallback, useRef } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Label, Icon } from 'semantic-ui-react';

interface Time {
  h: number;
  m: number;
  s: number;
}
const ButtonExampleButton = () => <Button>Click Here</Button>;

export default ButtonExampleButton;

export const App = () => {
  const [date, setDate] = useState(new Date());
  const time = [date.getHours(), date.getMinutes(), date.getSeconds()];
  const [h, m, s] = time;
  const [isWorking, setIsWorking] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);

  const [targetH, setTargetH] = useState<number | undefined>(8);
  const [targetM, setTargetM] = useState<number | undefined>(0);

  const [elapsedTime, setElapsedTime] = useState<Time | undefined>();

  const [startText, setStartText] = useState<string>();
  const [endText, setEndText] = useState<string>();

  const [workStartTime, setWorkStartTime] = useState<Time | undefined>();
  const [workEndTime, setWorkEndTime] = useState<Time | undefined>();

  const [buttonText, setButtonText] = useState('not working.');
  const [breakButtonText, setBreakButtonText] = useState('Off break');

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Get time
    setDate(date);

    getElapsedTime();
  }, [date]);

  useEffect(() => {
    setStartText(formatTime(workStartTime));
  }, [workStartTime]);

  useEffect(() => {
    setEndText(formatTime(workEndTime));
  }, [workEndTime]);

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

  const handleClick1 = () => {
    if (isWorking) {
      setButtonText('not working.');
      setWorkEndTime({ h: date.getHours(), m: date.getMinutes(), s: date.getSeconds() });
      getElapsedTime();
    } else {
      setButtonText('working!');
      setWorkStartTime({ h: date.getHours(), m: date.getMinutes(), s: date.getSeconds() });
      getElapsedTime();
    }
    setIsWorking(!isWorking);
  };

  const handleClick2 = () => {
    if (isBreaking) {
      setBreakButtonText('Off break');
    } else {
      setBreakButtonText('On break');
    }
    setIsBreaking(!isBreaking);
  };

  const handleChangeTargetH = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setTargetH(undefined);
    } else {
      setTargetH(Number(event.target.value));
    }
  };
  const handleChangeTargetM = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setTargetM(undefined);
    } else {
      setTargetM(Number(event.target.value));
    }
  };

  function addTime() {
    if (!workStartTime) return `--:--`;
    let hour: number = workStartTime.h;
    let minute: number = workStartTime.m;
    let second: number = workStartTime.s;
    let addHour: number = Number(targetH);
    let addMinute: number = Number(targetM);
    // 1時間 = 60分、1分 = 60秒として、分と秒について計算
    var totalSecond = (hour + addHour) * 3600 + (minute + addMinute) * 60 + second;
    var newHour = Math.floor(totalSecond / 3600);
    var newMinute = Math.floor((totalSecond % 3600) / 60);
    var newSecond = totalSecond % 60;

    // 24時間以上の場合は、0〜23時の範囲に収める
    newHour = newHour % 24;

    // 時、分、秒の桁数が1桁の場合、先頭に0をつける
    var newHour2 = ('00' + newHour).slice(-2);
    var newMinute2 = ('00' + newMinute).slice(-2);

    return `${newHour2}:${newMinute2}`;
  }

  return (
    <div className="container">
      <p>
        <h1>
          {h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:
          {s.toString().padStart(2, '0')}
        </h1>
      </p>
      <div>
        <p>{elapsedTime ? `経過時間：${formatTime(elapsedTime)}` : '経過時間：--:--'}</p>
      </div>
      <div>
        <Button id="toggleButton1" toggle active={isWorking} onClick={handleClick1}>
          {buttonText}
        </Button>
        <Button
          id="toggleButton2"
          toggle
          active={isBreaking}
          disabled={!isWorking}
          onClick={handleClick2}
        >
          {breakButtonText}
        </Button>
      </div>
      <div></div>
      <div>
        <label htmlFor="name">開始時間:</label>
        <div className="ui mini input">
          <input
            type="text"
            id="startTime"
            name="name"
            value={startText}
            required
            minLength={parseInt('4')}
            maxLength={parseInt('5')}
            onChange={handleChangeStart}
          />
        </div>
        <button className="ui tiny icon button" onClick={workStartClear}>
          <i aria-hidden="true" className="undo icon"></i>
        </button>
      </div>
      <div>
        <label htmlFor="name">終了時間:</label>
        <div className="ui mini input">
          <input
            type="text"
            id="endTime"
            name="name"
            value={endText}
            required
            minLength={parseInt('4')}
            maxLength={parseInt('5')}
            onChange={handleChangeEnd}
          />
        </div>
        <button className="ui tiny icon button" onClick={workEndClear}>
          <i aria-hidden="true" className="undo icon"></i>
        </button>
      </div>
      <div>
        <label htmlFor="name">目標時間:</label>
        <div className="ui mini input">
          <input
            type="text"
            name="name"
            value={targetH}
            required
            minLength={parseInt('1')}
            maxLength={parseInt('2')}
            style={{ width: '50px' }}
            onChange={handleChangeTargetH}
          />
        </div>
        <label htmlFor="name">h</label>
        <div className="ui mini input">
          <input
            type="text"
            name="name"
            value={targetM}
            required
            minLength={parseInt('1')}
            maxLength={parseInt('2')}
            style={{ width: '50px' }}
            onChange={handleChangeTargetM}
          />
        </div>
        <label htmlFor="name">m</label>
      </div>
      <div>
        <label htmlFor="name">{addTime()}</label>
      </div>
    </div>
  );
};