export const staffReducer = (state, action) => {
  const {
    type,
    payload,
  } = action;

  switch (type) {
    case "SET_ALL_USER":
      return {...state,  staffLoading: false, staffList: payload.staffList}
    case "SET_DELETE_USER":
      return {...state, staffLoading: false, staffList: state.staffList.filter((user) => user._id !== payload._id)}
    case "SET_NEW_USER":
      const newList = state.staffList || [];
      return {...state, staffLoading: false, staffList: newList}
    default:
      return state;
  }
};
