import axios from 'axios';

/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';

/* ------------     ACTION CREATORS      ------------------ */

const setCurrentUser  = user => ({ type: SET_CURRENT_USER, user });

/* ------------          REDUCER         ------------------ */

export default function reducer (currentUser = {}, action) {
  switch (action.type) {

    case SET_CURRENT_USER:
      return action.user;

    default:
      return currentUser;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const login = (credentials)=> dispatch =>{
  axios.put("/auth/local/login", credentials)
       .then(res => dispatch(setCurrentUser(res.data)))
       .catch(err => console.error(`Logging in with ${credentials.email} and ${credentials.password} was unsuccesful`, err));

};