import ReactDOM from "react-dom";
import React from "react";
import { differenceInDays, differenceInHours, differenceInMonths, subDays, subMonths } from "date-fns";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import useStateMachine from "./useStateMachine";
import Baby from './baby.png'
import "bulma/css/bulma.css";
import 'csshake/dist/csshake-rotate.min.css';
import "./styles.css";

function countdown() {
  const result = [];
  const now = new Date();
  let future = new Date(2019, 8, 25);

  const months = differenceInMonths(future, now);
  if (months > 0) {
    result.push(`in ${months} months and `);
    future = subMonths(future, months);
  }

  const days = differenceInDays(future, now);
  if (days > 0) {
    result.push(`${days} days,`);
    future = subDays(future, days);
  }


  return result.join(' ');
}

const babyAnnouncement = {
  initial: "introduction",
  states: {
    introduction: {
      title: "Story time!",
      message:
        "It's a big day! We'd love to share why, but first we need your name!",
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
      NEXT_BUTTON: "There, now what is this big news??",
      BACKGROUND: "#F0EA8F"
    },
    tease_date: {
      PREVIOUS: "introduction",
      guestName: "",
      title: "Set your calendars!",
      subtitle: "September 2019",
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
      BACKGROUND: "#A9F0CD"
    },
    announcement: {
      title: "A frikkin baby!",
      subtitle: `We're going to be parents?!`,
      render: state => {
        return (
          <React.Fragment>
            <h1 className="title is-1">{state.title}</h1>
            <h2 className="subtitle">{state.subtitle}</h2>
            <p>
              You heard right &mdash; {countdown()} <u>A FRIKKIN BABY WILL BE HERE!</u>
            </p>
          </React.Fragment>
        );
      },
      PREVIOUS: "tease_date",
      NEXT: "date_announcement",
      NEXT_BUTTON: "You could have just said it!",
      BACKGROUND: "#FA86F3",
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
      BACKGROUND: "#FA887A"
    },
    tease_sex_1: {
      PREVIOUS: "announcement",
      message: "It's a...",
      render: state => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '3em',
              letterSpacing: '0.1rem',
              minHeight: '152px', 
            }}
            >{state.message}</div>
        )
      },
      NEXT: "tease_sex_2",
      NEXT_BUTTON: "...really?",
      BACKGROUND: "#D5CBF0"
    },
    tease_sex_2: {
      PREVIOUS: "tease_sex_1",
      message: "...a...",
      render: state => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '3em',
              letterSpacing: '0.1rem',
              minHeight: '152px', 
            }}
            >{state.message}</div>
        )
      },
      NEXT_BUTTON: "...",
      NEXT: "tease_sex_3",
      BACKGROUND: "#869BFA"
    },
    tease_sex_3: {
      PREVIOUS: "tease_sex_2",
      message: "ACHOOO!",
      render: state => {
        return (
          <div
            className="shake shake-constant shake-rotate"
            style={{
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '5em',
              letterSpacing: '0.1rem',
              minHeight: '152px', 
            }}
            >{state.message}</div>
        )
      },
      NEXT_BUTTON: "Cute. You done?",
      NEXT: "tease_sex_4",
      BACKGROUND: "#EBE7CD"
    },
    tease_sex_4: {
      PREVIOUS: "tease_sex_3",
      message: "Whew, that was a big sneeze!",
      render: state => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '3em',
              letterSpacing: '0.1rem',
              textAlign: 'center',
              minHeight: '152px', 
            }}
            >{state.message}</div>
        )
      },
      NEXT_BUTTON: "Seriously!",
      NEXT: "celebrate",
      BACKGROUND: "#EAB2D9"
    },
    celebrate: {
      PREVIOUS: "tease_sex_4",
      title: "It's a boy!",
      message:
        "September 2019, our little baby boy is due to arrive that will change our lives forever. Due to our distance and work schedule, we are looking for help to host a baby shower. Please contact brianroyer@gmail.com if you would be interested in helping.",
      render: state => {
        return (
          <React.Fragment>
            <h1 className="title is-1">{state.title}</h1>
            <h2 className="subtitle">{state.message}</h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={Baby} />
              <small>This is actually our little boy!</small>
            </div>
          </React.Fragment>
        );
      },
      CELEBRATE: true,
      PREVIOUS_BUTTON: "No way. Back it up.",
      BACKGROUND: "#3536E8",
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
        <div className="card" style={{ zIndex: 3, borderRadius: '50px', background: "#EDEAE7" }}>
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
