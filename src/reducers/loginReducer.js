const initialState = {
  successResponse: "",
  status: null,
  errorMessage: "",
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN_FULFILLED":
      localStorage.setItem('token', action.payload.data.user.token) 
      localStorage.setItem('userid', action.payload.data.user._id)
      return {
        ...state,
        status: "success",
        successResponse: action.payload.data,
      };
    case "USER_LOGIN_PENDING":
      return {
        ...state,
        status: "pending",
      };
    case "USER_LOGIN_REJECTED":
      return {
        ...state,
        status: "failed",
        errorMessage: action.payload.response.data.errorMessage,
      };
    default:
      return state;
  }
}
