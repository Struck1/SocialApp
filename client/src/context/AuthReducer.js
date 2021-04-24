const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFecthing: true,
        error: false
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFecthing: false,
        error: false
      };
    case 'LOGIN_FAILTURE':
      return {
        user: null,
        isFecthing: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default AuthReducer;
