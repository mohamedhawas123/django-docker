import React from 'react'
import axios from 'axios'
import * as actionType from './actionTypes'

export const GradedStart = () => {
    return {
        type: actionType.GRADED_START
    }
}


export const GradedSucess = grad => {
    return {
        type: actionType.GRADED_SUCCESS ,
        grad
    }
}


export const GradedFail = error => {
    return {
        type: actionType.GRADED_FAIL ,
        error
    }
}


export const GetGradi = (username, token) => {
    return dispatch => {
        dispatch(GradedStart())
        axios.defaults.headers = {
            "Content-Type": "Application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://127.0.0.1:8000/graded/?username=${username}`)
        .then(res => {
            dispatch(GradedSucess(res.data))
        })
        .catch(err => {
            dispatch(GradedFail(err))
        })
    }
}



export const PostGradStart = () => {
    return {
      type: actionType.POSTGRADED_START
    };
  };
  
  export const PostGradSuccess = () => {
    return {
      type: actionType.POSTGRADED_SUCCESS,
      
    };
  };
  
  export const PostGradFail = error => {
    return {
      type: actionType.POSTGRADED_FAIL,
      error: error
    };
  };
  
  
  
  export const CreateGrade = (token, anst) => {
    return dispatch => {
    //  dispatch(CreateStart())
      axios.defaults.headers = {
        "Content-Type" : "Application/json",
         Authorization: `Token ${token}` 
      }
    
      axios.post("http://127.0.0.1:8000/graded/create-grid/",anst )
      .then(res => {
       console.log("sucess")
      })
      .catch(err => {
     //   dispatch(CreateFail(err))
      })
    }
  }
  