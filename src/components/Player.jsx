import { useState, useRef } from "react";

export default function Player() {
  //As useState, refs does not re-render the components. They build connection only when re-rendered.
  const input = useRef();
  const [enteredPlayer, setEnteredPlayer] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  //We will use refs instead of two way binding to minimize our code.

  // const [changeName, setChangeName] = useState(false);
  // const changeHandler = (event) => {
  //   setChangeName(false);
  //   setPlayerName(event.target.value);
  // };

  const handlePlayerName = () => {
    setEnteredPlayer(input.current.value);
    // To clear the input field. Though its not a good approach to manupulate dom directly. use refs to read data.
    input.current.value = "";
    setIsButtonDisabled(true);
  };

  const handleInputChange = () => {
    setIsButtonDisabled(input.current.value.trim() === "");
  };
  return (
    <section id="player">
      <h2>Welcome {enteredPlayer ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={input} onChange={handleInputChange} />
        <button onClick={handlePlayerName} disabled={isButtonDisabled}>
          Set Name
        </button>
      </p>
    </section>
  );
}
