import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

// we will use forward ref if we want to control it from a different component, and pas ref as a second argument to the function. And pass this get this ref from parent componets.

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remianingTime, onReset },
  ref
) {
  const dialog = useRef(); //creating a ref to detach dialog modal from timer challenge component.

  const userLost = remianingTime <= 0;
  const formattedTime = (remianingTime / 1000).toFixed(2);
  const score = Math.round((1 - remianingTime / (targetTime * 1000)) * 100);

  //useImperative handle will create a reference with  the parent component (TimerChallenge), but control the dialog modal completely here.
  //using this approach so if we change the dialog element with div, out code should work.
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your score {score}</h2>}
      <p>
        The target was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong> {formattedTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
