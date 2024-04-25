import { SET_USER_NAME, SET_USER_EMAIL, SET_USER_ID } from '../actions/userActions';

const initialState = {
  name: '',
  email: '',
  userId: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        name: action.payload
      };
    case SET_USER_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
