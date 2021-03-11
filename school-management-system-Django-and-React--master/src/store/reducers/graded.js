import React from 'react'
import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";


const initalState = {
    loading: false,
    error: null,
    graded: []
}


export const GradedStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    error: null,
    })
}



export const GradedSucess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        graded: action.grad

    })
}

export const GradedFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        

    })
}


const reducer = (state = initalState, action) => {
    switch (action.type) {
      case actionTypes.GRADED_START:
        return GradedStart(state, action);
      case actionTypes.GRADED_SUCCESS:
        return GradedSucess(state, action);
      case actionTypes.GRADED_FAIL:
        return GradedFail(state, action);
      
      default:
        return state;
    }
  };

  export default reducer;
