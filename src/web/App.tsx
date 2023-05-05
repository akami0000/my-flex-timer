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

  const [workStartTime, setWorkStartTime] = useState<Time | undefined>();
  const [workEndTime, setWorkEndTime] = useState<Time | undefined>();
  const [breakTime1, setBreakTime1] = useState<Time | undefined>();
  const [breakTime2, setBreakTime2] = useState<Time | undefined>();
  const [breakTime3, setBreakTime3] = useState<Time | undefined>();
  const [breakTime4, setBreakTime4] = useState<Time | undefined>();
  const [breakTime5, setBreakTime5] = useState<Time | undefined>();
  const [breakTime6, setBreakTime6] = useState<Time | undefined>();
  const [breakTime7, setBreakTime7] = useState<Time | undefined>();
  const [breakTime8, setBreakTime8] = useState<Time | undefined>();

  const [isActiveBreaking1, setIsActiveBreaking1] = useState(false);
  const [isActiveBreaking2, setIsActiveBreaking2] = useState(false);
  const [isActiveBreaking3, setIsActiveBreaking3] = useState(false);
  const [isActiveBreaking4, setIsActiveBreaking4] = useState(false);

  const [buttonText, setButtonText] = useState('not working.');
  const [breakButtonText, setBreakButtonText] = useState('Off break');

  const [breakTimeSum, setBreakTimeSum] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Get time
    setDate(date);

    getElapsedTime();
  }, [date]);

  const workStartClear = () => {
    setWorkStartTime(undefined);
    getElapsedTime();
  };
  const workEndClear = () => {
    console.log('test');
    setWorkEndTime(undefined);
    getElapsedTime();
  };
  const break1Clear = () => {
    setBreakTime1(undefined);
    setBreakTime2(undefined);
  };
  const break2Clear = () => {
    setBreakTime3(undefined);
    setBreakTime4(undefined);
  };
  const break3Clear = () => {
    setBreakTime5(undefined);
    setBreakTime6(undefined);
  };
  const break4Clear = () => {
    setBreakTime7(undefined);
    setBreakTime8(undefined);
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

  const setTime = (index: number, time: Time) => {
    switch (index) {
      case 0:
        setWorkStartTime(time);
        break;
      case 1:
        setWorkEndTime(time);
        break;
      case 2:
        setBreakTime1(time);
        break;
      case 3:
        setBreakTime2(time);
        break;
      case 4:
        setBreakTime3(time);
        break;
      case 5:
        setBreakTime4(time);
        break;
      case 6:
        setBreakTime5(time);
        break;
      case 7:
        setBreakTime6(time);
        break;
      case 8:
        setBreakTime7(time);
        break;
      case 9:
        setBreakTime8(time);
        break;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    // arg1
    // 0 = 開始時間、setWorkStartTime
    // 1 = 終了時間、setWorkEndTime
    // 2 = 休憩時間①
    // 3 = 休憩時間①
    // 4 = 休憩時間②
    // 5 = 休憩時間②
    // 6 = 休憩時間③
    // 7 = 休憩時間③
    // 8 = 休憩時間④
    // 9 = 休憩時間④

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

    if (formattedVal.length === 5 && formattedVal.includes(':')) {
      const newStr = formattedVal.replace(/:/g, '');
      const hour = newStr.substr(0, 2);
      const minute = newStr.substr(2, 2);
      const time: Time = { h: Number(hour), m: Number(minute), s: 0 };
      setTime(index, time);
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

  useEffect(() => {
    sortBreakTime();
    if (breakTime1 || breakTime2) {
      setIsActiveBreaking1(true);
    } else {
      setIsActiveBreaking1(false);
    }
    if (breakTime3 || breakTime4) {
      setIsActiveBreaking2(true);
    } else {
      setIsActiveBreaking2(false);
    }
    if (breakTime5 || breakTime6) {
      setIsActiveBreaking3(true);
    } else {
      setIsActiveBreaking3(false);
    }
    if (breakTime7 || breakTime8) {
      setIsActiveBreaking4(true);
    } else {
      setIsActiveBreaking4(false);
    }
  }, [
    breakTime1,
    breakTime2,
    breakTime3,
    breakTime4,
    breakTime5,
    breakTime6,
    breakTime7,
    breakTime8,
  ]);

  const calBreakTime = () => {
    setBreakTimeSum();
  };

  const sortBreakTime = (): number => {
    // 整理する
    type TimeRange = {
      start: Time | undefined;
      end: Time | undefined;
    };
    let a: TimeRange = { start: breakTime1, end: breakTime2 };
    let b: TimeRange = { start: breakTime3, end: breakTime4 };
    let c: TimeRange = { start: breakTime5, end: breakTime6 };
    let d: TimeRange = { start: breakTime7, end: breakTime8 };
    let timeRanges: TimeRange[] = [a, b, c, d];

    let filteredTimeRanges: TimeRange[] = timeRanges
      .filter((timeRange) => timeRange.start !== undefined || timeRange.end !== undefined)
      .map((timeRange) => {
        return {
          start: timeRange.start!,
          end: timeRange.end!,
        };
      });

    setBreakTime1(filteredTimeRanges[0] ? filteredTimeRanges[0].start : undefined);
    setBreakTime2(filteredTimeRanges[0] ? filteredTimeRanges[0].end : undefined);
    setBreakTime3(filteredTimeRanges[1] ? filteredTimeRanges[1].start : undefined);
    setBreakTime4(filteredTimeRanges[1] ? filteredTimeRanges[1].end : undefined);
    setBreakTime5(filteredTimeRanges[2] ? filteredTimeRanges[2].start : undefined);
    setBreakTime6(filteredTimeRanges[2] ? filteredTimeRanges[2].end : undefined);
    setBreakTime7(filteredTimeRanges[3] ? filteredTimeRanges[3].start : undefined);
    setBreakTime8(filteredTimeRanges[3] ? filteredTimeRanges[3].end : undefined);

    let index: number = filteredTimeRanges.length;
    // 休憩じゃない状態→休憩
    // 開始を見る
    if (!isBreaking) {
    }
    // 休憩→休憩じゃない状態
    // 終了を見る
    else {
      if (index > 0) {
        if (!filteredTimeRanges[index - 1].end) index--;
      }
    }

    return index;
  };

  const setBreakTime = () => {
    // 整理する
    let index = sortBreakTime();

    switch (index) {
      case 0:
        {
          if (!isBreaking) {
            setBreakTime1({ h: h, m: m, s: s });
          } else {
            setBreakTime2({ h: h, m: m, s: s });
          }
        }
        break;
      case 1:
        {
          if (!isBreaking) {
            setBreakTime3({ h: h, m: m, s: s });
          } else {
            setBreakTime4({ h: h, m: m, s: s });
          }
        }
        break;
      case 2:
        {
          if (!isBreaking) {
            setBreakTime5({ h: h, m: m, s: s });
          } else {
            setBreakTime6({ h: h, m: m, s: s });
          }
        }
        break;
      case 3:
        {
          if (!isBreaking) {
            setBreakTime7({ h: h, m: m, s: s });
          } else {
            setBreakTime8({ h: h, m: m, s: s });
          }
        }
        break;
    }
  };

  const handleClick2 = () => {
    if (isBreaking) {
      setBreakButtonText('Off break');
    } else {
      setBreakButtonText('On break');
    }
    setBreakTime();
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
            value={formatTime(workStartTime)}
            required
            minLength={parseInt('4')}
            maxLength={parseInt('5')}
            onChange={(e) => handleChange(e, 0)}
          />
        </div>
        <button className="ui tiny icon button" onClick={workStartClear}>
          <i aria-hidden="true" className="undo icon"></i>
        </button>
      </div>
      {isActiveBreaking1 && (
        <div>
          <label htmlFor="name">休憩時間①:</label>
          <div className="ui mini input">
            <input
              type="text"
              id="startTime"
              name="name"
              value={formatTime(breakTime1)}
              required
              minLength={parseInt('4')}
              maxLength={parseInt('5')}
              style={{ width: '75px' }}
              onChange={(e) => handleChange(e, 2)}
            />
          </div>
          <label htmlFor="name">〜</label>
          <div className="ui mini input">
            <input
              type="text"
              id="startTime"
              name="name"
              value={formatTime(breakTime2)}
              required
              minLength={parseInt('4')}
              maxLength={parseInt('5')}
              style={{ width: '75px' }}
              onChange={(e) => handleChange(e, 3)}
            />
          </div>
          <button className="ui tiny icon button" onClick={break1Clear}>
            <i aria-hidden="true" className="undo icon"></i>
          </button>
        </div>
      )}
      {isActiveBreaking2 && (
        <div>
          <label htmlFor="name">休憩時間②:</label>
          <div className="ui mini input">
            <input
              type="text"
              id="startTime"
              name="name"
              value={formatTime(breakTime3)}
              required
              minLength={parseInt('4')}
              maxLength={parseInt('5')}
              style={{ width: '75px' }}
              onChange={(e) => handleChange(e, 4)}
            />
          </div>
          <label htmlFor="name">〜</label>
          <div className="ui mini input">
            <input
              type="text"
              id="startTime"
              name="name"
              value={formatTime(breakTime4)}
              required
              minLength={parseInt('4')}
              maxLength={parseInt('5')}
              style={{ width: '75px' }}
              onChange={(e) => handleChange(e, 5)}
            />
          </div>
          <button className="ui tiny icon button" onClick={break2Clear}>
            <i aria-hidden="true" className="undo icon"></i>
          </button>
        </div>
      )}
      {isActiveBreaking3 && (
        <div>
          <label htmlFor="name">休憩時間③:</label>
          <div className="ui mini input">
            <input
              type="text"
              id="startTime"
              name="name"
              value={formatTime(breakTime5)}
              required
              minLength={parseInt('4')}
              maxLength={parseInt('5')}
              style={{ width: '75px' }}
              onChange={(e) => handleChange(e, 6)}
            />
          </div>
          <label htmlFor="name">〜</label>
          <div className="ui mini input">
            <input
              type="text"
              id="startTime"
              name="name"
              value={formatTime(breakTime6)}
              required
              minLength={parseInt('4')}
              maxLength={parseInt('5')}
              style={{ width: '75px' }}
              onChange={(e) => handleChange(e, 7)}
            />
          </div>
          <button className="ui tiny icon button" onClick={break3Clear}>
            <i aria-hidden="true" className="undo icon"></i>
          </button>
        </div>
      )}
      {isActiveBreaking4 && (
        <div>
          <label htmlFor="name">休憩時間④:</label>
          <div className="ui mini input">
            <input
              type="text"
              id="startTime"
              name="name"
              value={formatTime(breakTime7)}
              required
              minLength={parseInt('4')}
              maxLength={parseInt('5')}
              style={{ width: '75px' }}
              onChange={(e) => handleChange(e, 8)}
            />
          </div>
          <label htmlFor="name">〜</label>
          <div className="ui mini input">
            <input
              type="text"
              id="startTime"
              name="name"
              value={formatTime(breakTime8)}
              required
              minLength={parseInt('4')}
              maxLength={parseInt('5')}
              style={{ width: '75px' }}
              onChange={(e) => handleChange(e, 9)}
            />
          </div>
          <button className="ui tiny icon button" onClick={break4Clear}>
            <i aria-hidden="true" className="undo icon"></i>
          </button>
        </div>
      )}
      <div>
        <label htmlFor="name">終了時間:</label>
        <div className="ui mini input">
          <input
            type="text"
            id="endTime"
            name="name"
            value={formatTime(workEndTime)}
            required
            minLength={parseInt('4')}
            maxLength={parseInt('5')}
            onChange={(e) => handleChange(e, 1)}
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