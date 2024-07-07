import { SET_USER_NAME, SET_USER_EMAIL, SET_USER_ID, SET_USER_CATEGORIES} from '../actions/userActions';

const initialState = {
  name: '',
  email: '',
  userId: '',
  categories: ''
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
    case SET_USER_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;
