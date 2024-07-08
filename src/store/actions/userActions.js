export const SET_USER = 'SET_USER';

export const setUser = (field, value) => ({
  type: SET_USER,
  payload: { field, value }
});