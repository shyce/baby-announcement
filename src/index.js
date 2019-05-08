import ReactDOM from "react-dom";
import React, { useState } from "react";
import "bulma/css/bulma.css";
import "./styles.css";

function App() {
  const [gender, setGender] = useState("Click here to reveal!");
  const [what, setWhat] = useState(false);

  function showGender() {
    setGender("Boy!");
  }

  function getBabyColor() {
    switch (gender) {
      case "Click here to reveal!":
        return "is-dark";
      case "Boy!":
        return "is-info";
      default:
        break;
    }
  }

  function answerWhat() {
    setWhat(true);
  }

  return (
    <div className="family">
      {what ? (
        <React.Fragment>
          <span>We're having a</span>
          <button
            className={`button ${getBabyColor()}`}
            onClick={() => showGender()}
          >
            {gender}
          </button>
        </React.Fragment>
      ) : (
        <span>
          Guess what everyone!?{" "}
          <button className="" onClick={() => answerWhat()}>
            What?!
          </button>
        </span>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
