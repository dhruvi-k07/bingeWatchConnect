const initialState = {
    successResponse: [],
    status: null,
    errorMessage: '',
  };
  export default function (state = initialState, action) {
    switch (action.type) {
      case "GET_MOVIES_FULFILLED":
        return {
          ...state, 
          status: 'success',
          successResponse: action.payload.data,
          errorMessage: ''
        }
      case "GET_MOVIES_PENDING":
        return {
          ...state,
          status: 'pending',
          successResponse: [],
          errorMessage: []
        }
      case "GET_MOVIES_REJECTED":
        return {
          ...state,
          successResponse: [],
          status: 'failed',
          errorMessage: action.payload.response,
        };
      default:
        return state;
    }
  }
  