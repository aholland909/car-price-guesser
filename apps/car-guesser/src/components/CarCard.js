import React from "react";
import axios from "axios";
import Answer from "./Answer.js";

function CarCard() {
  const [data, setData] = React.useState([]);
  const [current, setCurrent] = React.useState([]);
  const [index, setIndex] = React.useState([]);
  const [guess, setGuess] = React.useState("");
  const [showAnswer, setShowAnswer] = React.useState(false);

  React.useEffect(() => {
    axios.get(`randomcar/`).then((res) => {
      setData(res.data);
      setIndex(0);
      setCurrent(setCar(res.data, 0));
    });
  }, []);

  function setCar(data, index) {
    if (index !== data.length - 1) {
      setIndex(index + 1);
    } else {
      window.location.reload(false);
    }
    return data[index];
  }

  function handleGuess(event) {
    if (event.target.value) {
      if (isNaN(event.target.value)) {
        alert("Please enter a number!");
      } else {
        return setGuess(parseInt(event.target.value.replace(/\D/, "")));
      }
    }
    setGuess("");
  }

  function handleEnter(event) {
    if (event.keyCode === 13) {
      if (!showAnswer) {
        submit();
      } else {
        gotoNext();
      }
    }
  }

  function submit() {
    setShowAnswer(!showAnswer);
    return showAnswer;
  }

  function gotoNext() {
    setGuess("");
    setCurrent(setCar(data, index));
    setShowAnswer(!showAnswer);
  }

  function formatSoldDate(date) {
    if (date) {
      const splitDate = date.split(" ")[0];
      return new Date(splitDate).toLocaleDateString()
    }
  }

  return (
    <div>
      <h1>Guess the price!</h1>
      {<p>{current.title}</p>}
      {<p>Sold on {formatSoldDate(current.dateSold)}</p>}
      <img src={current.image} className="car-image" alt={current.title} />
      <div className="App-input">
        <label>
          Price:
          <input
            value={guess}
            onChange={(event) => handleGuess(event)}
            onKeyDown={(event) => handleEnter(event)}
            inputmode="numeric"
            pattern="[0-9]*"
            autocomplete="one-time-code"
          ></input>
        </label>
        <button onClick={showAnswer ? gotoNext : submit}>
          {showAnswer ? "Next" : "Guess"}
        </button>
      </div>
      <Answer showAnswer={showAnswer} current={current} guess={guess} />
    </div>
  );
}

export default CarCard;
