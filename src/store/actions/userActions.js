export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_CATEGORIES = 'SET_USER_CATEGORIES';

export const setUserName = (name) => ({
  type: SET_USER_NAME,
  payload: name
});

export const setUserEmail = (email) => ({
  type: SET_USER_EMAIL,
  payload: email
});

export const setUserId = (id) => ({
  type: SET_USER_ID,
  payload: id
});

export const setUserCategories = (categories) => ({
  type: SET_USER_CATEGORIES,
  payload: categories
});