export const SET_USER = 'SET_USER';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setUser = (field, value) => ({
  type: SET_USER,
  payload: { field, value }
});

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});
