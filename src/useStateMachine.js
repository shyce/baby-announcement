import React, { useReducer } from "react";
import PropTypes from "prop-types";

export default function useStateMachine(machine, initialState) {
  /**
   * @param {object} state Machine state
   * @param {string} action enum<PREVIOUS, NEXT>
   */
  const reducer = (state, action) => {

    if (typeof action === 'string') {
      action = {
        type: action,
      }
    }

    
    switch (action) {
      case 'UPDATE_GUEST_NAME':
        return {
          ...state,
          states: {
            ...state.states,
            tease_date: {
              ...state.states.tease_date,
              guestName: action.payload,
            }
          }
        }
    
      default:
        return machine.states[state][action.type]
          ? machine.states[state][action.type]
          : state;
    }

  };


  const [state, transitionTo] = useReducer(reducer, initialState);

  /**
   * Give this state and the next state the ability to get/set their states.
   */
  machine.states[state].get = (value) => {
    return machine.states[state][value]
  }
  machine.states[state].set = (key, value) => {
    return machine.states[state][key] = value
  }
  if (machine.states[state]['NEXT']) {
    machine.states[machine.states[state]['NEXT']].get = (value) => {
      return machine.states[machine.states[state]['NEXT']][value]
    }
    machine.states[machine.states[state]['NEXT']].set = (key, value) => {
      return machine.states[machine.states[state]['NEXT']][key] = value
    }
  }

  if (machine.states[state].render && typeof machine.states[state].render === 'function') {
    const renderFn = machine.states[state].render
    machine.states[state].render = () => {
      return renderFn(machine.states[state], machine.states[machine.states[state]['NEXT']])
    }
  }

  return [machine.states[state], transitionTo];
}
