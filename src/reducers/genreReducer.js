const initialState = {
    successResponse: [],
    status: null,
    errorMessage: '',
  };
  export default function (state = initialState, action) {
    switch (action.type) {
      case "GET_GENRE_FULFILLED":
        console.log('genre: ', action.payload)
        localStorage.setItem('OnBoard', action.payload.data.isOnBoard_user)
        return {
          ...state, 
          status: 'success',
          successResponse: action.payload.data.response.genres,
          errorMessage: ''
        }
      case "GET_GENRE_PENDING":
        return {
          ...state,
          status: 'pending',
          successResponse: [],
          errorMessage: []
        }
      case "GET_GENRE_REJECTED":
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
  