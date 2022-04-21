import { combineReducers } from 'redux';
import loginReducer from "./loginReducer";
import genreReducer from './genreReducer';
import languageReducer from './languageReducer';
import userChoiceReducer from './userChoiceReducer';
import signUpReducer from './signUpReducer';
import moviesListReducer from './moviesListReducer';

export default combineReducers({
    loginUser: loginReducer,
    getGenres: genreReducer,
    getLanguage: languageReducer,
    userChoice: userChoiceReducer,
    signUpUser: signUpReducer,
    getMovieList: moviesListReducer
})