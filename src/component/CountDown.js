import React, { useState, useEffect } from 'react';

function Countdown(props) {
  const { initialHours: defaultHours, initialMinutes: defaultMinutes, initialSeconds: defaultSeconds } = props;
  const [hours, setHours] = useState(defaultHours);
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            if (hours > 0) {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              setIsRunning(false);
              clearInterval(intervalId);
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
    }, [hours, minutes, seconds, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours(defaultHours);
    setMinutes(defaultMinutes);
    setSeconds(defaultSeconds);
  };

  const handleHoursChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setHours(value);
    }
  };

  const handleMinutesChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0 && value < 60) {
      setMinutes(value);
    }
  };

  const handleSecondsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0 && value < 60) {
      setSeconds(value);
    }
  };

  return (
          <div className="countdown-container">
            <h1 style={{fontStyle: "italic", marginBottom: "-40px"}}>Countdown Timer</h1>
            <div className="hms">
              <div className="timer">
                <span className="timer-num">{`${hours.toString().padStart(2, '0')}`}</span>
                <span className="timer-text">HOURS</span>
              </div>
              <div className="timer">
                <span className="timer-num">{`${minutes.toString().padStart(2, '0')}`}</span>
                <span className="timer-text">MINUTES</span>
              </div>
              <div className={"timer"}>
                <span className="timer-num" style={{color: "#ee5486"}} >{`${seconds.toString().padStart(2, '0')}`}</span>
                <span className="timer-text">SECONDS</span>
              </div>

            </div>

            {!isRunning && (
                    <div className="input-container">
                      <div>
                        <label htmlFor="hours">Hours: </label>
                        <input type="number" className="input-field" id="hours" value={hours} onChange={handleHoursChange} />
                      </div>
                      <div>
                        <label htmlFor="minutes">Minutes: </label>
                        <input type="number" className="input-field" id="minutes" value={minutes} onChange={handleMinutesChange} />
                      </div>
                      <div>
                        <label htmlFor="seconds">Seconds: </label>
                        <input type="number" className="input-field" id="seconds" value={seconds} onChange={handleSecondsChange} />
                      </div>
                      <button className="button" style={{alignSelf: "center"}} onClick={handleStart}>Start</button>
                    </div>
                    )}
            {isRunning && (
                    <button className="button" onClick={handleStop}>Stop</button>
                    )}
            <button className="button" onClick={handleReset}>Reset</button>
          </div>
          );
}

export default Countdown;
