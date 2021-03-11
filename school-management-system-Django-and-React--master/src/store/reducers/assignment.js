import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
 
  error: null,
  assignments: [],
  CurrentASsign: {},
  loading: false,
};

const AssignStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const AssignSuccess = (state, action) => {
  return updateObject(state, {
    assignments :action.assignment,
    error: null,
    loading: false
  });
};

const AssignFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};



export const DetailStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    });
  };
  
  export const DetailSuccess = (state, action) => {
    return updateObject(state, {
      CurrentASsign :action.assignmentt,
      error: null,
      loading: false
    });
  };
  
  
  export const DetailFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };

  export const CreateStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    });
  };
  
  export const CreateSuccess = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: false
    });
  };
  
  
  export const CreateFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ASSIGN_START:
      return AssignStart(state, action);
    case actionTypes.ASSIGN_SUCCESS:
      return AssignSuccess(state, action);
    case actionTypes.ASSIGN_FAIL:
      return AssignFail(state, action);
    case actionTypes.DETAIL_START:
        return DetailStart(state, action);
    case actionTypes.DETAIL_SUCCESS:
        return DetailSuccess(state, action);
    case actionTypes.DETAIL_FAIL:
        return DetailFail(state, action);
    case actionTypes.CREATE_START:
      return CreateStart(state, action);
    case actionTypes.CREATE_SUCCESS:
      return CreateSuccess(state, action);
    case actionTypes.CREATE_FAIL:
      return CreateFail(state, action);
  
    default:
      return state;
  }
};

export default reducer;
