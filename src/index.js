import ReactDOM from "react-dom";
import React from "react";
import useStateMachine from "./useStateMachine";
import "bulma/css/bulma.css";
import "./styles.css";

const babyAnnouncement = {
  initial: "introduction",
  states: {
    introduction: {
      render: () => (
        <h1>
          It's a big day! We'd love to share why, but first we need a name!
        </h1>
      ),
      NEXT: "tease_date"
    },
    tease_date: {
      PREVIOUS: "introduction",
      // message: `Hey {{name}}, today is {{date}} and {{diffDate}} something miraculous will take place.`,
      NEXT: "announcement"
    },
    announcement: {
      PREVIOUS: "tease_date",
      // message: "We're having a baby!",
      NEXT: "tease_sex"
    },
    tease_sex: {
      PREVIOUS: "announcement",
      // message: "It's a {{revealButton}}",
      NEXT: "celebrate"
    },
    celebrate: {
      PREVIOUS: "tease_sex"
      // message: "It's a boy!"
    }
  }
};

function App() {
  const [currentMachine, transitionTo] = useStateMachine(
    babyAnnouncement,
    babyAnnouncement.initial
  );

  return (
    <div className="container">
      <div className="family">
        <div className="card">
          <div className="card-content" style={{ minHeight: "200px" }}>
            {currentMachine.render ? currentMachine.render() : null}
          </div>
          <footer className="card-footer">
            <a
              onClick={() => transitionTo("PREVIOUS")}
              className="card-footer-item"
            >
              Previous
            </a>
            <a
              onClick={() => transitionTo("NEXT")}
              className="card-footer-item"
            >
              Next
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
