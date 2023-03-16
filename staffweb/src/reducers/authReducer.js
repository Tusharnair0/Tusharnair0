export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user, userList, deleting },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };
    case "SET_ALL_USER":
      return {...state,  authLoading: false, userList: userList}
    case "SET_DELETE_USER":
      console.log(userList);
      return {...state, authLoading: false, userList: state.userList.filter((user) => user._id !== deleting._id)}
    default:
      return state;
  }
};
