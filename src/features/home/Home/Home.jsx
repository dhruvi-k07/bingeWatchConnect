import React, { Component } from "react";
import { Backdrop, Box, Modal, Fade, Typography, Button } from "@mui/material";

import HomeUserProfile from "./HomeUserProfile";
import HomeTrends from "./HomeTrends";
import HomeFollow from "./HomeFollow";
import NewPost from "./NewPost";
import PostList from "./PostList/PostList";
import ToggleTheme from "./ToggleTheme";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { getGenre, postUserChoice } from "../../../action/loginSignupAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 700,
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: true,
      genres: [],
    };
  }
  async componentWillMount() {
    document.title = "Home";
    const { getGenres } = this.props;
    const isOnBoardToken = localStorage.getItem('OnBoard')
    // if(isOnBoardToken){
    //   this.setState({openModal: false})
    // }
    await getGenres();
    const { genreDetails } = this.props;
    const temp_genre = [...genreDetails.successResponse];
    const genre = temp_genre.map((gen) => {
      return { ...gen, isChecked: false };
    });
    this.setState({ genres: genre });
  }

  handleModal = () => {
    this.setState({ openModal: false });
  };
  handleCheckBoxGenre = (code, isCheck) => {
    const { genres } = this.state;
    const genre_temp = [...genres];
    genre_temp.forEach((gen) => {
      if (gen.name === code.name) {
        gen.isChecked = isCheck;
      }
    });
    this.setState({ genres: [...genre_temp] });
  };

  handleSubmitGL = (e) => {
    e.preventDefault();
    const { addUserChoice, choiceDetails } = this.props;
    const { genres } = this.state;
    const user_id = localStorage.getItem('userid')
    const sendGenre = genres.filter((gen) => {
      if (gen.isChecked === true) {
        return gen;
      }
    });
    addUserChoice(user_id, sendGenre);
    if (choiceDetails.status === "success") {
      this.setState({ openModal: false });
    }
  };

  render() {
    const { openModal, genres } = this.state;
    const checkedGenre =
      genres.filter((gen) => {
        if (gen.isChecked === true) {
          return gen;
        }
      }).length > 3
        ? "Please Choose Any 3 Genres"
        : "";
    const checkedGenredisable =
      genres.filter((gen) => {
        if (gen.isChecked === true) {
          return gen;
        }
      }).length === 3;
    return (
      <React.Fragment>
        {openModal && (
          <>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openModal}>
                <Box sx={style}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Pick your Favorite Genre
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    {genres.map((gen) => {
                      return (
                        <div>
                          <input
                            type="checkbox"
                            value={gen.name}
                            checked={gen.isChecked}
                            onChange={(e) =>
                              this.handleCheckBoxGenre(gen, e.target.checked)
                            }
                            name={gen.name}
                          />
                          <label htmlFor={gen.name}>{gen.name}</label>
                        </div>
                      );
                    })}
                    {checkedGenre && (
                      <p style={{ color: "red" }}>{checkedGenre}</p>
                    )}
                  </Typography>
                  <Button
                    onClick={this.handleSubmitGL}
                    disabled={!checkedGenredisable}
                  >
                    {" "}
                    Submit{" "}
                  </Button>
                </Box>
              </Fade>
            </Modal>
          </>
        )}
        <Header />
        <div className="container main-content">
          <div className="row">
            <div className="col-sm-3">
              <HomeUserProfile />
              <HomeTrends />
            </div>
            <div className="col-sm-6">
              <NewPost />
              <PostList />
              {/* Posts here */}
            </div>
            <div className="col-sm-3">
              <HomeFollow />
              <ToggleTheme />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  genreDetails: state.getGenres,
  choiceDetails: state.userChoice,
});

const mapDispatchToProps = (dispatch) => ({
  getGenres: () => dispatch(getGenre()),
  addUserChoice: (token, genre) => dispatch(postUserChoice(token, genre)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
