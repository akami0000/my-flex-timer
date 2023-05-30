import './App.css';
import React from 'react';
import { useEffect, useState, useCallback, useRef } from 'react';
import 'semantic-ui-css/semantic.min.css';

interface Time {
  h: number;
  m: number;
  s: number;
}

interface s_Time {
  h: string;
  m: string;
  s: string;
}

export const App = () => {
  let newDate = new Date();
  const [date, setDate] = useState<Time>({ h: 0, m: 0, s: 0 });
  const [isWorking, setIsWorking] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [isTimer, setIsTimer] = useState(true);

  const [targetH, setTargetH] = useState<number | undefined>(8);
  const [targetM, setTargetM] = useState<number | undefined>(0);

  const [elapsedTime, setElapsedTime] = useState<s_Time | undefined>();

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

  const [s_startTime, setS_startTime] = useState<string>();
  const [s_endTime, setS_endTime] = useState<string>();
  const [s_breakTime1, setS_BreakTime1] = useState<string>();
  const [s_breakTime2, setS_BreakTime2] = useState<string>();
  const [s_breakTime3, setS_BreakTime3] = useState<string>();
  const [s_breakTime4, setS_BreakTime4] = useState<string>();
  const [s_breakTime5, setS_BreakTime5] = useState<string>();
  const [s_breakTime6, setS_BreakTime6] = useState<string>();
  const [s_breakTime7, setS_BreakTime7] = useState<string>();
  const [s_breakTime8, setS_BreakTime8] = useState<string>();

  const [isActiveBreaking1, setIsActiveBreaking1] = useState(false);
  const [isActiveBreaking2, setIsActiveBreaking2] = useState(false);
  const [isActiveBreaking3, setIsActiveBreaking3] = useState(false);
  const [isActiveBreaking4, setIsActiveBreaking4] = useState(false);

  const [breakTimeSum, setBreakTimeSum] = useState<Time | undefined>();

  useEffect(() => {
    setInterval(() => {
      let newDate = new Date();
      setDate({
        h: newDate.getHours(),
        m: newDate.getMinutes(),
        s: newDate.getSeconds(),
      });
    }, 1000);
  }, []);

  useEffect(() => {
    getElapsedTime();
    calcBreakTime();
  }, [date]);

  useEffect(() => {
    setS_startTime(formatTime(workStartTime));
  }, [workStartTime]);

  useEffect(() => {
    setS_endTime(formatTime(workEndTime));
  }, [workEndTime]);

  useEffect(() => {
    setS_BreakTime1(formatTime(breakTime1));
  }, [breakTime1]);

  useEffect(() => {
    setS_BreakTime2(formatTime(breakTime2));
  }, [breakTime2]);

  useEffect(() => {
    setS_BreakTime3(formatTime(breakTime3));
  }, [breakTime3]);

  useEffect(() => {
    setS_BreakTime4(formatTime(breakTime4));
  }, [breakTime4]);

  useEffect(() => {
    setS_BreakTime5(formatTime(breakTime5));
  }, [breakTime5]);

  useEffect(() => {
    setS_BreakTime6(formatTime(breakTime6));
  }, [breakTime6]);

  useEffect(() => {
    setS_BreakTime7(formatTime(breakTime7));
  }, [breakTime7]);

  useEffect(() => {
    setS_BreakTime8(formatTime(breakTime8));
  }, [breakTime8]);

  const allClear = () => {
    if (isWorking) {
      handleClick1();
    }
    if (isBreaking) {
      handleClick2();
    }
    setTargetH(8);
    setTargetM(0);

    setWorkStartTime(undefined);
    setWorkEndTime(undefined);
    setBreakTime1(undefined);
    setBreakTime2(undefined);
    setBreakTime3(undefined);
    setBreakTime4(undefined);
    setBreakTime5(undefined);
    setBreakTime6(undefined);
    setBreakTime7(undefined);
    setBreakTime8(undefined);
  };

  const workStartClear = () => {
    setWorkStartTime(undefined);
  };
  const workEndClear = () => {
    setWorkEndTime(undefined);
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

  function calcTimeDifference(start: Time, end: Time): Time {
    let elapsedH = end.h - start.h;
    let elapsedM = end.m - start.m;
    let elapsedS = end.s - start.s;

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

    return { h: elapsedH, m: elapsedM, s: elapsedS };
  }

  function calcTimeDifferenceSubtractBreakTime(start: Time, end: Time): s_Time {
    let elapsedH = end.h - start.h;
    let elapsedM = end.m - start.m;
    let elapsedS = end.s - start.s;

    if (breakTimeSum) {
      elapsedH -= breakTimeSum.h;
      elapsedM -= breakTimeSum.m;
      elapsedS -= breakTimeSum.s;
    }
    let sec = elapsedH * 3600 + elapsedM * 60 + elapsedS;
    if (sec < 0) {
      // let sec = elapsedH * 3600 + elapsedM * 60 + elapsedS;
      // console.log(sec);
      // elapsedH = Math.floor(sec / 3600);
      // elapsedM = Math.abs(Math.floor((sec % 3600) / 60));
      // elapsedS = Math.abs(sec % 60);

      const absTotalSeconds: number = Math.abs(sec);
      elapsedM = Math.floor(absTotalSeconds / 60);
      elapsedS = absTotalSeconds % 60;
      elapsedH = Math.floor(elapsedM / 60);

      // if (elapsedS < 0) {
      //   elapsedS += 60;
      //   elapsedM--;
      // }
      // if (elapsedM < 0) {
      //   elapsedM += 60;
      //   elapsedH--;
      // }
      // if (elapsedH < 0) {
      //   elapsedH += 24;
      // }
      return {
        h: '-' + elapsedH.toString().padStart(2, '0'),
        m: elapsedM.toString().padStart(2, '0'),
        s: elapsedS.toString().padStart(2, '0'),
      };
    } else {
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
      return {
        h: elapsedH.toString().padStart(2, '0'),
        m: elapsedM.toString().padStart(2, '0'),
        s: elapsedS.toString().padStart(2, '0'),
      };
    }
  }

  function getElapsedTime() {
    if (!workStartTime) {
      setElapsedTime(undefined);
      return;
    }

    if (!workEndTime) {
      let time = calcTimeDifferenceSubtractBreakTime(
        { h: workStartTime.h, m: workStartTime.m, s: workStartTime.s },
        date
      );
      setElapsedTime({ h: time.h, m: time.m, s: time.s });
      console.log('経過時間　h:' + time.h + 'm:' + time.m + 's:' + time.s);
    } else {
      let time = calcTimeDifferenceSubtractBreakTime(
        { h: workStartTime.h, m: workStartTime.m, s: workStartTime.s },
        { h: workEndTime.h, m: workEndTime.m, s: workEndTime.s }
      );
      setElapsedTime({ h: time.h, m: time.m, s: time.s });
      console.log('経過時間　h:' + time.h + 'm:' + time.m + 's:' + time.s);
    }
  }

  const formatTime = (time: Time | undefined) => {
    if (!time) {
      return '--:--';
    }
    const formattedHour = String(time.h).padStart(2, '0');
    const formattedMinutes = String(time.m).padStart(2, '0');
    return `${formattedHour}:${formattedMinutes}`;
  };

  const formatTimeSec = (time: Time | undefined) => {
    if (!time) {
      return '--:--';
    }
    const formattedHour = String(time.h).padStart(2, '0');
    const formattedMinutes = String(time.m).padStart(2, '0');
    const formattedSeconds = String(time.s).padStart(2, '0');
    return `${formattedHour}:${formattedMinutes}:${formattedSeconds}`;
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

  const setText = (index: number, val: string) => {
    switch (index) {
      case 0:
        setS_startTime(val);
        break;
      case 1:
        setS_endTime(val);
        break;
      case 2:
        setS_BreakTime1(val);
        break;
      case 3:
        setS_BreakTime2(val);
        break;
      case 4:
        setS_BreakTime3(val);
        break;
      case 5:
        setS_BreakTime4(val);
        break;
      case 6:
        setS_BreakTime5(val);
        break;
      case 7:
        setS_BreakTime6(val);
        break;
      case 8:
        setS_BreakTime7(val);
        break;
      case 9:
        setS_BreakTime8(val);
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
    setText(index, formattedVal);

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
      setWorkEndTime(date);
    } else {
      setWorkStartTime(date);
      setBreakTime1({ h: 12, m: 0, s: 0 });
      setBreakTime2({ h: 13, m: 0, s: 0 });
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
    calcBreakTime();
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

  const calcBreakTime = () => {
    if (!workStartTime) {
      setBreakTimeSum(undefined);
      return;
    }

    let timeSec = 0;

    if (breakTime1 && breakTime2) {
      let time = calcTimeDifference(breakTime1, breakTime2);
      timeSec += time.h * 3600 + time.m * 60 + time.s;
    } else if (breakTime1 && isBreaking) {
      let time = calcTimeDifference(breakTime1, date);
      timeSec += time.h * 3600 + time.m * 60 + time.s;
    }
    if (breakTime3 && breakTime4) {
      let time = calcTimeDifference(breakTime3, breakTime4);
      timeSec += time.h * 3600 + time.m * 60 + time.s;
    } else if (breakTime3 && isBreaking) {
      let time = calcTimeDifference(breakTime3, date);
      timeSec += time.h * 3600 + time.m * 60 + time.s;
    }
    if (breakTime5 && breakTime6) {
      let time = calcTimeDifference(breakTime5, breakTime6);
      timeSec += time.h * 3600 + time.m * 60 + time.s;
    } else if (breakTime5 && isBreaking) {
      let time = calcTimeDifference(breakTime5, date);
      timeSec += time.h * 3600 + time.m * 60 + time.s;
    }
    if (breakTime7 && breakTime8) {
      let time = calcTimeDifference(breakTime7, breakTime8);
      timeSec += time.h * 3600 + time.m * 60 + time.s;
    } else if (breakTime7 && isBreaking) {
      let time = calcTimeDifference(breakTime7, date);
      timeSec += time.h * 3600 + time.m * 60 + time.s;
    }

    const hours = Math.floor(timeSec / 3600);
    const minutes = Math.floor((timeSec % 3600) / 60);
    const secondsLeft = timeSec % 60;

    console.log('休憩時間　h:' + hours + 'm:' + minutes + 's:' + secondsLeft);

    if (timeSec === 0) {
      setBreakTimeSum(undefined);
    } else {
      setBreakTimeSum({ h: hours, m: minutes, s: secondsLeft });
    }
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
            setBreakTime1(date);
          } else {
            setBreakTime2(date);
          }
        }
        break;
      case 1:
        {
          if (!isBreaking) {
            setBreakTime3(date);
          } else {
            setBreakTime4(date);
          }
        }
        break;
      case 2:
        {
          if (!isBreaking) {
            setBreakTime5(date);
          } else {
            setBreakTime6(date);
          }
        }
        break;
      case 3:
        {
          if (!isBreaking) {
            setBreakTime7(date);
          } else {
            setBreakTime8(date);
          }
        }
        break;
    }
  };

  const handleClick2 = () => {
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
    let hour: number = workStartTime ? workStartTime.h : date.h;
    let minute: number = workStartTime ? workStartTime.m : date.m;
    let second: number = workStartTime ? workStartTime.s : date.s;

    let addHour: number = Number(targetH);
    let addMinute: number = Number(targetM);
    let addSecond: number = 0;
    if (breakTimeSum) {
      addHour += breakTimeSum.h;
      addMinute += breakTimeSum.m;
      addSecond += breakTimeSum.s;
    }
    // 1時間 = 60分、1分 = 60秒として、分と秒について計算
    var totalSecond = (hour + addHour) * 3600 + (minute + addMinute) * 60 + second + addSecond;
    var newHour = Math.floor(totalSecond / 3600);
    var newMinute = Math.floor((totalSecond % 3600) / 60);
    var newSecond = totalSecond % 60;

    // 24時間以上の場合は、0〜23時の範囲に収める
    newHour = newHour % 24;

    // 時、分、秒の桁数が1桁の場合、先頭に0をつける
    var newHour2 = ('00' + newHour).slice(-2);
    var newMinute2 = ('00' + newMinute).slice(-2);
    var newSecond2 = ('00' + newSecond).slice(-2);

    return `${newHour2}:${newMinute2}:${newSecond2}`;
  }

  const tabButtonClicked = (target: boolean) => {
    if (target) setIsTimer(true);
    else setIsTimer(false);
  };

  const isTargetOn = true;

  return (
    <div className="container">
      <div
        className="box"
        style={{
          textAlign: 'right',
        }}
      >
        <div className="tabBotton">
          {isTargetOn && (
            <div>
              <button
                className={isTimer ? 'ui circular red button' : 'ui circular basic button'}
                style={{
                  marginRight: '10px',
                  marginLeft: '10px',
                }}
                onClick={() => tabButtonClicked(true)}
              >
                TIMER
              </button>
              <button
                className={isTimer ? 'ui circular basic button' : 'ui circular red button'}
                style={{
                  marginRight: '10px',
                  marginLeft: '10px',
                }}
                onClick={() => tabButtonClicked(false)}
              >
                TARGET
              </button>
            </div>
          )}
        </div>
        <button className="ui button" onClick={allClear}>
          Reset
        </button>
      </div>
      <div className="content">
        <div
          style={
            {
              // marginTop: '50px',
            }
          }
        >
          <p
            style={{
              fontSize: isWorking ? '14px' : '54px',
            }}
          >
            {date.h.toString().padStart(2, '0')}:{date.m.toString().padStart(2, '0')}
            {isWorking ? '' : ':' + date.s.toString().padStart(2, '0')}
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: isWorking ? '54px' : '14px',
            }}
          >
            {elapsedTime ? `${elapsedTime.h}:${elapsedTime.m}:${elapsedTime.s}` : '--:--:--'}
          </p>
        </div>
        <div>
          <button
            id="toggleButton1"
            className={isWorking ? 'ui green button' : 'ui  gray button'}
            onClick={handleClick1}
          >
            {isWorking ? 'working!' : 'not working.'}
          </button>
          <button
            id="toggleButton2"
            className={isBreaking ? 'ui green button' : 'ui  gray button'}
            disabled={!isWorking}
            onClick={handleClick2}
          >
            {isBreaking ? 'On break' : 'Off break'}
          </button>
        </div>
        <div className="top">
          <label htmlFor="name" className="right">
            開始時間:
          </label>
          <div className="ui mini input">
            <input
              type="text"
              id="startTime"
              name="name"
              value={s_startTime}
              required
              minLength={parseInt('4')}
              maxLength={parseInt('5')}
              onChange={(e) => handleChange(e, 0)}
              style={{
                width: '75px',
                textAlign: 'center',
              }}
            />
          </div>
          <button className="ui tiny icon button" onClick={workStartClear}>
            <i aria-hidden="true" className="undo icon"></i>
          </button>
        </div>
        {isActiveBreaking1 && (
          <div className="top">
            <label htmlFor="name" className="right">
              休憩時間①:
            </label>
            <div className="ui mini input">
              <input
                type="text"
                name="name"
                value={s_breakTime1}
                required
                minLength={parseInt('4')}
                maxLength={parseInt('5')}
                style={{ width: '75px', textAlign: 'center' }}
                onChange={(e) => handleChange(e, 2)}
              />
            </div>
            <label htmlFor="name">〜</label>
            <div className="ui mini input">
              <input
                type="text"
                name="name"
                value={s_breakTime2}
                required
                minLength={parseInt('4')}
                maxLength={parseInt('5')}
                style={{ width: '75px', textAlign: 'center' }}
                onChange={(e) => handleChange(e, 3)}
              />
            </div>
            <button className="ui tiny icon button" onClick={break1Clear}>
              <i aria-hidden="true" className="undo icon"></i>
            </button>
          </div>
        )}
        {isActiveBreaking2 && (
          <div className="top">
            <label htmlFor="name" className="right">
              休憩時間②:
            </label>
            <div className="ui mini input">
              <input
                type="text"
                name="name"
                value={s_breakTime3}
                required
                minLength={parseInt('4')}
                maxLength={parseInt('5')}
                style={{ width: '75px', textAlign: 'center' }}
                onChange={(e) => handleChange(e, 4)}
              />
            </div>
            <label htmlFor="name">〜</label>
            <div className="ui mini input">
              <input
                type="text"
                name="name"
                value={s_breakTime4}
                required
                minLength={parseInt('4')}
                maxLength={parseInt('5')}
                style={{ width: '75px', textAlign: 'center' }}
                onChange={(e) => handleChange(e, 5)}
              />
            </div>
            <button className="ui tiny icon button" onClick={break2Clear}>
              <i aria-hidden="true" className="undo icon"></i>
            </button>
          </div>
        )}
        {isActiveBreaking3 && (
          <div className="top">
            <label htmlFor="name" className="right">
              休憩時間③:
            </label>
            <div className="ui mini input">
              <input
                type="text"
                name="name"
                value={s_breakTime5}
                required
                minLength={parseInt('4')}
                maxLength={parseInt('5')}
                style={{ width: '75px', textAlign: 'center' }}
                onChange={(e) => handleChange(e, 6)}
              />
            </div>
            <label htmlFor="name">〜</label>
            <div className="ui mini input">
              <input
                type="text"
                name="name"
                value={s_breakTime6}
                required
                minLength={parseInt('4')}
                maxLength={parseInt('5')}
                style={{ width: '75px', textAlign: 'center' }}
                onChange={(e) => handleChange(e, 7)}
              />
            </div>
            <button className="ui tiny icon button" onClick={break3Clear}>
              <i aria-hidden="true" className="undo icon"></i>
            </button>
          </div>
        )}
        {isActiveBreaking4 && (
          <div className="top">
            <label htmlFor="name" className="right">
              休憩時間④:
            </label>
            <div className="ui mini input">
              <input
                type="text"
                name="name"
                value={s_breakTime7}
                required
                minLength={parseInt('4')}
                maxLength={parseInt('5')}
                style={{ width: '75px', textAlign: 'center' }}
                onChange={(e) => handleChange(e, 8)}
              />
            </div>
            <label htmlFor="name">〜</label>
            <div className="ui mini input">
              <input
                type="text"
                name="name"
                value={s_breakTime8}
                required
                minLength={parseInt('4')}
                maxLength={parseInt('5')}
                style={{ width: '75px', textAlign: 'center' }}
                onChange={(e) => handleChange(e, 9)}
              />
            </div>
            <button className="ui tiny icon button" onClick={break4Clear}>
              <i aria-hidden="true" className="undo icon"></i>
            </button>
          </div>
        )}
        <div className="top bottom">
          <label htmlFor="name" className="right">
            終了時間:
          </label>
          <div className="ui mini input">
            <input
              type="text"
              id="endTime"
              name="name"
              value={s_endTime}
              required
              minLength={parseInt('4')}
              maxLength={parseInt('5')}
              onChange={(e) => handleChange(e, 1)}
              style={{
                width: '75px',
                textAlign: 'center',
              }}
            />
          </div>
          <button className="ui tiny icon button" onClick={workEndClear}>
            <i aria-hidden="true" className="undo icon"></i>
          </button>
        </div>
        {isTargetOn && (
          <div>
            <div
              className="box"
              style={{
                borderTop: '1px solid gray',
              }}
            >
              <label htmlFor="name" className="right">
                目標時間:
              </label>
              <div className="ui mini input">
                <input
                  type="text"
                  name="name"
                  value={targetH}
                  required
                  minLength={parseInt('1')}
                  maxLength={parseInt('2')}
                  style={{ width: '50px', textAlign: 'center' }}
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
                  style={{ width: '50px', textAlign: 'center' }}
                  onChange={handleChangeTargetM}
                />
              </div>
              <label htmlFor="name">m</label>
            </div>
            <div>
              <label htmlFor="name">{addTime()}</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};