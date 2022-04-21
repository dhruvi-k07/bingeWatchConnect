const initialState = {
  successResponse: "",
  status: null,
  errorMessage: "",
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "USER_SIGNUP_FULFILLED":
    localStorage.setItem('token', action.payload.data.token) 
      return {
        ...state,
        status: "success",
        successResponse: action.payload.data,
      };
    case "USER_SIGNUP_PENDING":
      return {
        ...state,
        status: "pending",
      };
    case "USER_SIGNUP_REJECTED":
        console.log('data: ', action.payload)
      return {
        ...state,
        status: "failed",
        errorMessage: action.payload.response.data.errorMessage,
      };
    default:
      return state;
  }
}
