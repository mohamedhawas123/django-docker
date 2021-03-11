import axios from "axios";
import * as actionTypes from "./actionTypes";

export const AssignStart = () => {
  return {
    type: actionTypes.ASSIGN_START
  };
};

export const AssignSuccess = assignment => {
  return {
    type: actionTypes.ASSIGN_SUCCESS,
    assignment
  };
};

export const AssignFail = error => {
  return {
    type: actionTypes.ASSIGN_FAIL,
    error: error
  };
};


export const getAssing = token => {
  return dispatch => {
    dispatch(AssignStart())
    axios.defaults.headers = {
      "Content-Type": "Application/json",
      Authorization: `Token ${token}`
    }
    axios.get('http://127.0.0.1:8000/assiagnment/')
      .then(res => {
        const assignment = res.data;
        dispatch(AssignSuccess(assignment))
      })
      .catch(err => {
        dispatch(AssignFail(err))
      })
  }
}


export const DetailStart = () => {
  return {
    type: actionTypes.DETAIL_START
  };
};

export const DetailSuccess = assignmentt => {
  return {
    type: actionTypes.DETAIL_SUCCESS,
    assignmentt
  };
};

export const DetailFail = error => {
  return {
    type: actionTypes.DETAIL_FAIL,
    error: error
  };
};


export const getDetailAssign = (token, id) => {
  return dispatch => {
    dispatch(AssignStart())
    axios.defaults.headers = {
      "Content-Type": "Application/json",
      Authorization: `Token ${token}`
    }
    axios.get(`http://127.0.0.1:8000/assiagnment/${id}/`)
      .then(res => {
        const assignment = res.data;
        dispatch(DetailSuccess(assignment))
      })
      .catch(err => {
        dispatch(DetailFail(err))
      })
  }
}



export const CreateStart = () => {
  return {
    type: actionTypes.CREATE_START
  };
};

export const CreateSuccess = () => {
  return {
    type: actionTypes.CREATE_SUCCESS,

  };
};

export const CreateFail = error => {
  return {
    type: actionTypes.CREATE_FAIL,
    error: error
  };
};



export const Createastn = (anst, token) => {
  return dispatch => {
    dispatch(CreateStart())
    axios.defaults.headers = {
      "Content-Type": "Application/json",
      Authorization: `Token ${token}`
    }
    axios.post("http://127.0.0.1:8000/assiagnment/", anst)
      .then(res => {
        dispatch(CreateSuccess())
      })
      .catch(err => {
        dispatch(CreateFail(err))
      })
  }
}
