import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  FlatButton,
  IconButton,
  IconMenu,
  MenuItem,
  Divider,
  Avatar,
} from "material-ui";
import { TextField } from "material-ui";

import IconHome from "material-ui/svg-icons/action/home";
import IconNotification from "material-ui/svg-icons/social/notifications";
import IconMail from "material-ui/svg-icons/content/mail";
import IconSearch from "material-ui/svg-icons/action/search";
import IconClose from "material-ui/svg-icons/navigation/close";
import { ReactComponent as MovieSVG } from "../svg/movie (2).svg";

import IconPerson from "material-ui/svg-icons/social/person";

import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: window.data.auth.user,
      searchBarClassName: "hidden",
    };
  }
  componentDidMount() {
    var searchInput = document.getElementById("search-input");
    searchInput.addEventListener(
      "keyup",
      function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
          this.props.history.push("/search/" + searchInput.value);
        }
      }.bind(this)
    );
  }

  showSearch() {
    this.setState({ searchBarClassName: "animated fadeIn" });
    setTimeout(
      function () {
        this.refs.searchInput.focus();
      }.bind(this),
      500
    );
  }

  hideSearch() {
    this.setState({ searchBarClassName: "animated fadeOut" });
    setTimeout(
      function () {
        this.setState({ searchBarClassName: "hidden" });
      }.bind(this),
      500
    );
  }

  render() {
    const mainBar = (
      <div className="container">
        <div className="appbar-links">
          <Link to="/welcome">
            <FlatButton
              icon={<IconHome style={{ fill: "white" }} />}
              label="Home"
              className="appbar-btn"
            />
          </Link>
          <Link to="/notifications">
            <FlatButton
              icon={<IconNotification style={{ fill: "white" }} />}
              label="Notifications"
              className="appbar-btn"
            />
          </Link>
          <Link to="/messages">
            <FlatButton
              icon={<IconMail style={{ fill: "white" }} />}
              label="Messages"
              className="appbar-btn"
            />
          </Link>
          <IconMenu
            className="pull-right"
            iconButtonElement={
              <IconButton className="appbar-btn">
                <Avatar src={this.state.user.avatar} size={40} />
              </IconButton>
            }
          >
            <MenuItem primaryText="Profile" leftIcon={<IconPerson />} />
            <Divider />
            <MenuItem primaryText="Settings and privacy" />
            <MenuItem primaryText="Log out" />
          </IconMenu>
          <Link to="/recommend"><FlatButton icon={<MovieSVG/>} label="Recommend" className="appbar-btn"/></Link>
          <IconButton
            className="pull-right"
            style={{ top: "15px" }}
            onClick={this.showSearch.bind(this)}
          >
            <IconSearch className="appbar-btn" />
          </IconButton>
        </div>
      </div>
    );

    const searchBar = (
      <div className="container">
        <TextField
          ref="searchInput"
          id="search-input"
          hintText="Type then hit enter to search..."
          style={{ width: "95%" }}
          inputStyle={{ color: "black" }}
        />
        <IconButton
          className="pull-right"
          style={{ top: "12px" }}
          onClick={this.hideSearch.bind(this)}
        >
          <IconClose color="black" />
        </IconButton>
      </div>
    );

    return (
      <header>
        <AppBar
          id="main-bar"
          title={mainBar}
          showMenuIconButton={false}
          style={{ position: "fixed" }}
        />
        <AppBar
          title={searchBar}
          className={this.state.searchBarClassName}
          id="search-bar"
          showMenuIconButton={false}
        />
      </header>
    );
  }
}

export default Header;
