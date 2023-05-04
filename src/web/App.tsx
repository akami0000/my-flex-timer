import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';

export const App = () => {
  const [date, setDate] = useState(new Date());
  const time = [date.getHours(), date.getMinutes(), date.getSeconds()];
  const [h, m, s] = time;

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Get time
    const time = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const [h, m, s] = time;

    // Get angles
    const degHour = h * (360 / 12) + m * (360 / 12 / 60);
    const degMin = m * (360 / 60) + s * (360 / 60 / 60);
    const degSec = s * (360 / 60);
  }, [date]);
  return (
    <div className="container">
      {h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:
      {s.toString().padStart(2, '0')}
      <h1>Hello!!</h1>
    </div>
  );
};