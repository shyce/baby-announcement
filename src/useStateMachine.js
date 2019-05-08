import React, { useReducer } from "react";
import PropTypes from "prop-types";

export default function useStateMachine(machine, initialState) {
  /**
   * @param {object} state Machine state
   * @param {string} action enum<PREVIOUS, NEXT>
   */
  const reducer = (state, action) => {
    return machine.states[state][action]
      ? machine.states[state][action]
      : state;
  };

  const [state, transitionTo] = useReducer(reducer, initialState);

  return [machine.states[state], transitionTo];
}
