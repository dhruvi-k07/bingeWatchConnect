const initialState = {
    successResponse: '',
    status: null,
    errorMessage: "",
  };
  export default function (state = initialState, action) {
    switch (action.type) {
      case "USERCHOICE_FULFILLED":
        console.log('in userChoice: ')
        return {
          ...state,
          status: "success",
          successResponse: action.payload.data,
          errorMessage: "",
        };
      case "USERCHOICE_PENDING":
        return {
          ...state,
          status: "pending",
          successResponse: [],
          errorMessage: [],
        };
      case "USERCHOICE_REJECTED":
        return {
          ...state,
          successResponse: [],
          status: "failed",
          errorMessage: action.payload.response,
        };
      default:
        return state;
    }
  }
  