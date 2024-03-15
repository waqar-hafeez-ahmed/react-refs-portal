import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer    //we wont use variable, as it would not work with multiple components.
// unlike useState, useRef wont rerender the component, but it will  keep its value between renders.

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  const dialog = useRef(); //For controlling forward ref.

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // we will use a ref and create a pointer to setTimout for clearing out timer. It will help us to clear timeout that wasnot possible by creating variable pointer for setTimeout.

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open(); //reference from the imperative handle.

    //Game over.
  }

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };
  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 10);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(timer.current);
    dialog.current.open();
  };
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remianingTime={timeRemaining}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time Running ..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
