import { SET_CATEGORIES, SET_USER} from '../actions/userActions';

const initialState = {
  name: '',
  usernane: '',
  email: '',
  userId: '',
  profilePic: '',
  categories: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value
      };
    case SET_CATEGORIES:
      const categories = action.payload;
      return {
        ...state,  
        categories 
      };
    default:
      return state;
  }
};

export default userReducer;
