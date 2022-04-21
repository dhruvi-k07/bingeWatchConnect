import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies } from "../../../action/loginSignupAction";
import Header from "../Header/Header";
import './recommend.css'

class recommendMovie extends Component {
  componentWillMount() {
    const { getMovieList } = this.props;
    getMovieList();
  }
  render() {
    const { getMovieDetails } = this.props;
    console.log(getMovieDetails);
    return (
      <React.Fragment>
        <Header />
        {getMovieDetails.successResponse &&
          getMovieDetails.successResponse.api_result &&
          getMovieDetails.successResponse.api_result.results.map((movie) => {
            const src_img =
              "https://image.tmdb.org/t/p/w185" + movie.backdrop_path;
            return (
              <div class="card">
                <img
                  src={src_img}
                  alt="Avatar"
                  className='center'
                />
                <div class="container-card">
                  <h4>
                    <b>{movie.original_title}</b>
                  </h4>
                  <p>{movie.overview}</p>
                </div>
              </div>
            );
          })}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  getMovieDetails: state.getMovieList,
});

const mapDispatchToProps = (dispatch) => ({
  getMovieList: () => dispatch(getMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(recommendMovie);
