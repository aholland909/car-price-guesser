import React from "react";

function Answer(props) {
  const showAnswer = props.showAnswer;
  const link = `https://collectingcars.com/for-sale/${props.current.slug}`;
  const price = props.current.price;
  const guess = props.guess;

  function returnText(text, price) {
    return (
      <div>
        <p>
          {text} £{price}
        </p>
        <a href={link}>Link</a>
      </div>
    );
  }

  function QuizAnswer() {
    if (guess === price) {
      return returnText(`You guessed the price!`, price);
    } else if (guess + 2500 > price && price > guess - 2500) {
      return returnText(`Really close! The price was `, price);
    } else if (guess + guess * 0.5 > price && price > guess - guess * 0.5) {
      return returnText(`Close but no cigar, the price was `, price);
    } else {
      return returnText(`Way off! The price was:`, price);
    }
  }

  return <>{showAnswer && QuizAnswer()}</>;
}

export default Answer;
