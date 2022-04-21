import axios from "axios";

export const loginUser = (email, password) => {
  return {
    type: "USER_LOGIN",
    payload: axios.post("http://localhost:5000/user/login", {
      email: email,
      password: password,
    }),
  };
};

export const signupUser = (name, email, password) => {
  return {
    type: "USER_SIGNUP",
    payload: axios.post("http://localhost:5000/users", {
      name: name,
      email: email,
      password: password,
    }),
  };
};

export const getGenre = () => {
  const token = localStorage.getItem("token");
  return {
    type: "GET_GENRE",
    payload: axios.get(
      "http://localhost:5000/genres",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ),
  };
};

export const getLanguage = () => {
  return {
    type: "GET_LANGUAGE",
    payload: axios.get("http://localhost:5000/languages"),
  };
};

export const postUserChoice = (id, genre) => {
  const token = localStorage.getItem("token");
  return {
    type: "USERCHOICE",
    payload: axios.post(
      "http://localhost:5000/userChoice",
      {
        userId: id,
        genres: genre,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ),
  };
};

export const getMovies = () => {
  const token = localStorage.getItem("token");
  console.log('token: ', token)
  return {
    type: "GET_MOVIES",
    payload: axios.get(
      "http://localhost:5000/dashboard",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ),
  };
};
