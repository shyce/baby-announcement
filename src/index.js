import ReactDOM from "react-dom";
import React from "react";
import { differenceInDays, differenceInHours, differenceInMonths, subDays, subMonths } from "date-fns";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import useStateMachine from "./useStateMachine";
import Baby from './baby.png'
import "bulma/css/bulma.css";
import "./styles.css";

function countdown() {
  const result = [];
  const now = new Date();
  let future = new Date(2019, 8, 25);

  const months = differenceInMonths(future, now);
  if (months > 0) {
    result.push(`in ${months} months,`);
    future = subMonths(future, months);
  }

  const days = differenceInDays(future, now);
  if (days > 0) {
    result.push(`${days} days,`);
    future = subDays(future, days);
  }

  const hours = differenceInHours(future, now);
  if (hours > 0) {
    result.push(`and ${hours} hours`);
  }

  return result.join(' ');
}

const babyAnnouncement = {
  initial: "introduction",
  states: {
    introduction: {
      title: "Story time!",
      message:
        "It's a big day! We'd love to share why, but first we need a name!",
      render: (state, nextState) => {
        console.log(state, nextState);
        return (
          <React.Fragment>
            <h1 className="title is-1">{state.title}</h1>
            <h2 className="subtitle">{state.message}</h2>
            <input
              className="input"
              defaultValue={nextState.get("guestName")}
              onChange={e => nextState.set("guestName", e.target.value)}
            />
          </React.Fragment>
        );
      },
      PREVIOUS_BUTTON: null,
      NEXT: "tease_date",
      NEXT_BUTTON: "There, now what is it??",
      BACKGROUND: "skyblue"
    },
    tease_date: {
      PREVIOUS: "introduction",
      guestName: "",
      title: "Set your calendars!",
      subtitle: new Date("2019", "8", "25").toLocaleDateString(),
      render: (state, nextState) => {
        return (
          <React.Fragment>
            <h1 className="title is-1">{state.title}</h1>
            <h2 className="subtitle">{state.subtitle}</h2>
            <p>
              Hey {state.guestName || 'Stranger'}, today is {new Date().toLocaleString()} and {" "}
              {countdown()} something
              miraculous will take place.
            </p>
          </React.Fragment>
        );
      },
      PREVIOUS_BUTTON: "That's not my name.",
      NEXT: "announcement",
      NEXT_BUTTON: "Sounds... interesting. Go on.",
      BACKGROUND: "pink"
    },
    announcement: {
      title: "A frikkin baby!",
      subtitle: `I'm going to be a dad?`,
      render: state => {
        return (
          <React.Fragment>
            <h1 className="title is-1">{state.title}</h1>
            <h2 className="subtitle">{state.subtitle}</h2>
            <p>
              You heard right &mdash; {countdown()} <strong>A FRIKKIN BABY WILL BE HERE!</strong>
            </p>
          </React.Fragment>
        );
      },
      PREVIOUS: "tease_date",
      NEXT: "date_announcement",
      NEXT_BUTTON: "You could have just said it!",
      BACKGROUND: "skyblue",
    },
    date_announcement: {
      title: "That's not all!",
      subtitle: "You must be curious about the gender?!",
      message: "With so little time left, the answer is just a click away ...",
      render: state => {
        return (
          <React.Fragment>
            <h1 className="title is-1">{state.title}</h1>
            <h2 className="subtitle">{state.subtitle}</h2>
            <p>
              {state.message}
            </p>
          </React.Fragment>
        );
      },
      PREVIOUS: "announcement",
      NEXT: "tease_sex_1",
      NEXT_BUTTON: "You could have just said it!",
      BACKGROUND: "pink"
    },
    tease_sex_1: {
      PREVIOUS: "announcement",
      message: "It's a...",
      NEXT: "tease_sex_2",
      NEXT_BUTTON: "...really?",
      BACKGROUND: "skyblue"
    },
    tease_sex_2: {
      PREVIOUS: "tease_sex_1",
      message: "...a...",
      NEXT_BUTTON: "...",
      NEXT: "tease_sex_3",
      BACKGROUND: "pink"
    },
    tease_sex_3: {
      PREVIOUS: "tease_sex_2",
      message: "ACHOOO!",
      NEXT_BUTTON: "Cute. You done?",
      NEXT: "tease_sex_4",
      BACKGROUND: "skyblue"
    },
    tease_sex_4: {
      PREVIOUS: "tease_sex_3",
      message: "Wheh, that was a big sneeze.",
      NEXT_BUTTON: "Seriously!",
      NEXT: "celebrate",
      BACKGROUND: "ping"
    },
    celebrate: {
      PREVIOUS: "tease_sex_4",
      title: "Boy!",
      message:
        "On September 25th, a little baby boy is due to arrive that will change our lives forever. Due to our distance and work schedule, we are looking for help to host a baby shower. Please contact brianroyer@gmail.com if you would be interested.",
      render: state => {
        return (
          <React.Fragment>
            <h1 className="title is-1">{state.title}</h1>
            <h2 className="subtitle">{state.message}</h2>
            <img src={Baby} /><br />
            <small>This is actually our little boy!</small>
          </React.Fragment>
        );
      },
      CELEBRATE: true,
      PREVIOUS_BUTTON: "No way. Back it up.",
      BACKGROUND: "skyblue",
      NEXT_BUTTON: null
    }
  }
};

function App() {
  const [cm, transitionTo] = useStateMachine(
    babyAnnouncement,
    babyAnnouncement.initial
  );
  const { width, height } = useWindowSize();
  return (
    <React.Fragment>
      {cm.CELEBRATE && <Confetti width={width} height={height} />}
      <div
        className="family"
        style={{ background: cm.BACKGROUND ? cm.BACKGROUND : "#eee" }}
      >
        <div className="card" style={{ zIndex: 3 }}>
          <div className="card-content" style={{ minHeight: "200px" }}>
            {cm.render ? cm.render() : cm.message}
          </div>
          <footer className="card-footer">
            {cm.PREVIOUS_BUTTON !== null && (
              <a
                onClick={() => transitionTo("PREVIOUS")}
                className="card-footer-item"
              >
                {cm.PREVIOUS_BUTTON ? cm.PREVIOUS_BUTTON : "Previous"}
              </a>
            )}
            {cm.NEXT_BUTTON !== null && (
              <a
                onClick={() => transitionTo("NEXT")}
                className="card-footer-item"
              >
                {cm.NEXT_BUTTON ? cm.NEXT_BUTTON : "Next"}
              </a>
            )}
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
